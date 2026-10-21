/**
 * SK DEV TEAM — Authentication & Security Subsystem (Auth.gs)
 * 
 * Enforces:
 *  - Two-Factor Multi-step authentication (Master Password + Email OTP)
 *  - 24-Hour Lockout after 3 consecutive failed credential attempts
 *  - Cryptographically secure 6-digit Email OTP delivered via MailApp
 *  - 10-Minute OTP expiration & 3-attempt limit per OTP challenge
 *  - Short-lived cryptographically signed session tokens
 *  - Zero sensitive data exposure in audit logs (no passwords/raw OTPs)
 */

var AUTH_CONSTANTS = {
  LOCKOUT_DURATION_MS: 24 * 60 * 60 * 1000, // 24 hours
  MAX_FAILED_ATTEMPTS: 3,
  OTP_EXPIRY_MS: 10 * 60 * 1000, // 10 minutes
  MAX_OTP_ATTEMPTS: 3,
  SESSION_DURATION_MS: 4 * 60 * 60 * 1000 // 4 hours
};

/**
 * Handle initial credential step: Email + Password verification, then dispatch 6-Digit Email OTP
 */
function handleAdminLogin(payload) {
  var props = PropertiesService.getScriptProperties();
  var email = String(payload.email || '').trim().toLowerCase();
  var password = String(payload.password || '');

  // Check 24-Hour Lockout Status
  var lockoutUntil = Number(props.getProperty('AUTH_LOCKOUT_UNTIL') || '0');
  var now = Date.now();
  if (now < lockoutUntil) {
    var remainingHours = Math.ceil((lockoutUntil - now) / (60 * 60 * 1000));
    logAuditEvent('LOGIN_LOCKED', 'Login attempt rejected due to active 24h lockout. Remaining: ' + remainingHours + ' hours.');
    return {
      success: false,
      data: null,
      error: {
        code: 'ACCOUNT_LOCKED',
        message: 'Security lockout active due to 3 consecutive failed attempts. Please retry in ' + remainingHours + ' hours or contact the root administrator.'
      }
    };
  }

  // Retrieve configured admin credentials from ScriptProperties
  var adminEmail = String(props.getProperty('ADMIN_EMAIL') || 'suhailahmedaamro786@gmail.com').toLowerCase();
  var passwordHash = props.getProperty('ADMIN_PASSWORD_HASH');
  var passwordSalt = props.getProperty('ADMIN_PASSWORD_SALT') || 'sk_salt_default';

  // Verify email match
  if (email !== adminEmail) {
    recordFailedAttempt();
    return {
      success: false,
      data: null,
      error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials provided.' }
    };
  }

  // If credentials are not yet initialized in ScriptProperties, provide bootstrap instruction
  if (!passwordHash) {
    return {
      success: false,
      data: null,
      error: {
        code: 'SETUP_REQUIRED',
        message: 'Admin credentials have not been initialized. Please run initializeAdminCredentials(password) in the Apps Script console.'
      }
    };
  }

  // Validate Password Hash: SHA-256(password + salt)
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

  // Credentials Valid! Generate Cryptographically Secure 6-Digit Email OTP
  var otp = generateSecureOtp();
  var challengeId = 'chn-' + Utilities.getUuid();
  var otpExpiry = now + AUTH_CONSTANTS.OTP_EXPIRY_MS;

  // Store OTP challenge state in ScriptProperties
  props.setProperty('ACTIVE_OTP_CHALLENGE', challengeId);
  props.setProperty('ACTIVE_OTP_HASH', hashWithSalt(otp, challengeId));
  props.setProperty('ACTIVE_OTP_EXPIRY', String(otpExpiry));
  props.setProperty('ACTIVE_OTP_ATTEMPTS', '0');

  // Reset failed login counter upon successful credential match
  props.deleteProperty('AUTH_FAILED_ATTEMPTS');

  // Send OTP to authorized admin email via MailApp
  try {
    var subject = 'SK DEV TEAM Admin Login Verification Code (OTP: ' + otp + ')';
    var emailBody = 'Assalam-o-Alaikum Suhail Ahmed,\n\n' +
      'An administrative login request was initiated for the SK DEV TEAM Admin Console.\n\n' +
      'Your One-Time Verification Code (OTP) is:\n\n' +
      '    >>>  ' + otp + '  <<<\n\n' +
      'This code will expire in 10 minutes.\n\n' +
      'If you did not initiate this login, your credentials may have been compromised. Change your password immediately.\n\n' +
      'SK DEV TEAM — Digital Solutions for Growing Businesses';

    MailApp.sendEmail(adminEmail, subject, emailBody);
  } catch (mailErr) {
    Logger.log('MailApp error delivering OTP: ' + mailErr.toString());
  }

  logAuditEvent('OTP_DISPATCHED', 'Login challenge ' + challengeId + ' dispatched to authorized admin email.');

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
 * Handle Step 2: Verify 6-digit OTP and Issue Signed Session Token
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

  // Validate challenge existence
  if (!storedChallenge || storedChallenge !== challengeId) {
    return {
      success: false,
      data: null,
      error: { code: 'INVALID_CHALLENGE', message: 'No active OTP challenge found. Please re-enter credentials.' }
    };
  }

  // Check expiry
  if (now > storedExpiry) {
    clearOtpChallenge();
    return {
      success: false,
      data: null,
      error: { code: 'OTP_EXPIRED', message: 'Verification code has expired. Please request a new login.' }
    };
  }

  // Check attempts
  if (attempts >= AUTH_CONSTANTS.MAX_OTP_ATTEMPTS) {
    clearOtpChallenge();
    recordFailedAttempt();
    return {
      success: false,
      data: null,
      error: { code: 'TOO_MANY_ATTEMPTS', message: 'Maximum OTP attempts exceeded. Please restart login.' }
    };
  }

  // Validate OTP
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

  // SUCCESS! Invalidate OTP immediately to prevent reuse
  clearOtpChallenge();

  // Issue Cryptographically Signed Session Token
  var sessionToken = issueSessionToken();
  logAuditEvent('LOGIN_SUCCESS', 'Administrator successfully authenticated via 2FA OTP.');

  return {
    success: true,
    data: {
      token: sessionToken,
      expiresAt: new Date(now + AUTH_CONSTANTS.SESSION_DURATION_MS).toISOString(),
      admin: {
        name: 'Suhail Ahmed',
        email: 'suhailahmedaamro786@gmail.com',
        role: 'SUPER_ADMIN'
      }
    },
    error: null
  };
}

/**
 * Handle Admin Logout
 */
function handleAdminLogout(payload) {
  var props = PropertiesService.getScriptProperties();
  if (payload.token) {
    // Revoke token by adding to revocation list
    props.setProperty('REVOKED_TOKEN_' + hashWithSalt(payload.token, 'revoke'), '1');
  }
  logAuditEvent('LOGOUT', 'Administrator logged out.');
  return { success: true, data: { loggedOut: true }, error: null };
}

/**
 * Assert that request contains a valid, non-expired, signed token
 */
function assertAuthenticated(token) {
  if (!token) {
    throw new Error('Authentication required. Missing session token.');
  }

  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('JWT_SIGNING_SECRET') || 'sk_dev_team_secret_default';

  // Check if token has been explicitly revoked
  var isRevoked = props.getProperty('REVOKED_TOKEN_' + hashWithSalt(token, 'revoke'));
  if (isRevoked) {
    throw new Error('Session has been revoked. Please log in again.');
  }

  // Verify token format: payloadBase64.signature
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

  // Check expiration
  if (!sessionData.exp || Date.now() > sessionData.exp) {
    throw new Error('Session token expired. Please log in again.');
  }

  // Check signature match
  var expectedSig = computeHmacSha256(parts[0], secret);
  if (expectedSig !== parts[1]) {
    throw new Error('Invalid session token signature.');
  }

  return sessionData;
}

// -------------------------------------------------------------
// INTERNAL AUTH UTILITIES
// -------------------------------------------------------------

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
  // Use cryptographic random bytes
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
    sub: 'suhailahmedaamro786@gmail.com',
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
