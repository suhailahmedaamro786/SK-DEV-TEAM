import React, { useState } from 'react';
import { Star, Play, MessageCircle, Subtitles, ShieldCheck, TrendingUp, Bot, X } from 'lucide-react';

export const ClientTestimonials: React.FC = () => {
  const [activeModalData, setActiveModalData] = useState<{
    founder: string;
    project: string;
    quote: string;
    metrics: string;
    duration: string;
  } | null>(null);

  const testimonials = [
    {
      founder: 'Marco Castiglione',
      role: 'Founder & CEO, D-Pizza',
      project: 'D-Pizza Storefront & Ordering',
      category: 'E-Commerce / FoodTech',
      quote: 'SK DEV TEAM delivered our custom ordering platform in 12 days. Instant checkout reduced cart dropouts by 34%, and kitchen dispatch has been completely seamless during peak dinner rush.',
      metrics: '+34% Conversions · <350ms Checkout',
      duration: '01:42 HD',
      initials: 'MC',
      accentColor: 'text-[#44dfab]',
      bgColor: 'bg-[#44dfab]/20'
    },
    {
      founder: 'Dr. Elena Rostova',
      role: 'VP of Operations, HealthTech Solutions',
      project: 'AI Appointment Booking Agent',
      category: 'AI & Voice Automation',
      quote: 'The conversational AI appointment bot manages 450+ inquiries weekly with zero missed bookings and full calendar sync.',
      metrics: '450+ Auto-Bookings / Week · 99.98% Uptime',
      duration: '02:15 HD',
      initials: 'ER',
      accentColor: 'text-[#c4c0ff]',
      bgColor: 'bg-[#8781ff]/20'
    },
    {
      founder: 'Farhan Akhtar',
      role: 'Technical Director, DCCID Org',
      project: 'DCCID Institutional Platform',
      category: 'Institutional Web3 / Cloud',
      quote: 'Flawless execution on our high-traffic directory and secure archive. The team\'s communication over WhatsApp was daily and proactive.',
      metrics: '100% On-Time Delivery · Zero Security Exploits',
      duration: '01:58 HD',
      initials: 'FA',
      accentColor: 'text-[#44dfab]',
      bgColor: 'bg-[#44dfab]/20'
    }
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="testimonials">
      <div className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1f25] border border-[#33353a] w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#44dfab] animate-pulse" />
              <span className="text-xs uppercase font-bold text-[#44dfab]">
                Verified Client Feedback & Founder Interviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
              Hear Directly from Our Engineering Partners
            </h2>
            <p className="text-sm sm:text-base text-[#918fa1] max-w-xl">
              Founders, CTOs, and product leaders share their experience shipping mission-critical platforms with SK DEV TEAM.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1f25] border border-[#33353a] shadow-sm">
            <div className="flex text-[#44dfab]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#e2e2e9]">
              5.0 / 5.0 Average Client Rating across 18+ commercial releases
            </span>
          </div>
        </div>

        {/* 3 Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-[#1e1f25] border border-[#33353a] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#8781ff]/40 transition-all duration-300 group"
            >
              {/* Media banner frame */}
              <div className="relative h-48 w-full bg-gradient-to-tr from-[#0c0e13] via-[#1a1b21] to-[#282a2f] flex flex-col justify-between p-4 overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className={`px-2.5 py-0.5 rounded-full bg-[#111318]/90 text-xs font-semibold ${t.accentColor}`}>
                    {t.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#918fa1] px-2 py-0.5 rounded bg-[#111318]/70">
                    {t.duration}
                  </span>
                </div>

                {/* Play Button */}
                <div className="my-auto flex items-center justify-center z-10">
                  <button
                    type="button"
                    onClick={() => setActiveModalData({
                      founder: t.founder,
                      project: t.project,
                      quote: t.quote,
                      metrics: t.metrics,
                      duration: t.duration
                    })}
                    className="w-14 h-14 rounded-full bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] flex items-center justify-center shadow-[0_0_24px_rgba(68,223,171,0.4)] hover:scale-105 active:scale-95 transition-all"
                    aria-label={`Play Interview with ${t.founder}`}
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between z-10 text-[11px] text-[#918fa1]">
                  <span>Verified Production Sprint</span>
                  <span className="text-[#44dfab] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#44dfab]" />
                    Verified Client
                  </span>
                </div>
              </div>

              {/* Content block */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${t.bgColor} flex items-center justify-center font-bold text-sm ${t.accentColor}`}>
                      {t.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#e2e2e9]">{t.founder}</span>
                      <span className="text-[11px] text-[#918fa1]">{t.role}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#c7c4d8] italic leading-relaxed">
                    “{t.quote}”
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#14151a] text-[#44dfab] text-xs font-semibold flex items-center gap-1.5 border border-[#33353a]/60">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t.metrics}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalData({
                        founder: t.founder,
                        project: t.project,
                        quote: t.quote,
                        metrics: t.metrics,
                        duration: t.duration
                      })}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Subtitles className="w-3.5 h-3.5 text-[#8781ff]" />
                      <span>Transcript</span>
                    </button>
                    <a
                      href={`https://wa.me/923153558383?text=${encodeURIComponent(`Hi SK DEV TEAM, I saw ${t.founder}'s testimonial on ${t.project} and want to discuss building a similar platform.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#8781ff]/20 hover:bg-[#8781ff] text-[#c4c0ff] hover:text-[#1c0091] text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire Build</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Video / Transcript Modal */}
        {activeModalData && (
          <div 
            className="fixed inset-0 z-50 bg-[#0c0e13]/85 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-xl rounded-3xl bg-[#1e1f25] border border-[#8781ff]/40 p-6 sm:p-7 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#44dfab] animate-pulse" />
                  <span className="text-xs uppercase font-bold text-[#44dfab]">
                    {activeModalData.project}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalData(null)}
                  className="w-8 h-8 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#918fa1] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#14151a] border border-[#33353a] space-y-2">
                <span className="text-xs uppercase font-bold text-[#8781ff]">
                  Executive Verbatim Transcript:
                </span>
                <p className="text-sm text-[#e2e2e9] italic leading-relaxed">
                  “{activeModalData.quote}”
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#18191f] border border-[#33353a] text-xs text-[#918fa1]">
                <span className="text-[#44dfab] font-semibold">{activeModalData.metrics}</span>
                <span>Lead Architect: Suhail Ahmed</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalData(null)}
                  className="px-4 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs font-semibold"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/923153558383?text=${encodeURIComponent(`Hi SK DEV TEAM, I watched the testimonial from ${activeModalData.founder} and want to build a similar project.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
