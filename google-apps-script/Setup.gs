/**
 * SK DEV TEAM — Spreadsheet Initialization & Database Migration (Setup.gs)
 * 
 * Functions:
 *  - setupSKDevTeam(): Master setup configuring spreadsheet ID, Drive workspace, and tabs
 *  - setupDatabase(): Safely creates all 6 required spreadsheet tabs with headers and initial seeds
 *  - migrateDatabase(): Non-destructive migration that adds any missing header columns
 *  - initializeAdminCredentials(password): Configures owner credentials in ScriptProperties
 *  - testOtpDispatch(): Validates MailApp email delivery to administrator inbox
 */

function setupSKDevTeam() {
  var SPREADSHEET_ID = '1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c';
  var props = PropertiesService.getScriptProperties();
  props.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);
  props.setProperty('ADMIN_EMAIL', 'suhailahmedaamro786@gmail.com');

  var folders = DriveApp.getFoldersByName('SK DEV TEAM Workspace');
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('SK DEV TEAM Workspace');
  props.setProperty('DRIVE_FOLDER_ID', folder.getId());

  setupDatabase();
  Logger.log('setupSKDevTeam() completed successfully!');
}

function setupDatabase() {
  var ss = getSpreadsheet();
  Logger.log('Starting SK DEV TEAM Database Setup on: ' + ss.getName());

  // 1. Tab: ProjectInquiries
  getOrCreateSheet(ss, 'ProjectInquiries', [
    'InquiryID', 'Timestamp', 'ClientName', 'BusinessName', 'Email', 
    'Phone', 'ServiceCategory', 'SelectedPackage', 'BudgetRange', 
    'PreferredContact', 'ProjectDetails', 'DesiredFeatures', 'ReferenceDemo', 
    'Status', 'FollowUpNotes'
  ]);

  // 2. Tab: Projects
  var projSheet = getOrCreateSheet(ss, 'Projects', [
    'ID', 'Title', 'Category', 'LiveUrl', 'Client', 'Description', 'Technologies', 'Status', 'Date'
  ]);
  seedProjectsIfEmpty(projSheet);

  // 3. Tab: Services
  var servSheet = getOrCreateSheet(ss, 'Services', [
    'ID', 'Title', 'Category', 'Summary', 'Features', 'PricingNotice', 'Status'
  ]);
  seedServicesIfEmpty(servSheet);

  // 4. Tab: Packages
  var pkgSheet = getOrCreateSheet(ss, 'Packages', [
    'ID', 'ServiceID', 'Tier', 'Title', 'Features', 'SuitableFor', 'QuotationNotice'
  ]);
  seedPackagesIfEmpty(pkgSheet);

  // 5. Tab: Settings
  var settSheet = getOrCreateSheet(ss, 'Settings', [
    'Key', 'Value', 'UpdatedAt'
  ]);
  seedSettingsIfEmpty(settSheet);

  // 6. Tab: AdminAudit
  getOrCreateSheet(ss, 'AdminAudit', [
    'Timestamp', 'EventType', 'Details', 'Actor'
  ]);

  Logger.log('SK DEV TEAM Database Setup completed successfully!');
}

/**
 * Safe Migration Function:
 * Inspects all sheets and appends any newly required header columns without deleting existing data.
 */
function migrateDatabase() {
  var ss = getSpreadsheet();
  Logger.log('Starting safe database migration...');

  var schema = {
    'ProjectInquiries': [
      'InquiryID', 'Timestamp', 'ClientName', 'BusinessName', 'Email', 
      'Phone', 'ServiceCategory', 'SelectedPackage', 'BudgetRange', 
      'PreferredContact', 'ProjectDetails', 'DesiredFeatures', 'ReferenceDemo', 
      'Status', 'FollowUpNotes'
    ],
    'Projects': [
      'ID', 'Title', 'Category', 'LiveUrl', 'Client', 'Description', 'Technologies', 'Status', 'Date'
    ],
    'Services': [
      'ID', 'Title', 'Category', 'Summary', 'Features', 'PricingNotice', 'Status'
    ],
    'Packages': [
      'ID', 'ServiceID', 'Tier', 'Title', 'Features', 'SuitableFor', 'QuotationNotice'
    ],
    'Settings': [
      'Key', 'Value', 'UpdatedAt'
    ],
    'AdminAudit': [
      'Timestamp', 'EventType', 'Details', 'Actor'
    ]
  };

  for (var sheetName in schema) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log('Creating missing tab during migration: ' + sheetName);
      getOrCreateSheet(ss, sheetName, schema[sheetName]);
      continue;
    }

    var lastCol = sheet.getLastColumn();
    var existingHeaders = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
    var expectedHeaders = schema[sheetName];

    for (var i = 0; i < expectedHeaders.length; i++) {
      var colName = expectedHeaders[i];
      if (existingHeaders.indexOf(colName) === -1) {
        var newColIdx = sheet.getLastColumn() + 1;
        sheet.getRange(1, newColIdx).setValue(colName);
        Logger.log('Appended missing column [' + colName + '] to sheet ' + sheetName);
      }
    }
  }

  Logger.log('Migration completed successfully. All existing data was safely preserved.');
}

/**
 * Setup Admin Credentials in Script Properties (Run Once by Administrator)
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

  props.setProperty('ADMIN_EMAIL', 'suhailahmedaamro786@gmail.com');
  props.setProperty('ADMIN_PASSWORD_HASH', passHash);
  props.setProperty('ADMIN_PASSWORD_SALT', salt);
  props.deleteProperty('ADMIN_CNIC_HASH');
  props.setProperty('JWT_SIGNING_SECRET', Utilities.getUuid() + '-' + Utilities.getUuid());

  Logger.log('Admin credentials initialized successfully for suhailahmedaamro786@gmail.com.');
}

/**
 * Test MailApp OTP Dispatch
 */
function testOtpDispatch() {
  var testOtp = '123456';
  var adminEmail = 'suhailahmedaamro786@gmail.com';
  MailApp.sendEmail(
    adminEmail,
    'SK DEV TEAM — OTP Mail Test',
    'This is a verification test from your Google Apps Script environment.\n\nTest OTP: ' + testOtp
  );
  Logger.log('Test email successfully dispatched to ' + adminEmail);
}

// -------------------------------------------------------------
// INTERNAL SEED HELPERS
// -------------------------------------------------------------

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
  if (sheet.getLastRow() > 1) return; // Already has data, preserve!

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
    ['primary_email', 'suhailahmedaamro786@gmail.com', now],
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
