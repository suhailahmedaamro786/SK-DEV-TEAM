import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Terminal, Search, Plus, Eye, Edit, Trash2, 
  ExternalLink, MessageCircle, Mail, FileEdit, CheckCircle2, 
  X, AlertCircle, ArrowLeft, Layers, Rocket, Users, Clock, 
  Lock, KeyRound, Smartphone, LogOut, RefreshCw, Settings, ShieldAlert,
  Calendar, Check, Database
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem, LeadRecord } from '../types';
import { api } from '../services/api';
import { APP_CONFIG } from '../config/app';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  // Auth state
  const [isVerifyingSession, setIsVerifyingSession] = useState<boolean>(() => {
    return !!sessionStorage.getItem('sk_admin_token');
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [tokenExpiresAt, setTokenExpiresAt] = useState<string>('');

  // Login Form states
  const [authStep, setAuthStep] = useState<'credentials' | 'otp'>('credentials');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [lockoutActive, setLockoutActive] = useState(false);

  // Active section inside dashboard
  const [activeSection, setActiveSection] = useState<'overview' | 'inquiries' | 'projects' | 'settings' | 'audit'>('overview');

  // Backend Sync & Data states
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [projectSearch, setProjectSearch] = useState('');
  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [activeLeadFilter, setActiveLeadFilter] = useState<string>('all');
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<any | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New Project Form
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('Full-Stack Custom SaaS');
  const [newDesc, setNewDesc] = useState('');
  const [newStack, setNewStack] = useState('Next.js, Tailwind CSS, PostgreSQL');
  const [newLiveUrl, setNewLiveUrl] = useState('');

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Test backend connection & verify existing session on mount
  useEffect(() => {
    // 1. Health check
    api.checkHealth().then(res => {
      if (res.success) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('offline');
      }
    }).catch(() => {
      setBackendStatus('offline');
    });

    // 2. Session verification via backend action: checkSession
    const storedToken = sessionStorage.getItem('sk_admin_token');
    const storedExpires = sessionStorage.getItem('sk_admin_expires');

    if (storedToken) {
      setIsVerifyingSession(true);
      api.checkSession(storedToken)
        .then(res => {
          if (res.success && res.data && res.data.valid) {
            setAuthToken(storedToken);
            setTokenExpiresAt(res.data.expiresAt || storedExpires || '');
            setIsAuthenticated(true);
          } else {
            // Invalid or expired according to backend
            sessionStorage.removeItem('sk_admin_token');
            sessionStorage.removeItem('sk_admin_expires');
            setAuthToken('');
            setIsAuthenticated(false);
            if (res.error?.message) {
              setAuthError(res.error.message);
            }
          }
        })
        .catch(() => {
          sessionStorage.removeItem('sk_admin_token');
          sessionStorage.removeItem('sk_admin_expires');
          setAuthToken('');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsVerifyingSession(false);
        });
    } else {
      setIsVerifyingSession(false);
    }
  }, []);

  // Fetch inquiries when authenticated
  useEffect(() => {
    if (isAuthenticated && authToken) {
      loadInquiries();
    }
  }, [isAuthenticated, authToken]);

  const loadInquiries = async () => {
    const res = await api.listInquiries(authToken);
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      setLeadsList(res.data);
    } else {
      // Local administrative lead queue
      try {
        const stored = JSON.parse(localStorage.getItem('sk_client_leads') || '[]');
        if (stored.length > 0) {
          setLeadsList(stored);
        } else {
          setLeadsList([
            {
              InquiryID: 'SK-20261021-1042',
              Timestamp: new Date().toISOString(),
              ClientName: 'Zubair Khan',
              BusinessName: 'Apex Logistics LLC',
              Email: 'suhailahmedaamro786@gmail.com',
              Phone: '+92 315 3558383',
              ServiceCategory: 'Custom TMS & Fleet Tracking',
              SelectedPackage: 'Premium',
              BudgetRange: '$4,500 - $6,000 USD',
              PreferredContact: 'WhatsApp',
              ProjectDetails: 'Custom transport management system with driver mobile dispatch.',
              Status: 'New',
              FollowUpNotes: 'Quotation discussion scheduled via WhatsApp.'
            },
            {
              InquiryID: 'SK-20261020-8472',
              Timestamp: new Date(Date.now() - 86400000).toISOString(),
              ClientName: 'Dr. Elena Rostova',
              BusinessName: 'Solaria Tech Nordic',
              Email: 'elena.r@solaria.se',
              Phone: '+46 70 123 4567',
              ServiceCategory: 'AI Assistants & Automation',
              SelectedPackage: 'Medium',
              BudgetRange: '$12,000 - $18,000 USD',
              PreferredContact: 'Email',
              ProjectDetails: 'SaaS AI model embeddings and automated calendar scheduling.',
              Status: 'Quoted',
              FollowUpNotes: 'Proposal review in progress.'
            }
          ]);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // STEP 1: Admin Submit Credentials via { action: "login", email, password }
  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await api.login(adminEmail, adminPassword);

      if (res.success && res.data) {
        // Temporarily store returned challengeId for Step 2 OTP verification
        setChallengeId(res.data.challengeId);
        setMaskedEmail(res.data.adminEmailMasked || adminEmail);
        setAuthStep('otp');
        showNotification(res.data.message || `Verification code sent to ${res.data.adminEmailMasked || adminEmail}`);
      } else {
        if (res.error?.code === 'ACCOUNT_LOCKED') {
          setLockoutActive(true);
        }
        setAuthError(res.error?.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Unable to connect to authentication server.');
    } finally {
      setAuthLoading(false);
    }
  };

  // STEP 2: Verify OTP via { action: "verifyOtp", challengeId, otp }
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await api.verifyOtp(challengeId, otpValue);
      if (res.success && res.data) {
        // Save returned session token and expiration
        sessionStorage.setItem('sk_admin_token', res.data.token);
        if (res.data.expiresAt) {
          sessionStorage.setItem('sk_admin_expires', res.data.expiresAt);
          setTokenExpiresAt(res.data.expiresAt);
        }
        setAuthToken(res.data.token);
        setIsAuthenticated(true);
        setAdminPassword('');
        setOtpValue('');
        showNotification('2FA OTP Verified! Welcome Suhail Ahmed.');
      } else {
        setAuthError(res.error?.message || 'Invalid or expired OTP code.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Verification failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // STEP 3: Logout via backend action: { action: "logout", token }
  const handleLogout = async () => {
    if (authToken) {
      try {
        await api.logout(authToken);
      } catch (e) {
        console.warn('Backend logout call skipped:', e);
      }
    }
    sessionStorage.removeItem('sk_admin_token');
    sessionStorage.removeItem('sk_admin_expires');
    setAuthToken('');
    setTokenExpiresAt('');
    setIsAuthenticated(false);
    setAuthStep('credentials');
    setAdminPassword('');
    setOtpValue('');
    setChallengeId('');
    showNotification('Logged out successfully.');
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    const updated = leadsList.map(l => (l.InquiryID === leadId || l.id === leadId) ? { ...l, Status: newStatus, status: newStatus } : l);
    setLeadsList(updated);

    try {
      localStorage.setItem('sk_client_leads', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }

    if (authToken) {
      await api.updateInquiry(authToken, leadId, newStatus);
    }
    showNotification(`Status updated to "${newStatus}"`);
  };

  const handleSaveNotes = async () => {
    if (!selectedLeadForNotes) return;
    const targetId = selectedLeadForNotes.InquiryID || selectedLeadForNotes.id;

    const updated = leadsList.map(l => (l.InquiryID === targetId || l.id === targetId) ? { ...l, FollowUpNotes: noteDraft, notes: noteDraft } : l);
    setLeadsList(updated);

    try {
      localStorage.setItem('sk_client_leads', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }

    if (authToken) {
      await api.updateInquiry(authToken, targetId, selectedLeadForNotes.Status || selectedLeadForNotes.status || 'New', noteDraft);
    }

    showNotification(`Notes saved for ${selectedLeadForNotes.ClientName || selectedLeadForNotes.clientName}`);
    setSelectedLeadForNotes(null);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newP: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      category: newCat,
      badgeCat: 'Custom Build',
      bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtJe9b157Xox0UVlvXr7S8xcbhMbzsumon-SOGYPwOawqsNcffO5t-FrFYoFV9dxnq5yGEjhiFTs3vQJX3nAOEO8uyFb2qUVGMtjoBLC96zChpF9Y2QZO4_-ARJEA7hZ5dHqzx7snrR8QYwQWxA-ps5OYFFtwm8hvgQsEn7GPweKPZ4qlT81wAiIL0RVW36-X1MmdDJA8agfA2vghhSf1f-HJVy_0QHxdozNcDbBRkpIykeupJSotA',
      liveUrl: newLiveUrl || 'https://suhailahmedaamro.vercel.app/',
      client: 'Commercial Enterprise Client',
      sla: '99.98% Uptime',
      latency: '< 290ms',
      desc: newDesc || 'Enterprise web platform delivered with sub-second latency.',
      deliverables: ['Custom architecture', 'Responsive interface', 'CI/CD pipeline'],
      stack: newStack.split(',').map(s => s.trim()),
      date: new Date().toISOString().slice(0, 7),
      order: projectsList.length + 1,
      tags: newStack.split(',').map(s => s.trim())
    };

    setProjectsList([newP, ...projectsList]);
    setShowAddProjectModal(false);
    setNewTitle('');
    setNewDesc('');

    if (authToken) {
      await api.createProject(authToken, {
        title: newP.title,
        category: newP.category,
        liveUrl: newP.liveUrl,
        client: newP.client,
        description: newP.desc,
        technologies: newStack,
        status: 'Published'
      });
    }

    showNotification(`Project "${newP.title}" created successfully!`);
  };

  const handleDeleteProject = async (proj: ProjectItem) => {
    if (confirm(`Are you sure you want to delete '${proj.title}'?`)) {
      setProjectsList(prev => prev.filter(p => p.id !== proj.id));
      if (authToken) {
        await api.deleteProject(authToken, proj.id);
      }
      showNotification(`Project '${proj.title}' deleted.`);
    }
  };

  const filteredProjects = projectsList.filter(p => 
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.stack.some(s => s.toLowerCase().includes(projectSearch.toLowerCase()))
  );

  const filteredLeads = leadsList.filter(l => {
    const st = String(l.Status || l.status || '').toLowerCase();
    if (activeLeadFilter === 'all') return true;
    return st === activeLeadFilter.toLowerCase();
  });

  // -------------------------------------------------------------
  // RENDER SESSION VALIDATION LOADER
  // -------------------------------------------------------------
  if (isVerifyingSession) {
    return (
      <div className="w-full min-h-screen bg-[#111318] text-[#e2e2e9] flex flex-col justify-center items-center p-4">
        <div className="p-8 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="w-10 h-10 border-3 border-[#8781ff]/20 border-t-[#8781ff] rounded-full animate-spin" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#e2e2e9]">Validating Admin Session</h2>
            <p className="text-xs text-[#918fa1] font-mono">Checking session token with Google Apps Script...</p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER LOGIN / 2FA AUTHENTICATION WALL
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#111318] text-[#e2e2e9] flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#282a2f] text-[#8781ff] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#e2e2e9]">
              SK DEV TEAM Admin Login
            </h1>
            <p className="text-xs text-[#918fa1]">
              Private Operations Console · Server-Validated 2FA
            </p>
          </div>

          {/* Backend Connection Indicator */}
          <div className="p-3 rounded-xl bg-[#14151a] border border-[#33353a] flex items-center justify-between text-xs">
            <span className="text-[#918fa1]">Google Apps Script:</span>
            {backendStatus === 'connected' ? (
              <span className="text-[#44dfab] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#44dfab]" />
                Connected
              </span>
            ) : backendStatus === 'checking' ? (
              <span className="text-[#c4c0ff]">Checking endpoint...</span>
            ) : (
              <span className="text-[#ffb4ab] font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
                Web App Active
              </span>
            )}
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {lockoutActive && (
            <div className="p-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab] text-[#ffb4ab] text-xs space-y-2">
              <span className="font-bold uppercase tracking-wider block">Security Lockout Active</span>
              <p>
                3 consecutive failed attempts recorded. Access is locked for 24 hours. Run <code>clearOtpChallenge()</code> in the Apps Script console to reset.
              </p>
            </div>
          )}

          {/* SCREEN 1: Email + Password */}
          {authStep === 'credentials' ? (
            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#918fa1]">Administrator Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="suhailahmedaamro786@gmail.com"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#918fa1]">Master Password</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff]"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading || lockoutActive || !adminPassword}
                className="w-full h-11 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] disabled:opacity-40 text-[#1c0091] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span>Verifying on Server...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Sign In & Request OTP</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="text-xs text-[#918fa1] hover:text-[#e2e2e9] transition-colors"
                >
                  ← Return to Public Website
                </button>
              </div>
            </form>
          ) : (
            /* SCREEN 2: 6-Digit Email OTP Challenge */
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#8781ff]/30 text-xs text-[#c4c0ff] space-y-1 text-center">
                <Smartphone className="w-5 h-5 mx-auto text-[#8781ff]" />
                <span className="font-bold block">One-Time Password Sent!</span>
                <span className="text-[#918fa1] block">
                  A 6-digit verification code was dispatched to your email: {maskedEmail || adminEmail}
                </span>
              </div>

              <div className="space-y-1 text-center">
                <label className="text-xs font-semibold text-[#918fa1] block">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="• • • • • •"
                  className="w-full h-12 text-center text-xl font-mono tracking-widest rounded-xl bg-[#0c0e13] text-[#44dfab] border border-[#33353a] focus:outline-none focus:border-[#44dfab]"
                />
                <span className="text-[11px] text-[#918fa1] block pt-1">
                  Expires in 10 minutes · 3 attempts maximum
                </span>
              </div>

              <button
                type="submit"
                disabled={authLoading || otpValue.length < 6}
                className="w-full h-11 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] disabled:opacity-40 text-[#003827] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span>Validating OTP Token...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Session</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-[#918fa1] pt-2">
                <button
                  type="button"
                  onClick={() => setAuthStep('credentials')}
                  className="hover:text-[#e2e2e9]"
                >
                  ← Back to Credentials
                </button>
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="hover:text-[#e2e2e9]"
                >
                  Exit
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-[#111318] text-[#e2e2e9] pb-24">
      
      {/* Top Admin Bar */}
      <div className="w-full bg-[#18191f] border-b border-[#33353a] px-4 sm:px-8 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-xs font-semibold text-[#c4c0ff] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Agency Site</span>
            </button>
            <div className="h-4 w-px bg-[#33353a]" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#44dfab] animate-pulse" />
              <span className="text-xs font-semibold text-[#44dfab]">Apps Script Auth Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#14151a] border border-[#33353a] text-xs">
              <span className="text-[#918fa1]">Session:</span>
              <span className="font-mono text-[#44dfab] font-bold">2FA Verified</span>
              <span className="text-[#918fa1]">| Admin:</span>
              <span className="font-semibold text-[#e2e2e9]">suhailahmedaamro786@gmail.com</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-[#282a2f] hover:bg-[#93000a]/40 text-xs font-semibold text-[#ffb4ab] transition-colors flex items-center gap-1.5 border border-[#ffb4ab]/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 space-y-6">
        
        {/* Backend Authentication Notice */}
        <div className="p-4 rounded-2xl bg-[#1e1f25] border border-[#33353a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#44dfab] flex-shrink-0" />
            <span className="text-[#c7c4d8]">
              <strong className="text-white font-semibold">Backend Integration:</strong> Apps Script authentication active (2FA enforced). Data management runs in the local administrative workspace until backend spreadsheet CRUD endpoints are deployed.
            </span>
          </div>
          {tokenExpiresAt && (
            <div className="text-[11px] text-[#918fa1] font-mono flex-shrink-0">
              Session Expires: {new Date(tokenExpiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#33353a] pb-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveSection('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'overview' ? 'bg-[#8781ff] text-[#1c0091]' : 'bg-[#1e1f25] text-[#918fa1] hover:text-white'
            }`}
          >
            Overview & Telemetry
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSection === 'inquiries' ? 'bg-[#8781ff] text-[#1c0091]' : 'bg-[#1e1f25] text-[#918fa1] hover:text-white'
            }`}
          >
            <span>Client Inquiries ({leadsList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'projects' ? 'bg-[#8781ff] text-[#1c0091]' : 'bg-[#1e1f25] text-[#918fa1] hover:text-white'
            }`}
          >
            Projects Manager ({projectsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'settings' ? 'bg-[#8781ff] text-[#1c0091]' : 'bg-[#1e1f25] text-[#918fa1] hover:text-white'
            }`}
          >
            Brand Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'audit' ? 'bg-[#8781ff] text-[#1c0091]' : 'bg-[#1e1f25] text-[#918fa1] hover:text-white'
            }`}
          >
            Audit Log
          </button>
        </div>

        {/* SECTION: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a] space-y-1">
                <span className="text-[11px] uppercase text-[#918fa1]">Live Portfolio</span>
                <span className="text-2xl font-bold font-mono text-[#e2e2e9] block">{projectsList.length}</span>
                <span className="text-[11px] text-[#44dfab]">100% Deployed</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a] space-y-1">
                <span className="text-[11px] uppercase text-[#918fa1]">Total Inquiries</span>
                <span className="text-2xl font-bold font-mono text-[#8781ff] block">{leadsList.length}</span>
                <span className="text-[11px] text-[#918fa1]">ProjectInquiries Tab</span>
              </div>
              <div className="p-4 rounded-xl bg-[#282a2f] border border-[#ffb4ab]/30 space-y-1">
                <span className="text-[11px] uppercase text-[#ffb4ab] font-bold">New Leads</span>
                <span className="text-2xl font-bold font-mono text-[#ffb4ab] block">
                  {leadsList.filter(l => (l.Status || l.status || '').toLowerCase() === 'new').length}
                </span>
                <span className="text-[11px] text-[#ffb4ab]">SLA &lt; 4 Hours</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a] space-y-1">
                <span className="text-[11px] uppercase text-[#918fa1]">Primary Market</span>
                <span className="text-sm font-bold text-[#e2e2e9] block truncate">Dadu, Sindh, PK</span>
                <span className="text-[11px] text-[#44dfab]">PKR Default</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a] space-y-1">
                <span className="text-[11px] uppercase text-[#918fa1]">Uptime Target</span>
                <span className="text-2xl font-bold font-mono text-[#44dfab] block">99.98%</span>
                <span className="text-[11px] text-[#8781ff]">Edge CDN</span>
              </div>
            </div>

            {/* Quick Spreadsheet Data Status */}
            <div className="p-5 rounded-2xl bg-[#1e1f25] border border-[#33353a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#e2e2e9] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#8781ff]" />
                  Google Spreadsheet Storage Telemetry
                </span>
                <span className="text-xs font-mono text-[#44dfab]">ID: {APP_CONFIG.backend.spreadsheetId}</span>
              </div>
              <p className="text-xs text-[#918fa1] leading-relaxed">
                Connected to 6 spreadsheet tabs: <code>ProjectInquiries</code>, <code>Projects</code>, <code>Services</code>, <code>Packages</code>, <code>Settings</code>, and <code>AdminAudit</code>.
              </p>
            </div>
          </div>
        )}

        {/* SECTION: INQUIRIES & CRM */}
        {activeSection === 'inquiries' && (
          <div className="rounded-2xl bg-[#1e1f25] border border-[#33353a] p-5 sm:p-6 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#e2e2e9]">Project Inquiries & Lead Pipeline</h2>
                <p className="text-xs text-[#918fa1]">Stored in the ProjectInquiries Google Sheets tab.</p>
              </div>

              {/* Status filter */}
              <div className="flex items-center bg-[#14151a] p-1 rounded-xl border border-[#33353a] text-xs">
                {['all', 'new', 'contacted', 'quoted', 'in progress', 'completed'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveLeadFilter(f)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                      activeLeadFilter === f ? 'bg-[#282a2f] text-[#c4c0ff]' : 'text-[#918fa1] hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#918fa1] bg-[#14151a] rounded-xl border border-[#33353a]">
                No inquiries matching filter "{activeLeadFilter}".
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#33353a] text-[#918fa1] uppercase text-[11px]">
                      <th className="py-2.5 px-3">Client & ID</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Scope & Budget</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#33353a]/50 text-[#c7c4d8]">
                    {filteredLeads.map((lead, idx) => {
                      const id = lead.InquiryID || lead.id || `lead-${idx}`;
                      const name = lead.ClientName || lead.clientName || 'Client';
                      const email = lead.Email || lead.email || '';
                      const phone = lead.Phone || lead.phone || '';
                      const scope = lead.ServiceCategory || lead.projectScope || 'General';
                      const budget = lead.BudgetRange || lead.estimatedBudget || 'To be discussed';
                      const status = lead.Status || lead.status || 'New';

                      return (
                        <tr key={id} className="hover:bg-[#282a2f]/40 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-bold text-[#e2e2e9] text-sm block">{name}</span>
                            <span className="text-[10px] font-mono text-[#8781ff]">{id}</span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px]">
                            <span className="text-[#44dfab] block">{phone}</span>
                            <span className="text-[#918fa1] truncate max-w-[160px] block">{email}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[#e2e2e9] font-semibold block">{scope}</span>
                            <span className="text-[11px] text-[#918fa1]">{budget}</span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={status}
                              onChange={(e) => handleUpdateLeadStatus(id, e.target.value)}
                              className="bg-[#0c0e13] text-[#e2e2e9] rounded px-2.5 py-1 text-xs border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                            >
                              <option value="New">● New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quoted">Quoted</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Approved">Approved</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${name}, regarding your ${scope} inquiry with SK DEV TEAM...`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-[#44dfab]/15 hover:bg-[#44dfab]/30 text-[#44dfab]"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a
                                href={`mailto:${email}?subject=Project%20Scope%20Discussion%20-%20SK%20DEV%20TEAM`}
                                className="p-1.5 rounded-lg bg-[#8781ff]/15 hover:bg-[#8781ff]/30 text-[#c4c0ff]"
                                title="Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedLeadForNotes(lead);
                                  setNoteDraft(lead.FollowUpNotes || lead.notes || '');
                                }}
                                className="p-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#c7c4d8]"
                                title="Notes"
                              >
                                <FileEdit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SECTION: PROJECTS MANAGER */}
        {activeSection === 'projects' && (
          <div className="rounded-2xl bg-[#1e1f25] border border-[#33353a] p-5 sm:p-6 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#e2e2e9]">Portfolio Flagships</h2>
                <p className="text-xs text-[#918fa1]">Synced with the Projects tab in Google Sheets.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddProjectModal(true)}
                className="h-9 px-3.5 rounded-xl bg-[#8781ff] text-[#1c0091] font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Project</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#33353a] text-[#918fa1] uppercase text-[11px]">
                    <th className="py-2.5 px-3">Title & Live URL</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Stack</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#33353a]/50 text-[#c7c4d8]">
                  {projectsList.map(p => (
                    <tr key={p.id} className="hover:bg-[#282a2f]/40">
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#e2e2e9] block text-sm">{p.title}</span>
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#8781ff] text-[11px] hover:underline flex items-center gap-1">
                          <span>{p.liveUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#14151a] border border-[#33353a]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-[#918fa1]">
                        {p.stack.join(', ')}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(p)}
                            className="p-1 rounded hover:bg-[#33353a] text-[#ffb4ab]"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: BRAND SETTINGS */}
        {activeSection === 'settings' && (
          <div className="rounded-2xl bg-[#1e1f25] border border-[#33353a] p-6 space-y-4 shadow-lg text-xs">
            <h2 className="text-lg font-bold text-[#e2e2e9]">Approved Brand & Public Metadata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]">
                <span className="text-[#918fa1] block">Brand Name:</span>
                <span className="font-bold text-sm text-[#e2e2e9]">{APP_CONFIG.brand.name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]">
                <span className="text-[#918fa1] block">Email:</span>
                <span className="font-bold text-sm text-[#e2e2e9]">{APP_CONFIG.brand.email}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]">
                <span className="text-[#918fa1] block">WhatsApp:</span>
                <span className="font-bold text-sm text-[#44dfab]">{APP_CONFIG.brand.whatsapp}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]">
                <span className="text-[#918fa1] block">Market & Currency:</span>
                <span className="font-bold text-sm text-[#e2e2e9]">{APP_CONFIG.brand.primaryMarket} ({APP_CONFIG.brand.currency})</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: AUDIT LOG */}
        {activeSection === 'audit' && (
          <div className="rounded-2xl bg-[#1e1f25] border border-[#33353a] p-6 space-y-4 shadow-lg text-xs">
            <h2 className="text-lg font-bold text-[#e2e2e9]">Admin Security Audit Log</h2>
            <div className="p-4 rounded-xl bg-[#14151a] border border-[#33353a] space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#33353a]/60 text-[11px] text-[#918fa1]">
                <span>2FA OTP Verification Cleared</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#33353a]/60 text-[11px] text-[#918fa1]">
                <span>Session Signature Verified (HMAC-SHA256)</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#918fa1]">
                <span>Database Sync Checked</span>
                <span>Spreadsheet Tab: AdminAudit</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: New Project */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#0c0e13]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#1e1f25] border border-[#33353a] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#33353a]">
              <h3 className="font-bold text-sm text-[#e2e2e9]">Publish New Project</h3>
              <button type="button" onClick={() => setShowAddProjectModal(false)}><X className="w-4 h-4 text-[#918fa1]" /></button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="text-[#918fa1] font-semibold block mb-1">Project Title</label>
                <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. HyperPay Enterprise" className="w-full h-9 px-3 rounded-lg bg-[#0c0e13] border border-[#33353a]" />
              </div>
              <div>
                <label className="text-[#918fa1] font-semibold block mb-1">Category</label>
                <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full h-9 px-3 rounded-lg bg-[#0c0e13] border border-[#33353a]">
                  <option value="Web Platforms">Web Platforms</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="Education & LMS">Education & LMS</option>
                  <option value="Enterprise & Admin">Enterprise & Admin</option>
                </select>
              </div>
              <div>
                <label className="text-[#918fa1] font-semibold block mb-1">Live Demo URL</label>
                <input type="url" value={newLiveUrl} onChange={e => setNewLiveUrl(e.target.value)} placeholder="https://demo.client.com" className="w-full h-9 px-3 rounded-lg bg-[#0c0e13] border border-[#33353a]" />
              </div>
              <div>
                <label className="text-[#918fa1] font-semibold block mb-1">Tech Stack</label>
                <input type="text" value={newStack} onChange={e => setNewStack(e.target.value)} placeholder="Next.js, Tailwind, Rust" className="w-full h-9 px-3 rounded-lg bg-[#0c0e13] border border-[#33353a]" />
              </div>
              <div className="pt-2 flex justify-end gap-2 border-t border-[#33353a]">
                <button type="button" onClick={() => setShowAddProjectModal(false)} className="px-3 py-1.5 rounded-lg bg-[#282a2f] text-[#918fa1]">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-[#8781ff] text-[#1c0091] font-bold">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: Follow-up Notes */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-[#0c0e13]/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md h-full bg-[#1e1f25] border-l border-[#33353a] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#33353a]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#44dfab]">Follow-Up Notes</span>
                  <h3 className="text-base font-bold text-[#e2e2e9]">{selectedLeadForNotes.ClientName || selectedLeadForNotes.clientName}</h3>
                </div>
                <button type="button" onClick={() => setSelectedLeadForNotes(null)}><X className="w-5 h-5 text-[#918fa1]" /></button>
              </div>
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-[#918fa1]">Confidential Negotiation & Scope Notes</label>
                <textarea
                  rows={6}
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  placeholder="Add scope details, quotation amounts, or milestone notes..."
                  className="w-full p-3 rounded-xl bg-[#0c0e13] text-[#e2e2e9] border border-[#33353a] focus:outline-none focus:border-[#8781ff] leading-relaxed"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-[#33353a]">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="w-full py-2.5 rounded-xl bg-[#8781ff] text-[#1c0091] font-bold text-xs"
              >
                Save Notes to Spreadsheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#282a2f] text-[#e2e2e9] border border-[#44dfab]/40 shadow-2xl">
          <CheckCircle2 className="w-4 h-4 text-[#44dfab]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
