
/**
 * SK DEV TEAM — Workspace Verification
 * Uses the existing Google Spreadsheet.
 */

function verifySKDevTeamWorkspace() {
  const spreadsheetId =
    PropertiesService.getScriptProperties()
      .getProperty("SKDEV_SPREADSHEET_ID") ||
    "1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c";

  const ss = SpreadsheetApp.openById(spreadsheetId);

  const requiredSheets = [
    "ProjectInquiries",
    "Projects",
    "Services",
    "Packages",
    "Settings",
    "AdminAudit"
  ];

  const existingSheets = ss.getSheets().map(
    function (sheet) {
      return sheet.getName();
    }
  );

  const missingSheets = requiredSheets.filter(
    function (name) {
      return existingSheets.indexOf(name) === -1;
    }
  );

  const result = {
    success: missingSheets.length === 0,
    spreadsheetName: ss.getName(),
    spreadsheetUrl: ss.getUrl(),
    existingSheets: existingSheets,
    missingSheets: missingSheets
  };

  Logger.log(JSON.stringify(result, null, 2));
  return result;
}
