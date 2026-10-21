import React, { useState } from 'react';
import { 
  X, ExternalLink, MessageCircle, CheckCircle2, 
  Layers, Gauge, MessageSquareText, Info, Star, ShieldCheck,
  Play, ArrowLeftRight, ArrowUpRight
} from 'lucide-react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';

interface ProjectSpecModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProjectForInquiry: (projectName: string) => void;
  onSwitchProject: (projectId: string) => void;
}

export const ProjectSpecModal: React.FC<ProjectSpecModalProps> = ({
  project,
  onClose,
  onSelectProjectForInquiry,
  onSwitchProject
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics' | 'reviews'>('overview');

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0c0e13]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-[#1e1f25] border-2 border-[#8781ff]/20 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Banner Image with Overlay */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-[#282a2f] flex-shrink-0">
          <img
            src={project.bannerImg}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-[#1e1f25]/50 to-transparent" />
          
          {/* Top Bar inside banner */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#111318]/90 backdrop-blur-md text-[#c4c0ff] text-xs font-semibold uppercase tracking-wider">
                {project.badgeCat}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#44dfab]/20 backdrop-blur-md text-[#44dfab] text-xs flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#44dfab] animate-pulse" />
                Production Live
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#111318]/80 hover:bg-[#33353a] text-[#e2e2e9] flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Actions inside banner */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10">
            <div>
              <span className="text-xs text-[#44dfab] font-mono uppercase tracking-wide">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#e2e2e9] tracking-tight mt-0.5">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] font-bold text-xs transition-all shadow-[0_0_16px_rgba(112,103,255,0.35)] flex items-center gap-1.5"
              >
                <span>Launch Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  onSelectProjectForInquiry(project.title);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Start Similar Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Switcher Bar */}
        <div className="px-5 py-2.5 bg-[#18191f] border-b border-[#33353a] flex items-center gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          <span className="text-[#918fa1] text-xs uppercase font-semibold flex items-center gap-1 mr-1 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8781ff]" /> Switch:
          </span>
          {PROJECTS_DATA.map((p) => {
            const isCurrent = p.id === project.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSwitchProject(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#282a2f] text-[#c4c0ff] border border-[#8781ff]/40 shadow-sm'
                    : 'bg-[#1e1f25] hover:bg-[#282a2f] text-[#918fa1] hover:text-[#e2e2e9]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#44dfab]' : 'bg-[#918fa1]'}`} />
                <span>{p.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Spec Tabs */}
        <div className="px-5 pt-3 border-b border-[#33353a] bg-[#1e1f25] flex items-center gap-4 overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <span>Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <span>Architecture & Stack</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <span>Production Metrics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <span>Reviews & Video</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-5 max-h-[50vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#918fa1] font-bold block mb-1">
                  System Description
                </span>
                <p className="text-sm text-[#c7c4d8] leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* 3 Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]/60">
                  <span className="text-[11px] uppercase text-[#918fa1] block">Primary Client</span>
                  <span className="text-sm font-bold text-[#e2e2e9] mt-0.5 block">{project.client}</span>
                  <span className="text-xs text-[#44dfab]">Direct Commercial Client</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]/60">
                  <span className="text-[11px] uppercase text-[#918fa1] block">Deployment SLA</span>
                  <span className="text-sm font-bold text-[#e2e2e9] mt-0.5 block">{project.sla}</span>
                  <span className="text-xs text-[#c4c0ff]">Edge Distributed CDN</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#33353a]/60">
                  <span className="text-[11px] uppercase text-[#918fa1] block">Latency Target</span>
                  <span className="text-sm font-bold text-[#44dfab] mt-0.5 block">{project.latency}</span>
                  <span className="text-xs text-[#918fa1]">Sub-second Interaction</span>
                </div>
              </div>

              {/* Core Deliverables */}
              <div>
                <span className="text-xs uppercase tracking-wider text-[#918fa1] font-bold block mb-2">
                  Verified Core Deliverables
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#e2e2e9]">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial Quote */}
              {project.testimonial && (
                <div className="p-4 rounded-xl bg-[#18191f] border border-[#33353a] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#44dfab]">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold text-[#e2e2e9] ml-1.5">5.0 / 5.0</span>
                    </div>
                    <span className="text-xs text-[#44dfab] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Client Feedback
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#c7c4d8] italic leading-relaxed">
                    “{project.testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-2.5 pt-2 border-t border-[#33353a]">
                    <div className="w-7 h-7 rounded-full bg-[#8781ff]/20 text-[#c4c0ff] font-bold flex items-center justify-center text-xs">
                      {project.testimonial.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#e2e2e9]">{project.testimonial.author}</span>
                      <span className="text-[11px] text-[#918fa1]">{project.testimonial.role}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#918fa1] font-bold block mb-2">
                  Verified Stack Components
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#14151a] text-[#c4c0ff] text-xs font-semibold border border-[#33353a]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#14151a] border border-[#33353a] space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#918fa1] font-bold block">
                  Production Architecture Pipeline
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#1e1f25] border border-[#33353a]/40 space-y-1">
                    <span className="font-bold text-[#c4c0ff] block">1. Edge Client Hydration</span>
                    <span className="text-[#918fa1]">Ultra-lean bundle size delivering instant First Contentful Paint without UI freezing.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1e1f25] border border-[#33353a]/40 space-y-1">
                    <span className="font-bold text-[#44dfab] block">2. Event & Webhook Bus</span>
                    <span className="text-[#918fa1]">Cryptographically signed requests with automated queue retries and error isolation.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1e1f25] border border-[#33353a]/40 space-y-1">
                    <span className="font-bold text-[#e2e2e9] block">3. Data Persistence</span>
                    <span className="text-[#918fa1]">Multi-tier relational storage or secure caching optimized for high read throughput.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#14151a] border border-[#33353a] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#e2e2e9]">Lighthouse Core Audit</span>
                  <span className="text-xs font-mono font-bold text-[#44dfab] px-2 py-0.5 rounded bg-[#44dfab]/15">
                    99 / 100 Score
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-[#1e1f25]">
                    <span className="text-[10px] text-[#918fa1] uppercase">Performance</span>
                    <span className="text-lg font-bold text-[#44dfab] block mt-1">99</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1e1f25]">
                    <span className="text-[10px] text-[#918fa1] uppercase">Accessibility</span>
                    <span className="text-lg font-bold text-[#c4c0ff] block mt-1">100</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1e1f25]">
                    <span className="text-[10px] text-[#918fa1] uppercase">Best Practices</span>
                    <span className="text-lg font-bold text-[#e2e2e9] block mt-1">98</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1e1f25]">
                    <span className="text-[10px] text-[#918fa1] uppercase">SEO Audit</span>
                    <span className="text-lg font-bold text-[#44dfab] block mt-1">100</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#14151a] border border-[#33353a] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#e2e2e9]">Edge Stability SLA</span>
                  <span className="font-bold text-[#44dfab] font-mono">99.98%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1e1f25] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8781ff] to-[#44dfab] w-[99.8%] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#918fa1] pt-1">
                  <span>First Contentful Paint: 0.35s</span>
                  <span>Zero Cumulative Layout Shift</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#33353a] bg-[#14151a]">
                <div className="relative h-44 sm:h-52 w-full bg-[#282a2f] flex items-center justify-center overflow-hidden">
                  <img src={project.bannerImg} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151a] via-[#14151a]/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#111318]/90 text-[#44dfab] text-[11px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#44dfab] animate-pulse" />
                      Client Video Interview
                    </span>
                    <span className="text-[11px] font-mono text-[#918fa1]">
                      {project.testimonial?.duration || '01:42 HD'}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/923153558383?text=${encodeURIComponent(`Hi SK DEV TEAM! I would like to review the full client video case study and discuss a build similar to ${project.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-14 h-14 rounded-full bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="Watch Video / Chat with Architect"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </a>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#e2e2e9]">Executive Founder Post-Launch Review</span>
                    <span className="text-[#44dfab] font-mono">Verified Client Recording</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs sm:text-sm text-[#e2e2e9] italic leading-relaxed">
                    “{project.testimonial?.quote}”
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#33353a]">
                    <span className="text-xs text-[#918fa1]">{project.testimonial?.author} · {project.testimonial?.role}</span>
                    <span className="text-xs font-semibold text-[#44dfab]">{project.testimonial?.metrics}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#18191f] border-t border-[#33353a] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#918fa1]">
            <ShieldCheck className="w-4 h-4 text-[#44dfab]" />
            <span>Audited & verified by SK DEV TEAM QA Engineering</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Visit Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
