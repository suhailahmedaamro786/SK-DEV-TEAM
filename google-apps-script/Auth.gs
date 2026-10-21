
function testMailAuthorization() {
  const props = authProperties_();
  const adminEmail = authEmail_(props.getProperty(SK_AUTH.ADMIN_EMAIL));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
    throw new Error("SKDEV_ADMIN_EMAIL is not configured. Set it in Script Properties first.");
  }

  try {
    const testCode = String(Math.floor(100000 + Math.random() * 900000));
    MailApp.sendEmail({
      to: adminEmail,
      subject: "SK DEV TEAM — MailApp authorization test",
      body:
        "This is a safe MailApp authorization test from SK DEV TEAM.\n\n" +
        "Test code: " + testCode + "\n\n" +
        "If you received this message, Gmail access is authorized for the Apps Script project."
    });

    return {
      success: true,
      message: "MailApp test email sent successfully.",
      adminEmail: adminEmail,
      testCode: testCode
    };
  } catch (error) {
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
  Object.keys(allProps).forEach(function (key) {
    if (key.indexOf(SK_AUTH.OTP_PREFIX) === 0) {
      props.deleteProperty(key);
    }
  });

  return {
    success: true,
    message: "OTP challenge records cleared."
  };
}
