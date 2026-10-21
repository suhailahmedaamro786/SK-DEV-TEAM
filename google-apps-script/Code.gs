/**
 * SK DEV TEAM — Google Sheets Workspace Setup
 * Uses your existing spreadsheet.
 *
 * Run setupSKDevTeam() once from the Apps Script editor.
 */

const SKDEV = {
  SPREADSHEET_ID: "1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c",
  FOLDER_NAME: "SK DEV TEAM — Private Workspace",
  SHEET_NAME: "SK DEV TEAM — Admin Database"
};

function setupSKDevTeam() {
  const ss = SpreadsheetApp.openById(SKDEV.SPREADSHEET_ID);

  // Rename the spreadsheet without creating a duplicate.
  DriveApp.getFileById(ss.getId()).setName(SKDEV.SHEET_NAME);

  // Create a private workspace folder if one isn't configured.
  let folderId = PropertiesService.getScriptProperties()
    .getProperty("SKDEV_FOLDER_ID");

  let folder;
  if (folderId) {
    folder = DriveApp.getFolderById(folderId);
  } else {
    folder = DriveApp.createFolder(SKDEV.FOLDER_NAME);
    PropertiesService.getScriptProperties()
      .setProperty("SKDEV_FOLDER_ID", folder.getId());
  }

  // Create missing tabs and their column headers.
  const tabs = {
    ProjectInquiries: [
      "CreatedAt", "ClientName", "BusinessName", "Email",
      "Phone", "Service", "Package", "Requirements",
      "Budget", "ContactMethod", "Status"
    ],
    Projects: [
      "ProjectID", "Name", "Category", "Description",
      "DemoURL", "Technologies", "Status"
    ],
    Services: [
      "ServiceID", "ServiceName", "Description", "Status"
    ],
    Packages: [
      "PackageID", "ServiceName", "PackageName",
      "Features", "Price", "PriceConfirmed", "Status"
    ],
    Settings: ["Setting", "Value"],
    AdminAudit: ["Timestamp", "Event", "Email", "Details"]
  };

  Object.keys(tabs).forEach(function (tabName) {
    let sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    // Add headers only to a blank sheet.
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, tabs[tabName].length)
        .setValues([tabs[tabName]]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, tabs[tabName].length)
        .setFontWeight("bold");
      sheet.autoResizeColumns(1, tabs[tabName].length);
    }
  });

  const settings = ss.getSheetByName("Settings");
  if (settings.getLastRow() === 1) {
    settings.appendRow(["WorkspaceName", "SK DEV TEAM"]);
    settings.appendRow(["ThemeDefault", "dark"]);
  }

  // Store the existing spreadsheet ID for later functions.
  PropertiesService.getScriptProperties()
    .setProperty("SKDEV_SPREADSHEET_ID", ss.getId());

  return {
    success: true,
    message: "SK DEV TEAM workspace is ready.",
    spreadsheetUrl: ss.getUrl(),
    folderName: folder.getName(),
    tabs: Object.keys(tabs)
  };
}

/**
 * Returns the configured spreadsheet.
 * Use only in trusted server-side functions.
 */
function getSKDevSpreadsheet_() {
  const id = PropertiesService.getScriptProperties()
    .getProperty("SKDEV_SPREADSHEET_ID");

  if (!id) {
    throw new Error("Run setupSKDevTeam() first.");
  }

  return SpreadsheetApp.openById(id);
}

/**
 * Append a project inquiry from a trusted server-side function.
 * Validate input and verify authorization before calling this.
 */
function saveProjectInquiry_(data) {
  const ss = getSKDevSpreadsheet_();
  const sheet = ss.getSheetByName("ProjectInquiries");

  const row = [
    new Date(),
    String(data.clientName || ""),
    String(data.businessName || ""),
    String(data.email || ""),
    String(data.phone || ""),
    String(data.service || ""),
    String(data.packageName || ""),
    String(data.requirements || ""),
    String(data.budget || ""),
    String(data.contactMethod || ""),
    "New"
  ];

  sheet.appendRow(row);

  return {
    success: true,
    message: "Inquiry saved."
  };
}

/**
 * Basic health check. Run manually to verify access.
 */
function checkSKDevTeamSetup() {
  const ss = getSKDevSpreadsheet_();

  return {
    success: true,
    spreadsheetName: ss.getName(),
    spreadsheetUrl: ss.getUrl(),
    sheetNames: ss.getSheets().map(function (sheet) {
      return sheet.getName();
    })
  };
}
