import React from 'react';
import { Mail, Phone, MessageCircle, Lock, Rocket, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'projects' | 'services' | 'admin' | 'contact') => void;
  onOpenRobot: () => void;
  onStartProject: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRobot,
  onStartProject
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1a1b21] border-t border-[#33353a]/50 text-[#e2e2e9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Craftsmanship */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8781ff] to-[#44dfab] p-[1px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#111318] rounded-[10px] flex items-center justify-center font-bold text-[#c4c0ff] text-sm">
                  SK
                </div>
              </div>
              <span className="font-bold text-lg text-[#e2e2e9]">SK DEV TEAM</span>
            </div>
            <p className="text-sm text-[#918fa1] max-w-sm leading-relaxed">
              High-conviction digital craftsmanship, enterprise engineering, and scalable architectural precision for fast-growing global brands.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#44dfab] animate-pulse" />
              <span className="text-xs font-semibold text-[#44dfab]">
                Available for new client deployments
              </span>
            </div>
          </div>

          {/* Col 2: Agency Navigation */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-[#e2e2e9] uppercase tracking-wider text-[#918fa1]">
              Agency Navigation
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#c7c4d8]">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#c4c0ff] transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="text-left hover:text-[#c4c0ff] transition-colors"
              >
                Case Studies & Projects
              </button>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="text-left hover:text-[#c4c0ff] transition-colors"
              >
                13 Engineering Services & Packages
              </button>
              <button
                type="button"
                onClick={onOpenRobot}
                className="text-left text-[#44dfab] hover:underline transition-colors flex items-center gap-1 font-medium"
              >
                <span>🤖 AI Robot Assistant (Roman Urdu)</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#c4c0ff] transition-colors"
              >
                Contact Inquiries
              </button>
            </nav>
          </div>

          {/* Col 3: Executive Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-[#e2e2e9] uppercase tracking-wider text-[#918fa1]">
              Executive Contact
            </span>
            <div className="flex flex-col gap-2.5 text-sm text-[#c7c4d8]">
              <a
                href="mailto:suhailahmedaamro786@gmail.com"
                className="hover:text-[#c4c0ff] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#8781ff]" />
                <span className="truncate">suhailahmedaamro786@gmail.com</span>
              </a>
              <a
                href="tel:+923153558383"
                className="hover:text-[#c4c0ff] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#8781ff]" />
                <span>+92 315 3558383</span>
              </a>
              <a
                href="tel:+923093305243"
                className="hover:text-[#c4c0ff] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#8781ff]" />
                <span>+92 309 3305243 (Alt)</span>
              </a>
              <a
                href="https://wa.me/923153558383"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#67fcc6] text-[#44dfab] transition-colors flex items-center gap-2 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Col 4: Internal Systems & Management */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-[#e2e2e9] uppercase tracking-wider text-[#918fa1]">
              Internal Systems
            </span>
            <p className="text-sm text-[#918fa1] leading-relaxed">
              Authorized personnel and client workspace management telemetry.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-2 text-sm text-[#c7c4d8] hover:text-white transition-colors"
              >
                <Lock className="w-4 h-4 text-[#8781ff]" />
                <span>Client & Admin Portal</span>
              </button>
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 text-sm text-[#44dfab] hover:text-[#67fcc6] transition-colors font-semibold"
              >
                <Rocket className="w-4 h-4" />
                <span>Initiate Discovery Project</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#33353a]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#918fa1]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SK DEV TEAM. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#c7c4d8]">Lead Developer: Suhail Ahmed</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-[#e2e2e9] transition-colors"
            >
              Privacy & Quotation Terms
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[#1e1f25] hover:bg-[#282a2f] text-[#c7c4d8] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
