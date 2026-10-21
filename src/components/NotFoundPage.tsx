import React from 'react';
import { Home, MessageCircle, AlertTriangle } from 'lucide-react';
import { APP_CONFIG } from '../config/app';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#282a2f] text-[#8781ff] flex items-center justify-center mx-auto shadow-md">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#e2e2e9] font-mono">404</span>
          <h1 className="text-xl font-bold text-[#e2e2e9]">Page Not Found</h1>
          <p className="text-sm text-[#918fa1] leading-relaxed">
            The page or resource you requested could not be located on the SK DEV TEAM platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onGoHome}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
          <a
            href={APP_CONFIG.brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#14151a] hover:bg-[#282a2f] text-[#44dfab] font-semibold text-xs sm:text-sm transition-colors border border-[#44dfab]/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
