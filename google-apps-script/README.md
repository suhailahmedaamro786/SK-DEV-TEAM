# SK DEV TEAM — Google Apps Script Backend Guide (v2.6.0)

This repository contains the complete Google Apps Script backend connecting the **SK DEV TEAM** platform to Google Sheets (`1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c`) and Google Drive for zero-cost, persistent database storage, inquiry routing, and two-factor administrator authentication.

---

## 1. Key Functions in `Code.gs`

1. **`doGet(e)`**: Global HTTP GET handler that catches `/exec?action=health` and returns safe diagnostic JSON.
2. **`doPost(e)`**: Global HTTP POST handler that processes inquiries, administrator authentication, OTP validation, and CRM pipeline actions.
3. **`setupSKDevTeam()`**: Master configuration function that configures the spreadsheet ID in `ScriptProperties`, creates/locates the Google Drive workspace folder (`SK DEV TEAM Workspace`), and seeds the database tabs.
4. **`handleHealth()`**: Safe health-check endpoint that returns `{ status: 'healthy', brand: 'SK DEV TEAM', version: '2.6.0', timestamp: '...' }` without accessing the spreadsheet or exposing secrets.
5. **`handleAdminLogin(payload)`**: Step 1 authentication validating salted SHA-256 password hash, 24-hour lockout rules, and generating a cryptographically secure 6-digit OTP dispatched via `MailApp`.
6. **`handleVerifyOtp(payload)`**: Step 2 authentication validating OTP hash on the server, enforcing a 3-attempt limit and 10-minute expiry, and issuing an HMAC-SHA256 signed session token.

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Open Apps Script Editor
1. Open your Google Spreadsheet:
   `https://docs.google.com/spreadsheets/d/1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c/edit`
2. In the top menu, click **Extensions** > **Apps Script**.

### Step 2: Replace `Code.gs`
1. In the file list on the left, select **`Code.gs`**.
2. Replace all existing text with the complete contents of `google-apps-script/Code.gs`.
3. Click the **Save** icon (disk icon / Ctrl+S).

### Step 3: Run Master Setup
1. In the function dropdown at the top of the editor, select **`setupSKDevTeam`**.
2. Click **Run**.
3. When prompted, click **Review Permissions** and grant access to Google Sheets, Google Drive, and MailApp.
4. Check execution log: Verify that `setupSKDevTeam() finished successfully!` appears.

### Step 4: Initialize Admin Credentials (One-Time)
To set your private master password:
1. In the Apps Script editor, create a temporary function or select **`initializeAdminCredentials`**:
   ```javascript
   function runOneTimeSetup() {
     initializeAdminCredentials('YourStrongPasswordHere');
   }
   ```
2. Click **Run**.
3. Your password is salted and hashed with SHA-256 into `ScriptProperties`. It is never stored in plaintext.

---

## 3. How to Deploy as a NEW VERSION (CRITICAL STEP)

> **Important**: Google Apps Script Web Apps do **not** reflect code updates until you create a **New Version** in the deployment settings.

1. In the top-right corner, click **Deploy** > **Manage deployments**.
2. Select your active Web App deployment from the left sidebar.
3. Click the **Edit** icon (pencil) in the top-right of the modal.
4. In the **Version** dropdown:
   - Select **New version**.
   - In the description box, enter: `v2.6.0 with doGet and setupSKDevTeam`.
5. Verify the deployment settings:
   - **Execute as**: `Me (suhailahmedaamro786@gmail.com)`
   - **Who has access**: **`Anyone`** *(Essential so the frontend and curl can reach the API without a Google sign-in redirect)*
6. Click **Deploy**.
7. Copy the Web app URL. It will remain the exact same URL:
   `https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec`

---

## 4. Verification & Testing

### Test 1: Terminal Health Check
```bash
curl -L -s "https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec?action=health"
```
**Expected Response**:
```json
{"success":true,"data":{"status":"healthy","brand":"SK DEV TEAM","version":"2.6.0","timestamp":"..."},"error":null}
```

### Test 2: Browser Verification
Open the URL directly in any browser tab:
`https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec?action=health`
It will display the JSON response without the "Script function not found: doGet" error.

### Test 3: Admin Portal Login
1. Open the SK DEV TEAM website and navigate to the **Admin Portal**.
2. The indicator badge will show **`Connected (v2.6.0)`**.
3. Enter your administrator email (`suhailahmedaamro786@gmail.com`) and master password.
4. Click **Verify Credentials & Send OTP**.
5. An email OTP will be sent to `suhailahmedaamro786@gmail.com`.
6. Enter the 6-digit OTP to securely access the administrative console.
