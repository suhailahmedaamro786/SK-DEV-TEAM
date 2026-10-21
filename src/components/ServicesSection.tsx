import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, MessageCircle, Bot, 
  HelpCircle, ShieldAlert, Sparkles, ChevronRight,
  Globe, Palette, ShoppingBag, MessageSquare, School,
  LayoutDashboard, Puzzle, Calendar, Cpu, Settings2,
  Rocket, Search, Wrench
} from 'lucide-react';
import { SERVICES_CATALOGUE } from '../data/servicesData';
import { ServiceItem, PackageTier } from '../types';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string, packageTier?: PackageTier) => void;
  onAskRobot: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
  onAskRobot
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_CATALOGUE[0].id);
  const [activeTier, setActiveTier] = useState<PackageTier>('Small');

  const selectedService = SERVICES_CATALOGUE.find(s => s.id === selectedServiceId) || SERVICES_CATALOGUE[0];
  const currentPackage = activeTier === 'Small' 
    ? selectedService.packages.small 
    : activeTier === 'Medium' 
    ? selectedService.packages.medium 
    : selectedService.packages.premium;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="services">
      <div className="flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold text-[#44dfab]">
            13 Specialized Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
            Comprehensive Digital Engineering & Packages
          </h2>
          <p className="text-sm sm:text-base text-[#918fa1] leading-relaxed">
            Har service ka mukammal jaiza, Small, Medium aur Premium packages ki tafseelat, aur verified features. Roman Urdu aur English technical terms ke sath.
          </p>
        </div>

        {/* 13 Services Quick Grid Picker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
          {SERVICES_CATALOGUE.map((s, idx) => {
            const isSelected = s.id === selectedServiceId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedServiceId(s.id);
                  setActiveTier('Small');
                }}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#282a2f] border-[#8781ff] text-[#c4c0ff] shadow-lg ring-1 ring-[#8781ff]/40'
                    : 'bg-[#1e1f25] border-[#33353a] text-[#918fa1] hover:text-[#e2e2e9] hover:bg-[#282a2f]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold opacity-60">0{idx + 1}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#44dfab]' : 'bg-transparent'}`} />
                </div>
                <span className="text-xs font-bold line-clamp-2 leading-snug">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Inspection Canvas */}
        <div className="rounded-3xl bg-[#1e1f25] border border-[#33353a] p-6 lg:p-10 shadow-2xl space-y-8">
          
          {/* Main Service Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#33353a]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#8781ff]/20 text-[#c4c0ff] text-xs font-semibold uppercase">
                  {selectedService.badge}
                </span>
                <span className="text-xs text-[#918fa1]">·</span>
                <span className="text-xs text-[#918fa1]">Verified Architecture</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#e2e2e9] tracking-tight">
                {selectedService.title}
              </h3>
              <p className="text-sm text-[#918fa1] max-w-2xl">
                {selectedService.summary}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onAskRobot(selectedService)}
                className="px-4 py-2.5 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] text-xs sm:text-sm font-semibold transition-all border border-[#8781ff]/40 flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#8781ff]" />
                <span>Ask AI Robot Assistant</span>
              </button>
            </div>
          </div>

          {/* Roman Urdu Explanation Strip */}
          <div className="p-5 rounded-2xl bg-[#14151a] border border-[#33353a] space-y-3">
            <span className="text-xs uppercase font-bold text-[#44dfab] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#44dfab]" />
              Roman Urdu Wazahat (In Simple Terms)
            </span>
            <p className="text-base text-[#e2e2e9] font-medium leading-relaxed italic">
              “{selectedService.romanUrduIntro}”
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#1e1f25] border border-[#33353a]/60 space-y-1">
                <span className="font-bold text-[#c4c0ff] block">👥 Kisko Chahiye (Target Audience):</span>
                <span className="text-[#c7c4d8] leading-relaxed">{selectedService.whoNeedsIt}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1e1f25] border border-[#33353a]/60 space-y-1">
                <span className="font-bold text-[#44dfab] block">💡 Kaunsa Masla Hal Hota Hai:</span>
                <span className="text-[#c7c4d8] leading-relaxed">{selectedService.problemSolved}</span>
              </div>
            </div>
          </div>

          {/* Package Tier Switcher for this Service */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-[#918fa1]">
                Select Package to Review:
              </span>
              <span className="text-xs text-[#918fa1]">
                Small vs Medium vs Premium for {selectedService.title}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(['Small', 'Medium', 'Premium'] as PackageTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setActiveTier(tier)}
                  className={`p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all text-center border ${
                    activeTier === tier
                      ? 'bg-[#8781ff] text-[#1c0091] border-[#8781ff] shadow-xl'
                      : 'bg-[#14151a] hover:bg-[#282a2f] text-[#918fa1] hover:text-[#e2e2e9] border-[#33353a]'
                  }`}
                >
                  <span className="block text-sm sm:text-base">{tier}</span>
                  <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                    {tier === 'Small' ? 'Basic / MVP' : tier === 'Medium' ? 'Growing / Standard' : 'Enterprise / Advanced'}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Package Features Card */}
            <div className="p-6 rounded-2xl bg-[#18191f] border-2 border-[#8781ff]/40 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#e2e2e9]">
                    {currentPackage.name} — <span className="text-[#c4c0ff]">{currentPackage.subtitle}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#918fa1] mt-0.5">
                    Suitable For: {currentPackage.suitableFor}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#1e1f25] border border-[#33353a] text-xs font-semibold text-[#44dfab]">
                  Verified Scope
                </span>
              </div>

              {/* Feature bullets */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs uppercase font-bold text-[#918fa1]">
                  Detailed Features Checklist:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#e2e2e9]">
                  {currentPackage.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#14151a]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quotation notice */}
              {currentPackage.quotationRequirements && (
                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a] text-xs text-[#918fa1] flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-[#8781ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#c4c0ff] block mb-0.5">Quotation & Scope Notice:</span>
                    <span>{currentPackage.quotationRequirements}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#33353a] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectServiceForInquiry(selectedService.title, activeTier)}
                  className="px-5 py-2.5 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(112,103,255,0.35)] flex items-center gap-2"
                >
                  <span>Select {selectedService.title} ({activeTier}) in Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923153558383?text=${encodeURIComponent(`Assalam-o-Alaikum SK DEV TEAM! Main aap ki service "${selectedService.title}" (${activeTier} Package) par consultation aur quotation chahta hoon.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] text-[#44dfab] text-xs sm:text-sm font-semibold transition-colors border border-[#44dfab]/30 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Quotation</span>
                </a>
              </div>
            </div>

          </div>

          {/* Optional Add-ons & Quotation Rules */}
          <div className="p-5 rounded-2xl bg-[#14151a] border border-[#33353a] space-y-3">
            <span className="text-xs uppercase font-bold text-[#c4c0ff]">
              Optional Add-ons Available Upon Request:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-[#c7c4d8]">
              {selectedService.optionalAddons.map((add, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#1e1f25] border border-[#33353a]/40 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8781ff]" />
                  <span>{add}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#918fa1] italic pt-1">
              General Rule: {selectedService.quotationNotice}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
