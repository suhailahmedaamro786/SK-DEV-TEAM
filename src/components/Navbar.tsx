import React from 'react';
import { Bot, MessageCircle, Shield, Rocket, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'projects' | 'services' | 'admin' | 'contact';
  onNavigate: (view: 'home' | 'projects' | 'services' | 'admin' | 'contact') => void;
  onOpenRobot: () => void;
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenRobot,
  onStartProject
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#111318]/85 backdrop-blur-xl border-b border-[#33353a]/50">
      <div className="h-16 sm:h-20 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8781ff] to-[#44dfab] p-[1px] flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-[#111318] rounded-[11px] flex items-center justify-center font-bold text-[#c4c0ff] text-base group-hover:text-white transition-colors">
                SK
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#e2e2e9] leading-none">
                SK DEV TEAM
              </span>
              <span className="text-[11px] text-[#918fa1] hidden sm:inline-block leading-tight mt-0.5">
                Digital Solutions for Growing Businesses
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'home'
                ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold'
                : 'text-[#c7c4d8] hover:text-[#e2e2e9] hover:bg-[#1e1f25]'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'projects'
                ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold'
                : 'text-[#c7c4d8] hover:text-[#e2e2e9] hover:bg-[#1e1f25]'
            }`}
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'services'
                ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold'
                : 'text-[#c7c4d8] hover:text-[#e2e2e9] hover:bg-[#1e1f25]'
            }`}
          >
            Services & Packages
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'contact'
                ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold'
                : 'text-[#c7c4d8] hover:text-[#e2e2e9] hover:bg-[#1e1f25]'
            }`}
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold'
                : 'text-[#918fa1] hover:text-[#e2e2e9] hover:bg-[#1e1f25]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#8781ff]" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* AI Robot Quick Button */}
          <button
            type="button"
            onClick={onOpenRobot}
            className="flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] text-[#c4c0ff] border border-[#8781ff]/40 shadow-sm transition-all text-xs sm:text-sm font-semibold shrink-0"
            title="Open Roman Urdu AI Guide Robot"
          >
            <Bot className="w-4 h-4 text-[#8781ff] animate-bounce" />
            <span className="hidden md:inline">AI Robot Guide</span>
            <span className="md:hidden">Robot</span>
          </button>

          {/* WhatsApp Direct Hotline */}
          <a
            href="https://wa.me/923153558383"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] text-[#44dfab] hover:text-[#67fcc6] text-xs sm:text-sm font-semibold transition-colors border border-[#44dfab]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Primary CTA: Start a Project */}
          <button
            type="button"
            onClick={onStartProject}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-5 py-2 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(112,103,255,0.35)] active:scale-[0.98] shrink-0"
          >
            <Rocket className="w-4 h-4" />
            <span className="hidden sm:inline">Start a Project</span><span className="sm:hidden">Start</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg bg-[#1e1f25] text-[#e2e2e9] flex items-center justify-center shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1a1b21] border-b border-[#33353a] px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#e2e2e9] hover:bg-[#282a2f]"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('projects');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#e2e2e9] hover:bg-[#282a2f]"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#e2e2e9] hover:bg-[#282a2f]"
          >
            Services & Packages
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#e2e2e9] hover:bg-[#282a2f]"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#c4c0ff] hover:bg-[#282a2f] flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#8781ff]" />
            <span>Admin Management Console</span>
          </button>
        </div>
      )}
    </header>
  );
};
