/**
 * SK DEV TEAM — Basic Admin Authentication API
 * Google Apps Script
 *
 * Script Properties required:
 * SKDEV_ADMIN_EMAIL
 * SKDEV_INITIAL_PASSWORD (one-time setup only)
 *
 * Actions:
 * GET  ?action=health
 * POST login, verifyOtp, checkSession, logout
 *
 * Never put passwords, OTPs, or secrets in frontend code.
 */

const SK_AUTH = {
  ADMIN_EMAIL: "SKDEV_ADMIN_EMAIL",
  INITIAL_PASSWORD: "SKDEV_INITIAL_PASSWORD",
  PASSWORD_HASH: "SKDEV_PASSWORD_HASH",
  PASSWORD_SALT: "SKDEV_PASSWORD_SALT",
  SECRET: "SKDEV_AUTH_SECRET",
  OTP_PREFIX: "SKDEV_OTP_",
  SESSION_PREFIX: "SKDEV_SESSION_",
  LAST_OTP_REQUEST: "SKDEV_LAST_OTP_REQUEST",
  OTP_EXPIRY_MS: 5 * 60 * 1000,
  SESSION_EXPIRY_MS: 4 * 60 * 60 * 1000,
  MAX_OTP_ATTEMPTS: 5,
  OTP_COOLDOWN_MS: 30 * 1000,
  HASH_ITERATIONS: 10000
};

function authProperties_() {
  return PropertiesService.getScriptProperties();
}

function authJson_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function authEmail_(email) {
  return String(email || "").trim().toLowerCase();
}

function authHmacWithSecret_(value, secret) {
  return Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(
      String(value),
      String(secret)
    )
  );
}

function authHmac_(value) {
  const secret = authProperties_().getProperty(SK_AUTH.SECRET);
  if (!secret) throw new Error("Authentication is not initialized.");
  return authHmacWithSecret_(value, secret);
}

/**
 * Keep the secret in memory during hashing rather than reading
 * Script Properties on every iteration.
 */
function authPasswordHash_(password, salt) {
  const props = authProperties_();
  const secret = props.getProperty(SK_AUTH.SECRET);

  if (!secret) throw new Error("Authentication secret is missing.");
  if (!password || !salt) throw new Error("Password or salt is missing.");

  let value = String(salt) + ":" + String(password);

  for (let i = 0; i < SK_AUTH.HASH_ITERATIONS; i++) {
    value = authHmacWithSecret_("password:" + value, secret);
  }

  return value;
}

function authRequireInitialized_() {
  const props = authProperties_();

  const required = [
    SK_AUTH.ADMIN_EMAIL,
    SK_AUTH.PASSWORD_HASH,
    SK_AUTH.PASSWORD_SALT,
    SK_AUTH.SECRET
  ];

  const missing = required.filter(function(key) {
    return !props.getProperty(key);
  });

  if (missing.length) {
    throw new Error(
      "Authentication setup incomplete. Missing: " + missing.join(", ")
    );
  }
}

/**
 * Run once from the Apps Script editor after setting:
 * SKDEV_ADMIN_EMAIL
 * SKDEV_INITIAL_PASSWORD
 *
 * Do not run repeatedly after successful initialization.
 */
function initializeSKDevAuth() {
  const props = authProperties_();

  const email = authEmail_(props.getProperty(SK_AUTH.ADMIN_EMAIL));
  const password = props.getProperty(SK_AUTH.INITIAL_PASSWORD);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Set a valid SKDEV_ADMIN_EMAIL in Script Properties.");
  }

  if (!password || password.length < 16) {
    throw new Error(
      "Set a unique temporary password of at least 16 characters."
    );
  }

  if (props.getProperty(SK_AUTH.PASSWORD_HASH)) {
    throw new Error(
      "A password hash already exists. Do not initialize again."
    );
  }

  let secret = props.getProperty(SK_AUTH.SECRET);

  if (!secret) {
    secret = Utilities.getUuid() +
      Utilities.getUuid() +
      Utilities.getUuid();

    props.setProperty(SK_AUTH.SECRET, secret);
  }

  let salt = props.getProperty(SK_AUTH.PASSWORD_SALT);

  if (!salt) {
    salt = Utilities.getUuid() + Utilities.getUuid();
    props.setProperty(SK_AUTH.PASSWORD_SALT, salt);
  }

  const passwordHash = authPasswordHash_(password, salt);

  props.setProperties({
    SKDEV_ADMIN_EMAIL: email,
    SKDEV_PASSWORD_SALT: salt,
    SKDEV_PASSWORD_HASH: passwordHash
  });

  props.deleteProperty(SK_AUTH.INITIAL_PASSWORD);

  return {
    success: true,
    message: "Authentication initialized. Temporary password deleted."
  };
}

function beginAdminLogin_(email, password) {
  authRequireInitialized_();

  const props = authProperties_();
  const adminEmail = authEmail_(props.getProperty(SK_AUTH.ADMIN_EMAIL));

  if (authEmail_(email) !== adminEmail) {
    throw new Error("Invalid email or password.");
  }

  const salt = props.getProperty(SK_AUTH.PASSWORD_SALT);
  const expectedHash = props.getProperty(SK_AUTH.PASSWORD_HASH);
  const suppliedHash = authPasswordHash_(password, salt);

  if (!authConstantTimeEqual_(suppliedHash, expectedHash)) {
    throw new Error("Invalid email or password.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  let challengeId;
  let otp;

  try {
    const now = Date.now();
    const lastRequest = Number(
      props.getProperty(SK_AUTH.LAST_OTP_REQUEST) || "0"
    );

    if (now - lastRequest < SK_AUTH.OTP_COOLDOWN_MS) {
      throw new Error("Wait 30 seconds before requesting another OTP.");
    }

    const allProps = props.getProperties();

    Object.keys(allProps).forEach(function(key) {
      if (key.indexOf(SK_AUTH.OTP_PREFIX) === 0) {
        props.deleteProperty(key);
      }
    });

    challengeId = Utilities.getUuid();
    const hex = Utilities.getUuid().replace(/-/g, "").slice(0, 8);
    otp = String(parseInt(hex, 16) % 1000000).padStart(6, "0");

    const challenge = {
      email: adminEmail,
      otpHash: authHmac_("otp:" + challengeId + ":" + otp),
      expiresAt: now + SK_AUTH.OTP_EXPIRY_MS,
      attempts: 0
    };

    props.setProperty(
      SK_AUTH.OTP_PREFIX + challengeId,
      JSON.stringify(challenge)
    );

    props.setProperty(SK_AUTH.LAST_OTP_REQUEST, String(now));
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: "SK DEV TEAM — Admin Login OTP",
      body:
        "Your verification code is: " + otp +
        "\nIt expires in 5 minutes. Never share this code."
    });
  } catch (error) {
    props.deleteProperty(SK_AUTH.OTP_PREFIX + challengeId);
    Logger.log(
      "MailApp OTP send failed: " +
      String(error && error.message ? error.message : error)
    );
    throw new Error("Could not send OTP. Check Mail authorization.");
  }

  return {
    success: true,
    challengeId: challengeId,
    message: "Verification code sent to admin email.",
    expiresInSeconds: 300
  };
}

function verifyAdminOtp_(challengeId, otp) {
  authRequireInitialized_();

  challengeId = String(challengeId || "");
  otp = String(otp || "");

  if (!/^[a-f0-9-]{36}$/i.test(challengeId) || !/^\d{6}$/.test(otp)) {
    throw new Error("Invalid or expired verification challenge.");
  }

  const props = authProperties_();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  let session;

  try {
    const key = SK_AUTH.OTP_PREFIX + challengeId;
    const raw = props.getProperty(key);

    if (!raw) throw new Error("Invalid or expired verification challenge.");

    const challenge = JSON.parse(raw);

    if (Date.now() > challenge.expiresAt) {
      props.deleteProperty(key);
      throw new Error("OTP expired. Please log in again.");
    }

    challenge.attempts++;

    if (challenge.attempts > SK_AUTH.MAX_OTP_ATTEMPTS) {
      props.deleteProperty(key);
      throw new Error("Too many attempts. Please log in again.");
    }

    props.setProperty(key, JSON.stringify(challenge));

    const supplied = authHmac_("otp:" + challengeId + ":" + otp);

    if (!authConstantTimeEqual_(supplied, challenge.otpHash)) {
      throw new Error("Incorrect OTP.");
    }

    props.deleteProperty(key);

    const now = Date.now();
    session = {
      sid: Utilities.getUuid(),
      email: challenge.email,
      issuedAt: now,
      expiresAt: now + SK_AUTH.SESSION_EXPIRY_MS
    };

    props.setProperty(
      SK_AUTH.SESSION_PREFIX + session.sid,
      JSON.stringify(session)
    );
  } finally {
    lock.releaseLock();
  }

  const payload = Utilities.base64EncodeWebSafe(
    JSON.stringify(session),
    Utilities.Charset.UTF_8
  );

  return {
    success: true,
    token: payload + "." + authHmac_("session:" + payload),
    email: session.email,
    expiresAt: session.expiresAt
  };
}

function authConstantTimeEqual_(a, b) {
  a = String(a || "");
  b = String(b || "");

  let diff = a.length ^ b.length;
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }

  return diff === 0;
}

function verifyAdminSession_(token) {
  authRequireInitialized_();

  const parts = String(token || "").split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error("Invalid session. Please log in again.");
  }

  const payload = parts[0];
  const expected = authHmac_("session:" + payload);

  if (!authConstantTimeEqual_(parts[1], expected)) {
    throw new Error("Invalid session signature.");
  }

  let session;

  try {
    session = JSON.parse(
      Utilities.newBlob(
        Utilities.base64DecodeWebSafe(payload)
      ).getDataAsString()
    );
  } catch (error) {
    throw new Error("Invalid session.");
  }

  const adminEmail = authEmail_(
    authProperties_().getProperty(SK_AUTH.ADMIN_EMAIL)
  );

  if (
    !session.sid ||
    authEmail_(session.email) !== adminEmail ||
    !session.expiresAt ||
    Date.now() >= session.expiresAt
  ) {
    throw new Error("Session expired or invalid.");
  }

  const stored = authProperties_().getProperty(
    SK_AUTH.SESSION_PREFIX + session.sid
  );

  if (!stored) throw new Error("Session revoked.");

  const active = JSON.parse(stored);

  if (
    active.email !== session.email ||
    active.expiresAt !== session.expiresAt
  ) {
    throw new Error("Session is invalid.");
  }

  return {
    email: session.email,
    expiresAt: session.expiresAt
  };
}

function logoutAdmin_(token) {
  const sessionInfo = verifyAdminSession_(token);
  const payload = String(token).split(".")[0];

  const session = JSON.parse(
    Utilities.newBlob(
      Utilities.base64DecodeWebSafe(payload)
    ).getDataAsString()
  );

  authProperties_().deleteProperty(
    SK_AUTH.SESSION_PREFIX + session.sid
  );

  return { success: true, message: "Logged out." };
}

function testMailAuthorization() {
  const props = authProperties_();
  const adminEmail = authEmail_(props.getProperty(SK_AUTH.ADMIN_EMAIL));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
    throw new Error("SKDEV_ADMIN_EMAIL is not configured. Set it in Script Properties first.");
  }

  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: "SK DEV TEAM — MailApp authorization test",
      body:
        "This is a safe MailApp authorization test from SK DEV TEAM.\n\n" +
        "If you received this message, Gmail access is authorized for the Apps Script project."
    });

    Logger.log("MailApp authorization test succeeded for configured admin email.");

    return {
      success: true,
      message: "MailApp test email sent successfully.",
      adminEmail: adminEmail
    };
  } catch (error) {
    Logger.log(
      "MailApp authorization test failed: " +
      String(error && error.message ? error.message : error)
    );

    return {
      success: false,
      message: "MailApp authorization failed: " + String(error && error.message ? error.message : error),
      adminEmail: adminEmail
    };
  }
}

function clearOtpChallenge() {
  const props = authProperties_();
  const allProps = props.getProperties();

  Object.keys(allProps).forEach(function(key) {
    if (key.indexOf(SK_AUTH.OTP_PREFIX) === 0) {
      props.deleteProperty(key);
    }
  });

  return {
    success: true,
    message: "OTP challenge records cleared."
  };
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";

  if (action === "health") {
    const props = authProperties_();
    const initialized = Boolean(
      props.getProperty(SK_AUTH.ADMIN_EMAIL) &&
      props.getProperty(SK_AUTH.PASSWORD_HASH) &&
      props.getProperty(SK_AUTH.PASSWORD_SALT) &&
      props.getProperty(SK_AUTH.SECRET)
    );

    return authJson_({
      success: true,
      service: "SK DEV TEAM Auth API",
      initialized: initialized
    });
  }

  return authJson_({
    success: true,
    message: "SK DEV TEAM API is running."
  });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents
      ? e.postData.contents
      : "{}";

    const body = JSON.parse(raw);
    let result;

    switch (body.action) {
      case "login":
        result = beginAdminLogin_(body.email, body.password);
        break;
      case "verifyOtp":
        result = verifyAdminOtp_(body.challengeId, body.otp);
        break;
      case "checkSession":
        result = {
          success: true,
          session: verifyAdminSession_(body.token)
        };
        break;
      case "logout":
        result = logoutAdmin_(body.token);
        break;
      case "submitInquiry":
        result = submitInquiryRequest_(body);
        break;
      default:
        return authJson_({
          success: false,
          message: "Unsupported API action."
        });
    }

    return authJson_(result);
  } catch (error) {
    return authJson_({
      success: false,
      message: String(error.message || "Request failed.")
    });
  }
}

function submitInquiryRequest_(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid inquiry payload.");
  }

  const props = authProperties_();
  const email = String(payload.email || "").trim().toLowerCase();
  const phone = String(payload.phone || "").trim();
  const clientName = String(payload.clientName || "").trim();
  const service = String(payload.service || payload.serviceCategory || "").trim();
  const requirements = String(payload.requirements || payload.projectDetails || "").trim();

  if (!clientName || !email || !phone || !service || !requirements) {
    throw new Error("Missing required inquiry fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  const key = "SKDEV_INQUIRY_RATE_" + email + "_" + phone.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const now = Date.now();
  const last = Number(props.getProperty(key) || "0");
  if (now - last < 30000) {
    throw new Error("Please wait a moment before submitting another inquiry.");
  }
  props.setProperty(key, String(now));

  const normalized = {
    clientName: clientName,
    businessName: String(payload.businessName || "").trim(),
    email: email,
    phone: phone,
    service: service,
    packageName: String(payload.packageName || payload.selectedPackage || "").trim(),
    requirements: requirements,
    budget: String(payload.budget || payload.estimatedBudget || "").trim(),
    contactMethod: String(payload.contactMethod || payload.preferredContact || "").trim(),
    createdAt: new Date().toISOString()
  };

  return saveProjectInquiry_(normalized);
}
