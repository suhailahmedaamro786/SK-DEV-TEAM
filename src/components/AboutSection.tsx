import React from 'react';
import { ShieldCheck, MapPin, Sparkles, Code2, Users, Rocket, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/app';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="about">
      <div className="flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1f25] border border-[#33353a] w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#44dfab] animate-pulse" />
            <span className="text-xs uppercase font-bold text-[#44dfab]">
              About SK DEV TEAM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
            High-Conviction Engineering & Digital Craftsmanship
          </h2>
          <p className="text-sm sm:text-base text-[#918fa1] leading-relaxed">
            {APP_CONFIG.brand.tagline}. Based in Dadu, Sindh, Pakistan, building high-performance web systems for ambitious local and international enterprises.
          </p>
        </div>

        {/* Narrative & Philosophy Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Story (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2e9]">
                Who We Are & What We Stand For
              </h3>
              <p className="text-sm text-[#c7c4d8] leading-relaxed">
                Founded by lead architect <strong className="text-white">Suhail Ahmed</strong>, SK DEV TEAM operates at the intersection of technical discipline, minimalist design, and practical business automation.
              </p>
              <p className="text-sm text-[#918fa1] leading-relaxed">
                We believe ambitious businesses should not be constrained by expensive monthly software subscriptions or fragile boilerplate templates. We design custom web architectures—from online ordering engines and school portals to bespoke AI workflows—tailored precisely to our clients' commercial goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#33353a]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8781ff] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold text-[#918fa1] block">Primary Market</span>
                  <span className="text-sm font-semibold text-[#e2e2e9]">Dadu, Sindh, Pakistan</span>
                  <span className="text-xs text-[#44dfab] block">Plus Remote & Global Clients</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#44dfab] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold text-[#918fa1] block">Architecture Philosophy</span>
                  <span className="text-sm font-semibold text-[#e2e2e9]">Zero-Cost & Free-Tier First</span>
                  <span className="text-xs text-[#918fa1] block">Maximized ROI for clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlights (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#18191f] border border-[#33353a] shadow-md space-y-4">
              <span className="text-xs uppercase font-bold text-[#8781ff] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8781ff]" />
                Zero-Hype Transparency
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-[#e2e2e9]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                  <span><strong>No Fabricated Pricing:</strong> Quotations are tailored strictly to scope, page counts, and integrations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                  <span><strong>100% Genuine Demos:</strong> All 6 showcased platforms are verified, active deployments with live URLs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                  <span><strong>Direct Communication:</strong> Direct WhatsApp and email access to the engineering team without gatekeepers.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#1e1f25] border border-[#8781ff]/40 shadow-xl space-y-2">
              <span className="text-xs uppercase font-bold text-[#c4c0ff]">
                Executive Contact
              </span>
              <div className="space-y-1 text-xs sm:text-sm text-[#918fa1]">
                <p>Email: <a href="mailto:suhailahmedaamro786@gmail.com" className="text-[#c4c0ff] hover:underline">suhailahmedaamro786@gmail.com</a></p>
                <p>WhatsApp Hotline: <a href="https://wa.me/923153558383" target="_blank" rel="noopener noreferrer" className="text-[#44dfab] hover:underline">+92 315 3558383</a></p>
                <p>Alternative Phone: <span className="text-[#e2e2e9]">+92 309 3305243</span></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
