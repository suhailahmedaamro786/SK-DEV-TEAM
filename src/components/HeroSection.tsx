import React, { useState } from 'react';
import { 
  Rocket, Grid, Mail, MessageCircle, Volume2, 
  Square, FileText, ArrowRight, CheckCircle2, 
  Terminal, ShieldCheck, Sparkles, Bot
} from 'lucide-react';
import { ROBOT_WELCOME_TEXT } from '../data/robotDialogue';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreProjects: () => void;
  onExploreServices: () => void;
  onOpenRobotModal: () => void;
}

const MASCOT_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKYcY3DnyZ1LBqZKfn2XRSkhozk7tk4nbX8ckd9ujfdi2i_6tZjc1HLhGN5LvTm6xhk4fFRbe2LlvB-_fku7ItaFyV264fwwqBG7K_2mHGOm6KR1XBK7cgEv6d79P7lA3F4bH1vfTUwuleOMe3Ips7-pz5mIUW3k28b2qLMizijJUDti5fKGPiD2SwoMwd4ec63Z5iiaqT-hKEz9I93v2c4yrB3VwCcJbcYdfjKdI4RZJ8XHjEnmUO';
const MASCOT_FALLBACK = '/assets/aistudio/Image_1_3714ee34.png';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreProjects,
  onExploreServices,
  onOpenRobotModal
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      setShowTranscript(true);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean Roman Urdu text
    const cleanSpeech = ROBOT_WELCOME_TEXT
      .replace(/[#*_`~>•]/g, ' ')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
      v.lang.includes('ur') || 
      v.lang.includes('hi') || 
      (v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setShowTranscript(true);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-[#8781ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[600px] h-[600px] bg-[#44dfab]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* HERO SECTION: use smaller mobile spacing so the headline and main actions appear without excessive scrolling. */}
      <section className="relative w-full max-w-[1440px] mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 min-w-0">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1f25] w-fit border border-[#33353a] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#44dfab] animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#44dfab]">
                Accepting Q2/Q3 Enterprise Projects
              </span>
            </div>

            {/* Primary Heading: responsive text sizes prevent the headline from dominating narrow screens. */}
            <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e2e2e9] leading-[1.1] break-words">
              Building Digital Experiences for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4c0ff] via-[#8781ff] to-[#44dfab]">
                Ambitious Businesses.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#918fa1] max-w-2xl leading-relaxed">
              SK DEV TEAM engineers high-performance websites, dynamic e-commerce platforms, mission-critical management systems, robust admin dashboards, and bespoke AI agents engineered to accelerate scalable revenue.
            </p>

            {/* CTA Cluster: stack buttons on very narrow screens; place them side-by-side when there is room. */}
            <div className="flex flex-col min-[480px]:flex-row flex-wrap items-stretch min-[480px]:items-center gap-2.5 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-[#8781ff] text-[#1c0091] font-bold text-sm sm:text-base transition-all duration-200 hover:bg-[#c4c0ff] hover:scale-[1.02] shadow-[0_0_24px_rgba(112,103,255,0.35)] active:scale-[0.98]"
              >
                <Rocket className="w-4 h-4" />
                <span>Start a Project</span>
              </button>

              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] text-[#e2e2e9] font-semibold text-sm sm:text-base transition-all duration-200 border border-[#33353a] hover:scale-[1.02]"
              >
                <Grid className="w-4 h-4 text-[#8781ff]" />
                <span>Explore Our Projects</span>
              </button>
            </div>

            {/* Direct Contact Links: stack email and WhatsApp links on phones to avoid horizontal overflow. */}
            <div className="flex flex-col min-[480px]:flex-row flex-wrap items-start gap-3 sm:gap-5 pt-1 text-xs sm:text-sm text-[#918fa1] min-w-0">
              <a
                href="mailto:suhailahmedaamro786@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-[#c4c0ff] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8781ff]" />
                <span>suhailahmedaamro786@gmail.com</span>
              </a>
              <a
                href="https://wa.me/923153558383"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#44dfab] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#44dfab]" />
                <span>Direct WhatsApp: +92 315 3558383</span>
              </a>
            </div>

            {/* Telemetry Row */}
            <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2 sm:gap-3 pt-2 w-full max-w-lg">
              <div className="flex flex-row min-[360px]:flex-col items-center min-[360px]:items-start justify-between min-[360px]:justify-start gap-2 min-w-0 p-3 rounded-xl bg-[#1a1b21] border border-[#33353a]/60">
                <span className="text-xl sm:text-2xl font-bold text-[#e2e2e9] font-mono">100%</span>
                <span className="text-[11px] text-[#918fa1] mt-0.5 text-right min-[360px]:text-left">Delivery Success</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-[#1a1b21] border border-[#33353a]/60">
                <span className="text-xl sm:text-2xl font-bold text-[#44dfab] font-mono">99.9%</span>
                <span className="text-[11px] text-[#918fa1] mt-0.5">Guaranteed SLA</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-[#1a1b21] border border-[#33353a]/60">
                <span className="text-xl sm:text-2xl font-bold text-[#c4c0ff] font-mono">24/7</span>
                <span className="text-[11px] text-[#918fa1] mt-0.5">Live AI Support</span>
              </div>
            </div>

          </div>

          {/* Right Column: Cute Robot Visual Frame */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient backdrop orb */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#8781ff]/20 to-[#44dfab]/15 blur-3xl pointer-events-none" />

            {/* Mascot Frame */}
            <div className="relative w-full max-w-[min(100%,28rem)] aspect-square rounded-3xl overflow-hidden bg-[#1a1b21] border-2 border-[#33353a] shadow-2xl flex items-center justify-center p-3 group">
              <img
                src={MASCOT_IMG}
                alt="SK DEV TEAM AI Robot Mascot"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = MASCOT_FALLBACK;
                }}
              />

              {/* Floating Badge 1: Top Right */}
              <div className="absolute top-5 right-5 bg-[#111318]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#33353a] shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#44dfab]" />
                <span className="text-xs font-semibold text-[#e2e2e9]">FastAPI & Next.js</span>
              </div>

              {/* Floating Badge 2: Mid Left */}
              <div className="absolute bottom-16 left-2 sm:-left-1 bg-[#111318]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#33353a] shadow-lg flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#44dfab]" />
                <span className="text-xs font-semibold text-[#e2e2e9]">99.9% Uptime SLA</span>
              </div>

              {/* Floating Badge 3: Bottom Right */}
              <div className="absolute bottom-2 right-2 sm:-bottom-1 sm:right-5 bg-[#1e1f25]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#8781ff]/40 shadow-xl flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#8781ff]" />
                <span className="text-xs font-bold text-[#c4c0ff]">AI Automation Live</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE AI ROBOT ASSISTANT SECTION / WIDGET EMBED */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-[#18191f]/70 border-y border-[#33353a]/40">
        <div className="max-w-[1440px] mx-auto rounded-3xl bg-[#1e1f25] border border-[#33353a] p-5 sm:p-7 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Assistant Avatar & Status */}
            <div className="lg:col-span-5 flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#282a2f] border border-[#8781ff]/40 shadow-md flex-shrink-0">
                <img
                  src={MASCOT_IMG}
                  alt="AI Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = MASCOT_FALLBACK;
                  }}
                />
                <div 
                  className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1e1f25] ${isSpeaking ? 'bg-[#44dfab] animate-ping' : 'bg-[#44dfab]'}`} 
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#e2e2e9] text-base sm:text-lg">
                    SK Core Voice AI
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#44dfab]/20 text-[#44dfab]">
                    Interactive
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#918fa1] truncate mt-0.5">
                  {isSpeaking ? 'Bol raha hoon... (Voice Active in Roman Urdu)' : 'Ready to introduce services, packages & pricing in Roman Urdu.'}
                </p>
              </div>
            </div>

            {/* Interactive Control Center */}
            <div className="lg:col-span-7 flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
              {!isSpeaking ? (
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Start Introduction (Voice)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#93000a] text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95 border border-[#ffb4ab]/40"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop Speaking</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] font-medium text-xs sm:text-sm transition-all border border-[#33353a]"
              >
                <FileText className="w-4 h-4 text-[#8781ff]" />
                <span>{showTranscript ? 'Hide Transcript' : 'Open Transcript'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenRobotModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] font-semibold text-xs sm:text-sm transition-all border border-[#8781ff]/40"
              >
                <Bot className="w-4 h-4 text-[#8781ff]" />
                <span>Open Full Robot Guide</span>
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs sm:text-sm transition-all border border-[#33353a]"
              >
                <Terminal className="w-4 h-4 text-[#44dfab]" />
                <span>View Services</span>
              </button>
            </div>

          </div>

          {/* Transcript Box with full Roman Urdu welcome message */}
          {showTranscript && (
            <div className="mt-5 pt-5 border-t border-[#33353a] bg-[#14151a] p-5 rounded-2xl border border-[#33353a]/80 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 text-[#8781ff] flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold text-[#44dfab]">
                      Mascot Roman Urdu Introduction Transcript
                    </span>
                    <p className="text-xs sm:text-sm text-[#e2e2e9] whitespace-pre-line leading-relaxed">
                      {ROBOT_WELCOME_TEXT}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTranscript(false)}
                  className="text-[#918fa1] hover:text-[#e2e2e9] p-1"
                >
                  ✕
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onOpenRobotModal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#8781ff] text-[#1c0091] font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Interact with Robot Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className="px-3.5 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#44dfab] text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Stop Audio' : 'Sunne ke liye Play karein'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
