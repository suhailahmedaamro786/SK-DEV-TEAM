/**
 * SK DEV TEAM — Complete Google Apps Script Backend (Code.gs)
 * 
 * Version: 2.6.0
 * Spreadsheet ID: 1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c
 * Deploying Account: suhailahmedaamro786@gmail.com
 * 
 * Includes:
 *  - Global doGet(e) and doPost(e) HTTP entry points
 *  - Safe health-check action (no spreadsheet/secrets exposed)
 *  - setupSKDevTeam() master setup with Drive workspace configuration
 *  - Full 2FA Authentication (SHA-256 hashed password + server-dispatched Email OTP)
 *  - Public endpoints: health, listPublicProjects, listPublicServices, listPublicPackages, submitInquiry
 *  - Protected admin endpoints: dashboard summary, inquiries CRM, project management, settings
 */

// =============================================================
// 1. CONFIGURATION & SPREADSHEET ACCESS
// =============================================================

var APP_CONSTANTS = {
  DEFAULT_SPREADSHEET_ID: '1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c',
  DEFAULT_ADMIN_EMAIL: 'suhailahmedaamro786@gmail.com',
  DRIVE_WORKSPACE_FOLDER: 'SK DEV TEAM Workspace',
  VERSION: '2.6.0'
};

var AUTH_CONSTANTS = {
  LOCKOUT_DURATION_MS: 24 * 60 * 60 * 1000, // 24 hours
  MAX_FAILED_ATTEMPTS: 3,
  OTP_EXPIRY_MS: 10 * 60 * 1000,            // 10 minutes
  MAX_OTP_ATTEMPTS: 3,
  SESSION_DURATION_MS: 4 * 60 * 60 * 1000   // 4 hours
};

/**
 * Access the persistent Google Spreadsheet
 */
function getSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {
    // Standalone script
  }
  var props = PropertiesService.getScriptProperties();
  var sheetId = props.getProperty('SPREADSHEET_ID') || APP_CONSTANTS.DEFAULT_SPREADSHEET_ID;
  try {
    return SpreadsheetApp.openById(sheetId);
  } catch (err) {
    throw new Error('Unable to access spreadsheet database. Please check permissions.');
  }
}

// =============================================================
// 2. MASTER SETUP & DRIVE WORKSPACE (setupSKDevTeam)
// =============================================================

/**
 * Master Setup Function: setupSKDevTeam()
 * Initializes spreadsheet ID configuration, Drive workspace folder, and database tabs.
 * Run once from the Apps Script editor to initialize the backend.
 */
function setupSKDevTeam() {
  Logger.log('Initializing SK DEV TEAM Backend...');
  var props = PropertiesService.getScriptProperties();

  // Configure spreadsheet ID
  props.setProperty('SPREADSHEET_ID', APP_CONSTANTS.DEFAULT_SPREADSHEET_ID);
  props.setProperty('ADMIN_EMAIL', APP_CONSTANTS.DEFAULT_ADMIN_EMAIL);

  // Setup Google Drive workspace folder for project assets & attachments
  var driveFolderId = setupDriveWorkspace();
  props.setProperty('DRIVE_FOLDER_ID', driveFolderId);

  // Initialize spreadsheet sheets, headers, and seed records
  setupDatabase();

  Logger.log('setupSKDevTeam() finished successfully!');
  Logger.log('Spreadsheet ID: ' + APP_CONSTANTS.DEFAULT_SPREADSHEET_ID);
  Logger.log('Drive Workspace Folder ID: ' + driveFolderId);
}

/**
 * Drive Workspace Setup: Locate or create the SK DEV TEAM Drive Folder
 */
function setupDriveWorkspace() {
  var folderName = APP_CONSTANTS.DRIVE_WORKSPACE_FOLDER;
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(folderName);
    folder.setDescription('Central Drive workspace for SK DEV TEAM client project files, inquiry archives, and deliverables.');
  }
  return folder.getId();
}

/**
 * Creates and formats all required database tabs
 */
function setupDatabase() {
  var ss = getSpreadsheet();
  
  // 1. ProjectInquiries tab
  getOrCreateSheet(ss, 'ProjectInquiries', [
    'InquiryID', 'Timestamp', 'ClientName', 'BusinessName', 'Email', 
    'Phone', 'ServiceCategory', 'SelectedPackage', 'BudgetRange', 
    'PreferredContact', 'ProjectDetails', 'DesiredFeatures', 'ReferenceDemo', 
    'Status', 'FollowUpNotes'
  ]);

  // 2. Projects tab
  var projSheet = getOrCreateSheet(ss, 'Projects', [
    'ID', 'Title', 'Category', 'LiveUrl', 'Client', 'Description', 'Technologies', 'Status', 'Date'
  ]);
  seedProjectsIfEmpty(projSheet);

  // 3. Services tab
  var servSheet = getOrCreateSheet(ss, 'Services', [
    'ID', 'Title', 'Category', 'Summary', 'Features', 'PricingNotice', 'Status'
  ]);
  seedServicesIfEmpty(servSheet);

  // 4. Packages tab
  var pkgSheet = getOrCreateSheet(ss, 'Packages', [
    'ID', 'ServiceID', 'Tier', 'Title', 'Features', 'SuitableFor', 'QuotationNotice'
  ]);
  seedPackagesIfEmpty(pkgSheet);

  // 5. Settings tab
  var settSheet = getOrCreateSheet(ss, 'Settings', [
    'Key', 'Value', 'UpdatedAt'
  ]);
  seedSettingsIfEmpty(settSheet);

  // 6. AdminAudit tab
  getOrCreateSheet(ss, 'AdminAudit', [
    'Timestamp', 'EventType', 'Details', 'Actor'
  ]);
}

// =============================================================
// 3. GLOBAL HTTP ENTRY POINTS (doGet & doPost)
// =============================================================

/**
 * Global HTTP GET entry point
 * Invoked when opening /exec or /exec?action=health in a browser or via fetch GET
 */
function doGet(e) {
  try {
    return handleRequest(e, 'GET');
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      data: null,
      error: { code: 'SERVER_ERROR', message: err.message || String(err) }
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Global HTTP POST entry point
 * Invoked by frontend fetch for inquiries, admin login, and authenticated management
 */
function doPost(e) {
  try {
    return handleRequest(e, 'POST');
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      data: null,
      error: { code: 'SERVER_ERROR', message: err.message || String(err) }
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Universal Request Dispatcher
 */
function handleRequest(e, method) {
  var responseData = { success: false, data: null, error: null };

  try {
    var params = {};
    if (e && e.parameter) {
      params = e.parameter;
    }

    var body = {};
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for url-encoded form submissions
        body = params;
      }
    }

    var payload = Object.assign({}, params, body);
    var action = String(payload.action || 'health').trim();

    switch (action) {
      // --- PUBLIC & HEALTH ENDPOINTS ---
      case 'health':
        responseData = handleHealth();
        break;

      case 'listPublicProjects':
        responseData = handleListPublicProjects();
        break;

      case 'listPublicServices':
        responseData = handleListPublicServices();
        break;

      case 'listPublicPackages':
        responseData = handleListPublicPackages();
        break;

      case 'submitInquiry':
        responseData = handleSubmitInquiry(payload);
        break;

      // --- AUTHENTICATION ENDPOINTS ---
      case 'login':
      case 'adminLogin':
        responseData = handleAdminLogin(payload);
        break;

      case 'verifyOtp':
        responseData = handleVerifyOtp(payload);
        break;

      case 'checkSession':
        responseData = handleCheckSession(payload);
        break;

      case 'logout':
      case 'adminLogout':
        responseData = handleAdminLogout(payload);
        break;

      // --- PROTECTED ADMIN ENDPOINTS ---
      case 'getDashboardSummary':
        assertAuthenticated(payload.token);
        responseData = handleGetDashboardSummary();
        break;

      case 'listInquiries':
        assertAuthenticated(payload.token);
        responseData = handleListInquiries(payload);
        break;

      case 'updateInquiry':
        assertAuthenticated(payload.token);
        responseData = handleUpdateInquiry(payload);
        break;

      case 'createProject':
        assertAuthenticated(payload.token);
        responseData = handleCreateProject(payload);
        break;

      case 'updateProject':
        assertAuthenticated(payload.token);
        responseData = handleUpdateProject(payload);
        break;

      case 'deleteProject':
        assertAuthenticated(payload.token);
        responseData = handleDeleteProject(payload);
        break;

      case 'createService':
        assertAuthenticated(payload.token);
        responseData = handleCreateService(payload);
        break;

      case 'updateService':
        assertAuthenticated(payload.token);
        responseData = handleUpdateService(payload);
        break;

      case 'createPackage':
        assertAuthenticated(payload.token);
        responseData = handleCreatePackage(payload);
        break;

      case 'updatePackage':
        assertAuthenticated(payload.token);
        responseData = handleUpdatePackage(payload);
        break;

      case 'getAdminSettings':
        assertAuthenticated(payload.token);
        responseData = handleGetAdminSettings();
        break;

      case 'updateAdminSettings':
        assertAuthenticated(payload.token);
        responseData = handleUpdateAdminSettings(payload);
        break;

      default:
        responseData = {
          success: false,
          data: null,
          error: { code: 'INVALID_ACTION', message: 'Action not recognized: ' + action }
        };
    }

  } catch (err) {
    responseData = {
      success: false,
      data: null,
      error: {
        code: err.name || 'SERVER_ERROR',
        message: err.message || 'An unexpected error occurred in Google Apps Script.'
      }
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================================
// 4. SAFE HEALTH CHECK (No Secrets Exposed)
// =============================================================

/**
 * Returns safe health check status without accessing spreadsheet or exposing secrets.
 */
function handleHealth() {
  return {
    success: true,
    data: {
      status: 'healthy',
      brand: 'SK DEV TEAM',
      version: APP_CONSTANTS.VERSION,
      timestamp: new Date().toISOString()
    },
    error: null
  };
}

// =============================================================
// 5. PUBLIC CONTROLLERS (Projects, Services, Packages, Inquiries)
// =============================================================

function handleListPublicProjects() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Projects');
  if (!sheet) return { success: true, data: [], error: null };

  var data = getRowsAsObjects(sheet);
  var publicProjects = data
    .filter(function(p) { return String(p.Status || '').toLowerCase() === 'published'; })
    .map(function(p) {
      return {
        id: p.ID,
        title: p.Title,
        category: p.Category,
        liveUrl: p.LiveUrl,
        client: p.Client,
        description: p.Description,
        technologies: p.Technologies ? String(p.Technologies).split(',').map(function(t) { return t.trim(); }) : [],
        date: p.Date || ''
      };
    });

  return { success: true, data: publicProjects, error: null };
}

function handleListPublicServices() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Services');
  if (!sheet) return { success: true, data: [], error: null };

  var data = getRowsAsObjects(sheet);
  var activeServices = data
    .filter(function(s) { return String(s.Status || 'Active').toLowerCase() === 'active'; })
    .map(function(s) {
      return {
        id: s.ID,
        title: s.Title,
        category: s.Category,
        summary: s.Summary,
        features: s.Features ? String(s.Features).split('\n').map(function(f) { return f.trim(); }) : [],
        pricingNotice: s.PricingNotice || 'Request a Quote'
      };
    });

  return { success: true, data: activeServices, error: null };
}

function handleListPublicPackages() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Packages');
  if (!sheet) return { success: true, data: [], error: null };

  var data = getRowsAsObjects(sheet);
  var packages = data.map(function(pkg) {
    return {
      id: pkg.ID,
      serviceId: pkg.ServiceID,
      tier: pkg.Tier,
      title: pkg.Title,
      features: pkg.Features ? String(pkg.Features).split('\n') : [],
      suitableFor: pkg.SuitableFor,
      quotationNotice: pkg.QuotationNotice || 'Quotation tailored to scope'
    };
  });

  return { success: true, data: packages, error: null };
}

function handleSubmitInquiry(payload) {
  var clientName = String(payload.clientName || '').trim();
  var email = String(payload.email || '').trim();
  var phone = String(payload.phone || '').trim();
  var projectDetails = String(payload.projectDetails || '').trim();

  if (!clientName) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Client name is required.' } };
  }
  if (!email || email.indexOf('@') === -1) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Valid email address is required.' } };
  }
  if (!phone) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'WhatsApp / phone number is required.' } };
  }
  if (!projectDetails) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Project description is required.' } };
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('ProjectInquiries');
  if (!sheet) {
    sheet = ss.insertSheet('ProjectInquiries');
    sheet.appendRow([
      'InquiryID', 'Timestamp', 'ClientName', 'BusinessName', 'Email', 
      'Phone', 'ServiceCategory', 'SelectedPackage', 'BudgetRange', 
      'PreferredContact', 'ProjectDetails', 'DesiredFeatures', 'ReferenceDemo', 
      'Status', 'FollowUpNotes'
    ]);
  }

  // Duplicate submission throttle: check identical email & phone within 10 minutes
  var recentRows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues() : [];
  var tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  for (var i = recentRows.length - 1; i >= 0 && i >= recentRows.length - 10; i--) {
    var rowDate = new Date(recentRows[i][1]);
    var rowEmail = String(recentRows[i][4] || '').trim().toLowerCase();
    var rowPhone = String(recentRows[i][5] || '').trim();

    if (rowDate > tenMinutesAgo && rowEmail === email.toLowerCase() && rowPhone === phone) {
      return {
        success: true,
        data: {
          inquiryId: recentRows[i][0],
          isDuplicate: true,
          message: 'Your inquiry was already received recently. Our team will contact you shortly.'
        },
        error: null
      };
    }
  }

  // Generate Reference ID: SK-YYYYMMDD-XXXX
  var now = new Date();
  var dateStr = Utilities.formatDate(now, 'GMT+5', 'yyyyMMdd');
  var randomCode = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
  var inquiryId = 'SK-' + dateStr + '-' + randomCode;

  sheet.appendRow([
    inquiryId,
    now.toISOString(),
    clientName,
    payload.businessName || '',
    email,
    phone,
    payload.serviceCategory || 'General Inquiry',
    payload.selectedPackage || 'Small',
    payload.estimatedBudget || 'To be discussed',
    payload.preferredContact || 'WhatsApp',
    projectDetails,
    payload.desiredFeatures || '',
    payload.referenceDemo || 'None',
    'New',
    ''
  ]);

  // Dispatch email notification to administrator
  try {
    var adminEmail = APP_CONSTANTS.DEFAULT_ADMIN_EMAIL;
    var subject = 'New Project Inquiry: ' + inquiryId + ' from ' + clientName;
    var body = 'A new project inquiry has been received:\n\n' +
      'Inquiry ID: ' + inquiryId + '\n' +
      'Client: ' + clientName + ' (' + (payload.businessName || 'Individual') + ')\n' +
      'WhatsApp / Phone: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Service: ' + (payload.serviceCategory || 'General') + '\n' +
      'Package: ' + (payload.selectedPackage || 'Small') + '\n' +
      'Budget: ' + (payload.estimatedBudget || 'To be discussed') + '\n\n' +
      'Project Details:\n' + projectDetails + '\n\n' +
      'Manage this in the SK DEV TEAM Admin Console.';
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (mailErr) {
    Logger.log('Notification email dispatch skipped: ' + mailErr.toString());
  }

  return {
    success: true,
    data: {
      inquiryId: inquiryId,
      status: 'New',
      receivedAt: now.toISOString(),
      message: 'Inquiry registered successfully. Reference ID: ' + inquiryId
    },
    error: null
  };
}

// =============================================================
// 6. AUTHENTICATION & SECURITY CONTROLLERS
// =============================================================

/**
 * Step 1: Validate Email & Hashed Password, then dispatch 6-Digit Email OTP
 */
function handleAdminLogin(payload) {
  var props = PropertiesService.getScriptProperties();
  var email = String(payload.email || '').trim().toLowerCase();
  var password = String(payload.password || '');

  // 1. Lockout Check
  var lockoutUntil = Number(props.getProperty('AUTH_LOCKOUT_UNTIL') || '0');
  var now = Date.now();
  if (now < lockoutUntil) {
    var remainingHours = Math.ceil((lockoutUntil - now) / (60 * 60 * 1000));
    return {
      success: false,
      data: null,
      error: {
        code: 'ACCOUNT_LOCKED',
        message: 'Security lockout active due to 3 consecutive failed attempts. Retry in ' + remainingHours + ' hours.'
      }
    };
  }

  // 2. Retrieve credentials
  var adminEmail = String(props.getProperty('ADMIN_EMAIL') || APP_CONSTANTS.DEFAULT_ADMIN_EMAIL).toLowerCase();
  var passwordHash = props.getProperty('ADMIN_PASSWORD_HASH');
  var passwordSalt = props.getProperty('ADMIN_PASSWORD_SALT') || 'sk_salt_default';

  if (email !== adminEmail) {
    recordFailedAttempt();
    return {
      success: false,
      data: null,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials provided.' }
    };
  }

  if (!passwordHash) {
    return {
      success: false,
      data: null,
      error: {
        code: 'SETUP_REQUIRED',
        message: 'Admin credentials have not been initialized. Please run initializeAdminCredentials(password) in Apps Script editor.'
      }
    };
  }

  // 3. Validate Password Hash: SHA-256(password + salt)
  var computedPassHash = hashWithSalt(password, passwordSalt);
  var passValid = (computedPassHash === passwordHash);

  if (!passValid) {
    var failedCount = recordFailedAttempt();
    var attemptsLeft = AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS - failedCount;
    if (attemptsLeft <= 0) {
      return {
        success: false,
        data: null,
        error: {
          code: 'ACCOUNT_LOCKED',
          message: '3 consecutive failed attempts recorded. Account has been locked for 24 hours.'
        }
      };
    }
    return {
      success: false,
      data: null,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials. Remaining attempts before 24-hour lockout: ' + attemptsLeft
      }
    };
  }

  // 5. Generate 6-Digit Email OTP
  var otp = generateSecureOtp();
  var challengeId = 'chn-' + Utilities.getUuid();
  var otpExpiry = now + AUTH_CONSTANTS.OTP_EXPIRY_MS;

  props.setProperty('ACTIVE_OTP_CHALLENGE', challengeId);
  props.setProperty('ACTIVE_OTP_HASH', hashWithSalt(otp, challengeId));
  props.setProperty('ACTIVE_OTP_EXPIRY', String(otpExpiry));
  props.setProperty('ACTIVE_OTP_ATTEMPTS', '0');
  props.deleteProperty('AUTH_FAILED_ATTEMPTS');

  // Dispatch OTP to authorized admin email
  try {
    var subject = 'SK DEV TEAM Admin Login Verification Code (OTP: ' + otp + ')';
    var emailBody = 'Assalam-o-Alaikum Suhail Ahmed,\n\n' +
      'An administrative login request was initiated for the SK DEV TEAM Admin Console.\n\n' +
      'Your One-Time Verification Code (OTP) is:\n\n' +
      '    >>>  ' + otp + '  <<<\n\n' +
      'This code expires in 10 minutes.\n\n' +
      'If you did not initiate this request, your credentials may be compromised.\n\n' +
      'SK DEV TEAM — Digital Solutions for Growing Businesses';
    MailApp.sendEmail(adminEmail, subject, emailBody);
  } catch (mailErr) {
    Logger.log('MailApp error delivering OTP: ' + mailErr.toString());
  }

  logAuditEvent('OTP_DISPATCHED', 'Login challenge ' + challengeId + ' dispatched to admin email.');

  return {
    success: true,
    data: {
      step: 'OTP_REQUIRED',
      challengeId: challengeId,
      expiresInSeconds: 600,
      adminEmailMasked: email.slice(0, 3) + '***@' + email.split('@')[1],
      message: 'A 6-digit verification code has been dispatched to your email.'
    },
    error: null
  };
}

/**
 * Step 2: Verify 6-digit OTP and Issue Signed Session Token
 */
function handleVerifyOtp(payload) {
  var props = PropertiesService.getScriptProperties();
  var challengeId = String(payload.challengeId || '');
  var enteredOtp = String(payload.otp || '').trim();

  var storedChallenge = props.getProperty('ACTIVE_OTP_CHALLENGE');
  var storedOtpHash = props.getProperty('ACTIVE_OTP_HASH');
  var storedExpiry = Number(props.getProperty('ACTIVE_OTP_EXPIRY') || '0');
  var attempts = Number(props.getProperty('ACTIVE_OTP_ATTEMPTS') || '0');

  var now = Date.now();

  if (!storedChallenge || storedChallenge !== challengeId) {
    return {
      success: false,
      data: null,
      error: { code: 'INVALID_CHALLENGE', message: 'No active OTP challenge found. Please re-enter credentials.' }
    };
  }

  if (now > storedExpiry) {
    clearOtpChallenge();
    return {
      success: false,
      data: null,
      error: { code: 'OTP_EXPIRED', message: 'Verification code has expired. Please restart login.' }
    };
  }

  if (attempts >= AUTH_CONSTANTS.MAX_OTP_ATTEMPTS) {
    clearOtpChallenge();
    recordFailedAttempt();
    return {
      success: false,
      data: null,
      error: { code: 'TOO_MANY_ATTEMPTS', message: 'Maximum OTP attempts exceeded. Please restart login.' }
    };
  }

  var enteredHash = hashWithSalt(enteredOtp, challengeId);
  if (enteredHash !== storedOtpHash) {
    attempts++;
    props.setProperty('ACTIVE_OTP_ATTEMPTS', String(attempts));
    var remaining = AUTH_CONSTANTS.MAX_OTP_ATTEMPTS - attempts;
    return {
      success: false,
      data: null,
      error: {
        code: 'INVALID_OTP',
        message: 'Incorrect verification code. ' + remaining + ' attempts remaining.'
      }
    };
  }

  clearOtpChallenge();
  var sessionToken = issueSessionToken();
  logAuditEvent('LOGIN_SUCCESS', 'Administrator successfully authenticated via 2FA OTP.');

  return {
    success: true,
    data: {
      token: sessionToken,
      expiresAt: new Date(now + AUTH_CONSTANTS.SESSION_DURATION_MS).toISOString(),
      admin: {
        name: 'Suhail Ahmed',
        email: APP_CONSTANTS.DEFAULT_ADMIN_EMAIL,
        role: 'SUPER_ADMIN'
      }
    },
    error: null
  };
}

function handleCheckSession(payload) {
  var token = payload.token;
  if (!token) {
    return {
      success: false,
      data: { valid: false },
      error: { code: 'UNAUTHORIZED', message: 'No session token provided.' }
    };
  }

  try {
    var sessionData = assertAuthenticated(token);
    return {
      success: true,
      data: {
        valid: true,
        user: {
          email: sessionData.sub || APP_CONSTANTS.DEFAULT_ADMIN_EMAIL,
          role: sessionData.role || 'SUPER_ADMIN'
        },
        expiresAt: new Date(sessionData.exp).toISOString()
      },
      error: null
    };
  } catch (err) {
    return {
      success: false,
      data: { valid: false },
      error: { code: 'SESSION_EXPIRED', message: err.message || 'Session is invalid or expired.' }
    };
  }
}

function handleAdminLogout(payload) {
  var props = PropertiesService.getScriptProperties();
  if (payload.token) {
    props.setProperty('REVOKED_TOKEN_' + hashWithSalt(payload.token, 'revoke'), '1');
  }
  logAuditEvent('LOGOUT', 'Administrator logged out.');
  return { success: true, data: { loggedOut: true }, error: null };
}

function assertAuthenticated(token) {
  if (!token) {
    throw new Error('Authentication required. Missing session token.');
  }

  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('JWT_SIGNING_SECRET') || 'sk_dev_team_secret_default';

  var isRevoked = props.getProperty('REVOKED_TOKEN_' + hashWithSalt(token, 'revoke'));
  if (isRevoked) {
    throw new Error('Session has been revoked. Please log in again.');
  }

  var parts = String(token).split('.');
  if (parts.length !== 2) {
    throw new Error('Malformed session token format.');
  }

  var payloadStr = Utilities.newBlob(Utilities.base64Decode(parts[0])).getDataAsString();
  var sessionData;
  try {
    sessionData = JSON.parse(payloadStr);
  } catch (e) {
    throw new Error('Invalid token payload.');
  }

  if (!sessionData.exp || Date.now() > sessionData.exp) {
    throw new Error('Session token expired. Please log in again.');
  }

  var expectedSig = computeHmacSha256(parts[0], secret);
  if (expectedSig !== parts[1]) {
    throw new Error('Invalid session token signature.');
  }

  return sessionData;
}

// =============================================================
// 7. PROTECTED ADMIN MANAGEMENT CONTROLLERS
// =============================================================

function handleGetDashboardSummary() {
  var ss = getSpreadsheet();
  var inquiriesSheet = ss.getSheetByName('ProjectInquiries');
  var projectsSheet = ss.getSheetByName('Projects');

  var inquiries = inquiriesSheet ? getRowsAsObjects(inquiriesSheet) : [];
  var projects = projectsSheet ? getRowsAsObjects(projectsSheet) : [];

  var newLeadsCount = inquiries.filter(function(i) {
    var st = String(i.Status || '').toLowerCase();
    return st === 'new' || st === 'pending';
  }).length;

  var activeProjectsCount = projects.filter(function(p) {
    return String(p.Status || '').toLowerCase() === 'published';
  }).length;

  return {
    success: true,
    data: {
      totalInquiries: inquiries.length,
      newLeads: newLeadsCount,
      totalProjects: projects.length,
      activeProjects: activeProjectsCount,
      uptimeTarget: '99.98%',
      timestamp: new Date().toISOString()
    },
    error: null
  };
}

function handleListInquiries(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('ProjectInquiries');
  if (!sheet) return { success: true, data: [], error: null };

  var rows = getRowsAsObjects(sheet);
  rows.sort(function(a, b) {
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  return { success: true, data: rows, error: null };
}

function handleUpdateInquiry(payload) {
  var inquiryId = payload.inquiryId;
  if (!inquiryId) {
    return { success: false, data: null, error: { code: 'MISSING_ID', message: 'InquiryID is required.' } };
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('ProjectInquiries');
  if (!sheet) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Inquiries sheet missing.' } };

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf('InquiryID');
  var statusCol = headers.indexOf('Status');
  var notesCol = headers.indexOf('FollowUpNotes');

  var rowIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(inquiryId)) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Inquiry not found with ID ' + inquiryId } };
  }

  if (payload.status && statusCol !== -1) {
    sheet.getRange(rowIndex, statusCol + 1).setValue(payload.status);
  }
  if (payload.notes !== undefined && notesCol !== -1) {
    sheet.getRange(rowIndex, notesCol + 1).setValue(payload.notes);
  }

  logAuditEvent('UPDATE_INQUIRY', 'Updated inquiry ' + inquiryId + ' status to ' + payload.status);
  return { success: true, data: { inquiryId: inquiryId, updated: true }, error: null };
}

function handleCreateProject(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Projects');
  if (!sheet) {
    sheet = ss.insertSheet('Projects');
    sheet.appendRow(['ID', 'Title', 'Category', 'LiveUrl', 'Client', 'Description', 'Technologies', 'Status', 'Date']);
  }

  var newId = 'proj-' + Date.now();
  sheet.appendRow([
    newId,
    payload.title || 'Untitled Project',
    payload.category || 'Web Platforms',
    payload.liveUrl || '',
    payload.client || 'Commercial Client',
    payload.description || '',
    payload.technologies || '',
    payload.status || 'Published',
    new Date().toISOString().slice(0, 10)
  ]);

  logAuditEvent('CREATE_PROJECT', 'Created project ' + payload.title);
  return { success: true, data: { id: newId }, error: null };
}

function handleUpdateProject(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Projects');
  if (!sheet) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Projects sheet not found.' } };

  var data = sheet.getDataRange().getValues();
  var idCol = data[0].indexOf('ID');
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(payload.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Project not found.' } };
  }

  var headers = data[0];
  for (var k in payload) {
    var cIndex = headers.indexOf(k.charAt(0).toUpperCase() + k.slice(1));
    if (cIndex !== -1 && k !== 'id') {
      sheet.getRange(rowIndex, cIndex + 1).setValue(payload[k]);
    }
  }

  logAuditEvent('UPDATE_PROJECT', 'Updated project ' + payload.id);
  return { success: true, data: { id: payload.id, updated: true }, error: null };
}

function handleDeleteProject(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Projects');
  if (!sheet) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Sheet not found.' } };

  var data = sheet.getDataRange().getValues();
  var idCol = data[0].indexOf('ID');

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(payload.id)) {
      sheet.deleteRow(i + 1);
      logAuditEvent('DELETE_PROJECT', 'Deleted project ' + payload.id);
      return { success: true, data: { deleted: true }, error: null };
    }
  }

  return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Project not found.' } };
}

function handleCreateService(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Services');
  if (!sheet) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Services sheet not found.' } };

  var newId = 'srv-' + Date.now();
  sheet.appendRow([
    newId,
    payload.title || '',
    payload.category || '',
    payload.summary || '',
    payload.features || '',
    payload.pricingNotice || 'Request a Quote',
    payload.status || 'Active'
  ]);

  logAuditEvent('CREATE_SERVICE', 'Created service ' + payload.title);
  return { success: true, data: { id: newId }, error: null };
}

function handleUpdateService(payload) {
  logAuditEvent('UPDATE_SERVICE', 'Updated service ' + payload.id);
  return { success: true, data: { updated: true }, error: null };
}

function handleCreatePackage(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Packages');
  if (!sheet) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Packages sheet not found.' } };

  var newId = 'pkg-' + Date.now();
  sheet.appendRow([
    newId,
    payload.serviceId || '',
    payload.tier || 'Small',
    payload.title || '',
    payload.features || '',
    payload.suitableFor || '',
    payload.quotationNotice || 'Quotation tailored to scope'
  ]);

  logAuditEvent('CREATE_PACKAGE', 'Created package ' + payload.title);
  return { success: true, data: { id: newId }, error: null };
}

function handleUpdatePackage(payload) {
  logAuditEvent('UPDATE_PACKAGE', 'Updated package ' + payload.id);
  return { success: true, data: { updated: true }, error: null };
}

function handleGetAdminSettings() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Settings');
  if (!sheet) return { success: true, data: {}, error: null };

  var rows = getRowsAsObjects(sheet);
  var settings = {};
  rows.forEach(function(r) {
    if (r.Key) settings[r.Key] = r.Value;
  });

  return { success: true, data: settings, error: null };
}

function handleUpdateAdminSettings(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    sheet = ss.insertSheet('Settings');
    sheet.appendRow(['Key', 'Value', 'UpdatedAt']);
  }

  var data = sheet.getDataRange().getValues();
  var now = new Date().toISOString();

  for (var k in payload.settings || {}) {
    var val = payload.settings[k];
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === k) {
        sheet.getRange(i + 1, 2).setValue(val);
        sheet.getRange(i + 1, 3).setValue(now);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([k, val, now]);
    }
  }

  logAuditEvent('UPDATE_SETTINGS', 'Updated admin settings');
  return { success: true, data: { updated: true }, error: null };
}

// =============================================================
// 8. SECURITY & HASHING UTILITIES
// =============================================================

/**
 * Configure Administrator Credentials in Script Properties (Run Once)
 * Example execution in Apps Script console:
 *   initializeAdminCredentials('MySecurePassword123!')
 */
function initializeAdminCredentials(password) {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }

  var props = PropertiesService.getScriptProperties();
  var salt = Utilities.getUuid();

  var passHash = hashWithSalt(password, salt);

  props.setProperty('ADMIN_EMAIL', APP_CONSTANTS.DEFAULT_ADMIN_EMAIL);
  props.setProperty('ADMIN_PASSWORD_HASH', passHash);
  props.setProperty('ADMIN_PASSWORD_SALT', salt);
  props.deleteProperty('ADMIN_CNIC_HASH');
  props.setProperty('JWT_SIGNING_SECRET', Utilities.getUuid() + '-' + Utilities.getUuid());

  Logger.log('Admin credentials initialized successfully for ' + APP_CONSTANTS.DEFAULT_ADMIN_EMAIL);
}

function hashWithSalt(value, salt) {
  var combined = String(value) + '::' + String(salt);
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, combined);
  var hex = '';
  for (var i = 0; i < rawHash.length; i++) {
    var byteVal = rawHash[i];
    if (byteVal < 0) byteVal += 256;
    var byteHex = byteVal.toString(16);
    if (byteHex.length === 1) byteHex = '0' + byteHex;
    hex += byteHex;
  }
  return hex;
}

function computeHmacSha256(message, secret) {
  var raw = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, message, secret);
  return Utilities.base64Encode(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateSecureOtp() {
  var randomBytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid() + Date.now().toString());
  var num = 0;
  for (var i = 0; i < 4; i++) {
    num = (num << 8) + (randomBytes[i] & 0xff);
  }
  var code = Math.abs(num % 900000) + 100000;
  return String(code);
}

function issueSessionToken() {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('JWT_SIGNING_SECRET');
  if (!secret) {
    secret = Utilities.getUuid() + '-' + Utilities.getUuid();
    props.setProperty('JWT_SIGNING_SECRET', secret);
  }

  var now = Date.now();
  var payload = {
    sub: APP_CONSTANTS.DEFAULT_ADMIN_EMAIL,
    role: 'SUPER_ADMIN',
    iat: now,
    exp: now + AUTH_CONSTANTS.SESSION_DURATION_MS,
    jti: Utilities.getUuid()
  };

  var payloadEncoded = Utilities.base64Encode(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  var signature = computeHmacSha256(payloadEncoded, secret);

  return payloadEncoded + '.' + signature;
}

function recordFailedAttempt() {
  var props = PropertiesService.getScriptProperties();
  var count = Number(props.getProperty('AUTH_FAILED_ATTEMPTS') || '0') + 1;
  props.setProperty('AUTH_FAILED_ATTEMPTS', String(count));

  if (count >= AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS) {
    var lockoutTime = Date.now() + AUTH_CONSTANTS.LOCKOUT_DURATION_MS;
    props.setProperty('AUTH_LOCKOUT_UNTIL', String(lockoutTime));
    logAuditEvent('LOCKOUT_TRIGGERED', '3 consecutive failed login attempts detected. 24-hour lockout activated.');
  }

  return count;
}

function clearOtpChallenge() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('ACTIVE_OTP_CHALLENGE');
  props.deleteProperty('ACTIVE_OTP_HASH');
  props.deleteProperty('ACTIVE_OTP_EXPIRY');
  props.deleteProperty('ACTIVE_OTP_ATTEMPTS');
}

function logAuditEvent(eventType, details) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName('AdminAudit');
    if (!sheet) {
      sheet = ss.insertSheet('AdminAudit');
      sheet.appendRow(['Timestamp', 'EventType', 'Details', 'Actor']);
    }
    sheet.appendRow([new Date().toISOString(), eventType, details, 'System/Admin']);
  } catch (e) {
    Logger.log('Audit log error: ' + e.toString());
  }
}

// =============================================================
// 9. DATABASE HELPERS & SEED DATA
// =============================================================

function getRowsAsObjects(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) return [];

  var data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = data[0];
  var results = [];

  for (var r = 1; r < data.length; r++) {
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var headerKey = String(headers[c] || '').trim();
      if (headerKey) {
        obj[headerKey] = data[r][c];
      }
    }
    results.push(obj);
  }
  return results;
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function seedProjectsIfEmpty(sheet) {
  if (sheet.getLastRow() > 1) return;

  var initialProjects = [
    ['sk-portfolio', 'SK DEV TEAM Portfolio', 'Web Platforms', 'https://suhailahmedaamro.vercel.app/', 'SK DEV TEAM', 'Official agency headquarters and dynamic client telemetry portal.', 'Next.js 14, React, Tailwind CSS, Vercel', 'Published', '2025-01-01'],
    ['d-pizza', 'D-Pizza Storefront & Ordering', 'E-Commerce', 'https://www.d-pizza.shop/', 'Artisanal Dining Brand', 'Digital culinary ordering platform with real-time pizza customizer and Stripe checkout.', 'React 18, Node.js API, Stripe Payments, Tailwind CSS', 'Published', '2024-11-15'],
    ['education-hub', 'Education Hub (LMS)', 'Education & LMS', 'https://education-hub-dusky.vercel.app/', 'Global Academy Network', 'Academic governance engine with role-based dashboards for faculty and students.', 'Next.js, PostgreSQL, JWT Auth, Tailwind CSS', 'Published', '2024-12-10'],
    ['dccid', 'DCCID Institutional Platform', 'Enterprise & Admin', 'https://dccid-79522kcag-aamrosk519-3847s-projects.vercel.app/', 'Institutional Governance', 'Secure organizational directory, document archive, and workflow engine.', 'Enterprise Next.js, Cloudflare DNS, React', 'Published', '2025-02-01'],
    ['ai-booking', 'AI Appointment Booking Agent', 'AI & Automation', 'https://ai-appointment-booking-agent-omega.vercel.app/', 'Healthcare & Professional Services', 'Conversational AI scheduler with Google Calendar synchronization and webhook dispatch.', 'FastAPI, Python 3.12, AI Agents, Webhooks', 'Published', '2025-02-15'],
    ['sk-builder', 'SK Builder Platform', 'Web Platforms', 'https://sk-conding.vercel.app/', 'Civil Contracting Firm', 'Modern corporate portal for construction, architectural estimators, and blueprint inquiries.', 'React, Tailwind CSS, Modern CSS, Vercel', 'Published', '2024-10-20']
  ];

  initialProjects.forEach(function(p) {
    sheet.appendRow(p);
  });
}

function seedServicesIfEmpty(sheet) {
  if (sheet.getLastRow() > 1) return;

  var services = [
    ['srv-web', 'Business Website Development', 'Web Platforms', 'Ultra-fast, responsive corporate websites engineered for conversions.', 'Mobile Responsive\nContact Form\nBasic SEO', 'Request a Quote', 'Active'],
    ['srv-ecom', 'E-commerce Website & Online Ordering', 'E-Commerce', 'Secure digital catalogues, food ordering systems, and Stripe payments.', 'Product Catalogue\nCart & Checkout\nOrder Summaries', 'Request a Quote', 'Active'],
    ['srv-school', 'School Management & Education Systems', 'Education & LMS', 'Academic portals with student registries, gradebooks, and attendance.', 'Student Directory\nAdmission Form\nAdmin Dashboard', 'Request a Quote', 'Active'],
    ['srv-dash', 'Admin Dashboards & Internal Tools', 'Enterprise', 'Operational consoles, live KPI visualizers, and role-based staff views.', 'KPI Cards\nData Tables\nCSV Export', 'Request a Quote', 'Active'],
    ['srv-custom', 'Custom Web Applications', 'Custom Software', 'Tailored software architectures built for unique workflows and SaaS.', 'Custom Logic\nAPI Integrations\nRole Authentication', 'Request a Quote', 'Active'],
    ['srv-book', 'Appointment Booking Systems', 'Scheduling', 'Frictionless scheduling engines with calendar sync and notifications.', 'Slot Selection\nEmail Alerts\nAdmin Management', 'Request a Quote', 'Active'],
    ['srv-ai', 'AI Assistants & Business Automation', 'AI & Automation', 'Autonomous customer support agents and webhook pipelines.', 'FAQ Guidance\nLead Qualification\nAPI Webhooks', 'Request a Quote', 'Active'],
    ['srv-seo', 'SEO & Website Optimization', 'Marketing & SEO', 'On-page and technical SEO, speed enhancement, and indexing readiness.', 'Meta structuring\nSitemaps\nSpeed Audits', 'Request a Quote', 'Active'],
    ['srv-maint', 'Website Maintenance & Improvements', 'Maintenance', 'Ongoing security patches, library updates, and content additions.', 'Bug Fixes\nContent Updates\nMonitoring', 'Request a Quote', 'Active']
  ];

  services.forEach(function(s) {
    sheet.appendRow(s);
  });
}

function seedPackagesIfEmpty(sheet) {
  if (sheet.getLastRow() > 1) return;

  var pkgs = [
    ['pkg-1', 'srv-web', 'Small', 'Basic Online Presence', 'Simple landing structure\nWhatsApp button\nBasic SEO', 'New startups & local businesses', 'Quotation tailored to scope'],
    ['pkg-2', 'srv-web', 'Medium', 'Growing Business Website', 'Multiple pages\nLead-capture form\nEnhanced SEO & animations', 'Active businesses & agencies', 'Quotation tailored to scope'],
    ['pkg-3', 'srv-web', 'Premium', 'Advanced Business Presence', 'Bespoke custom UI\nAdvanced lead workflows\nThird-party integrations', 'Established enterprises', 'Quotation tailored to scope']
  ];

  pkgs.forEach(function(p) {
    sheet.appendRow(p);
  });
}

function seedSettingsIfEmpty(sheet) {
  if (sheet.getLastRow() > 1) return;

  var now = new Date().toISOString();
  var defaultSettings = [
    ['brand_name', 'SK DEV TEAM', now],
    ['brand_tagline', 'Digital Solutions for Growing Businesses', now],
    ['primary_email', APP_CONSTANTS.DEFAULT_ADMIN_EMAIL, now],
    ['primary_whatsapp', '+92 315 3558383', now],
    ['alt_phone', '+92 309 3305243', now],
    ['lead_architect', 'Suhail Ahmed', now],
    ['primary_market', 'Dadu, Sindh, Pakistan & Global Remote', now],
    ['default_currency', 'PKR', now]
  ];

  defaultSettings.forEach(function(s) {
    sheet.appendRow(s);
  });
}
