/**
 * SK DEV TEAM — Central Public Configuration
 * 
 * Public configuration constants. Never put administrator passwords,
 * CNIC values, OTP secrets, service-account credentials, or private keys
 * in this file, frontend code, or public environment variables.
 */

export interface AppConfig {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    altPhone: string;
    whatsapp: string;
    whatsappLink: string;
    portfolioUrl: string;
    primaryMarket: string;
    currency: string;
  };
  backend: {
    spreadsheetId: string;
    defaultScriptUrl: string;
    scriptUrl: string;
  };
  limits: {
    maxOtpAttempts: number;
    otpExpiryMinutes: number;
    maxLoginAttempts: number;
    lockoutDurationHours: number;
  };
}

export const APP_CONFIG: AppConfig = {
  brand: {
    name: 'SK DEV TEAM',
    tagline: 'Digital Solutions for Growing Businesses',
    email: 'suhailahmedaamro786@gmail.com',
    phone: '+92 315 3558383',
    altPhone: '+92 309 3305243',
    whatsapp: '+92 315 3558383',
    whatsappLink: 'https://wa.me/923153558383',
    portfolioUrl: 'https://suhailahmedaamro.vercel.app/',
    primaryMarket: 'Dadu, Sindh, Pakistan & Global Remote',
    currency: 'PKR',
  },
  backend: {
    spreadsheetId: '1rorxnzJRJ9ij2D5TSrkFCWveEhlf4GCMifr0VlQ4w0c',
    defaultScriptUrl: 'https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec',
    // Allow overriding via environment variable VITE_APPS_SCRIPT_URL if configured
    scriptUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APPS_SCRIPT_URL)
      ? import.meta.env.VITE_APPS_SCRIPT_URL
      : 'https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec',
  },
  limits: {
    maxOtpAttempts: 3,
    otpExpiryMinutes: 10,
    maxLoginAttempts: 3,
    lockoutDurationHours: 24,
  }
};
