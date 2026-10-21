/**
 * SK DEV TEAM — Client-side API Service Layer
 * 
 * Communicates with the Google Apps Script Web App backend.
 * Uses text/plain Content-Type to avoid CORS preflight restrictions in browser sandboxes.
 */

import { APP_CONFIG } from '../config/app';
import { InquiryFormData, LeadRecord } from '../types';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

class ApiService {
  private scriptUrl: string;

  constructor() {
    this.scriptUrl = APP_CONFIG.backend.scriptUrl;
  }

  public setEndpoint(url: string) {
    this.scriptUrl = url;
  }

  public getEndpoint(): string {
    return this.scriptUrl;
  }

  /**
   * Generic request executor
   * Sends POST with text/plain;charset=utf-8 to avoid CORS preflight OPTIONS request
   * and explicitly follows Google Apps Script 302 redirects.
   */
  private async execute<T = any>(action: string, payload: any = {}): Promise<ApiResponse<T>> {
    const fullPayload = { action, ...payload };

    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(fullPayload),
      });

      const text = await response.text();

      // Check if response is valid JSON
      try {
        const json = JSON.parse(text);
        return json;
      } catch (jsonErr) {
        // If the script returned HTML (e.g., Google login prompt or Drive error page due to deployment permissions)
        if (text.includes('accounts.google.com') || text.includes('drive-logo') || text.includes('Unable to open') || text.includes('Page not found')) {
          return {
            success: false,
            data: null,
            error: {
              code: 'APPS_SCRIPT_PERMISSIONS_REQUIRED',
              message: 'Google Apps Script deployment access is restricted. Please update Web App deployment in Apps Script: set "Who has access" to "Anyone" and "Execute as" to "Me".'
            }
          };
        }

        return {
          success: false,
          data: null,
          error: {
            code: 'NON_JSON_RESPONSE',
            message: 'Server returned unexpected format: ' + text.slice(0, 100)
          }
        };
      }
    } catch (networkErr: any) {
      const errStr = String(networkErr?.message || networkErr || '');
      const isFailedToFetch = errStr.toLowerCase().includes('failed to fetch') || 
                              errStr.toLowerCase().includes('networkerror') ||
                              errStr.toLowerCase().includes('cors');

      return {
        success: false,
        data: null,
        error: {
          code: isFailedToFetch ? 'APPS_SCRIPT_CORS_OR_PERMISSIONS' : 'NETWORK_ERROR',
          message: isFailedToFetch 
            ? 'Failed to fetch: Connection blocked by Google Apps Script deployment settings or browser cross-origin policy. Ensure the Web App in Apps Script has "Execute as: Me" and "Who has access: Anyone".' 
            : (networkErr?.message || 'Unable to connect to Google Apps Script endpoint.')
        }
      };
    }
  }

  /**
   * Check backend health using GET followed by POST fallback
   */
  public async checkHealth(): Promise<ApiResponse> {
    try {
      const sep = this.scriptUrl.includes('?') ? '&' : '?';
      const getUrl = `${this.scriptUrl}${sep}action=health`;
      const response = await fetch(getUrl, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
      });
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        return json;
      } catch {
        // If GET returned non-JSON, try standard POST
        return this.execute('health');
      }
    } catch {
      return this.execute('health');
    }
  }

  /**
   * Submit Project Inquiry
   */
  public async submitInquiry(formData: InquiryFormData): Promise<ApiResponse<{ inquiryId: string; status: string; isDuplicate?: boolean }>> {
    const result = await this.execute('submitInquiry', formData);

    // If backend is unavailable or restricted, store locally in offline queue
    if (!result.success) {
      try {
        const offlineQueue = JSON.parse(localStorage.getItem('sk_pending_inquiries') || '[]');
        const localId = 'SK-OFFLINE-' + Date.now();
        offlineQueue.push({
          inquiryId: localId,
          ...formData,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('sk_pending_inquiries', JSON.stringify(offlineQueue));
      } catch (e) {
        console.warn('Local storage write skipped:', e);
      }
    }

    return result;
  }

  /**
   * Action: login
   * Payload: { action: "login", email, password }
   */
  public async login(email: string, password: string): Promise<ApiResponse<{ step: string; challengeId: string; adminEmailMasked?: string; message?: string }>> {
    return this.execute('login', { email, password });
  }

  /**
   * Backward-compatible alias for login
   */
  public async adminLogin(email: string, password: string): Promise<ApiResponse<{ step: string; challengeId: string; adminEmailMasked?: string; message?: string }>> {
    return this.execute('login', { email, password });
  }

  /**
   * Action: verifyOtp
   * Payload: { action: "verifyOtp", challengeId, otp }
   */
  public async verifyOtp(challengeId: string, otp: string): Promise<ApiResponse<{ token: string; expiresAt: string; admin?: any }>> {
    return this.execute('verifyOtp', { challengeId, otp });
  }

  /**
   * Action: checkSession
   * Payload: { action: "checkSession", token }
   */
  public async checkSession(token: string): Promise<ApiResponse<{ valid: boolean; user?: any; expiresAt?: string }>> {
    return this.execute('checkSession', { token });
  }

  /**
   * Action: logout
   * Payload: { action: "logout", token }
   */
  public async logout(token: string): Promise<ApiResponse<{ loggedOut: boolean }>> {
    return this.execute('logout', { token });
  }

  /**
   * Backward-compatible alias for logout
   */
  public async adminLogout(token: string): Promise<ApiResponse> {
    return this.logout(token);
  }

  /**
   * Get Dashboard Summary Metrics
   */
  public async getDashboardSummary(token: string): Promise<ApiResponse> {
    return this.execute('getDashboardSummary', { token });
  }

  /**
   * List all stored inquiries
   */
  public async listInquiries(token: string): Promise<ApiResponse<any[]>> {
    return this.execute('listInquiries', { token });
  }

  /**
   * Update inquiry status & follow-up notes
   */
  public async updateInquiry(token: string, inquiryId: string, status: string, notes?: string): Promise<ApiResponse> {
    return this.execute('updateInquiry', { token, inquiryId, status, notes });
  }

  /**
   * Create new project in spreadsheet
   */
  public async createProject(token: string, project: any): Promise<ApiResponse> {
    return this.execute('createProject', { token, ...project });
  }

  /**
   * Update project
   */
  public async updateProject(token: string, project: any): Promise<ApiResponse> {
    return this.execute('updateProject', { token, ...project });
  }

  /**
   * Delete project
   */
  public async deleteProject(token: string, id: string): Promise<ApiResponse> {
    return this.execute('deleteProject', { token, id });
  }

  /**
   * Get public settings
   */
  public async getAdminSettings(token: string): Promise<ApiResponse> {
    return this.execute('getAdminSettings', { token });
  }

  /**
   * Update public settings
   */
  public async updateAdminSettings(token: string, settings: any): Promise<ApiResponse> {
    return this.execute('updateAdminSettings', { token, settings });
  }
}

export const api = new ApiService();
