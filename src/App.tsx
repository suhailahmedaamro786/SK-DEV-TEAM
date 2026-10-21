/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bot, MessageCircle, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectSpecModal } from './components/ProjectSpecModal';
import { ServicesSection } from './components/ServicesSection';
import { ClientTestimonials } from './components/ClientTestimonials';
import { TechStackSection } from './components/TechStackSection';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';
import { RobotAssistant } from './components/RobotAssistant';
import { AdminPortal } from './components/AdminPortal';
import { ProjectItem, ServiceItem, PackageTier } from './types';
import { PROJECTS_DATA } from './data/projectsData';

const MASCOT_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKYcY3DnyZ1LBqZKfn2XRSkhozk7tk4nbX8ckd9ujfdi2i_6tZjc1HLhGN5LvTm6xhk4fFRbe2LlvB-_fku7ItaFyV264fwwqBG7K_2mHGOm6KR1XBK7cgEv6d79P7lA3F4bH1vfTUwuleOMe3Ips7-pz5mIUW3k28b2qLMizijJUDti5fKGPiD2SwoMwd4ec63Z5iiaqT-hKEz9I93v2c4yrB3VwCcJbcYdfjKdI4RZJ8XHjEnmUO';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'services' | 'admin' | 'contact'>('home');
  const [isRobotOpen, setIsRobotOpen] = useState(false);
  const [activeSpecProject, setActiveSpecProject] = useState<ProjectItem | null>(null);

  // Form pre-fill states
  const [inquiryService, setInquiryService] = useState<string>('');
  const [inquiryPackage, setInquiryPackage] = useState<PackageTier>('Small');
  const [inquiryFeatures, setInquiryFeatures] = useState<string>('');
  const [inquiryBudget, setInquiryBudget] = useState<string>('');

  const handleStartProject = () => {
    setCurrentView('home');
    setTimeout(() => {
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string, packageTier?: PackageTier) => {
    setInquiryService(serviceTitle);
    if (packageTier) setInquiryPackage(packageTier);
    setCurrentView('home');
    setTimeout(() => {
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleBuildSimilarProject = (projectName: string) => {
    setInquiryFeatures(`Similar architecture & UX to ${projectName}`);
    setCurrentView('home');
    setTimeout(() => {
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleAskRobotAboutService = (service: ServiceItem) => {
    setIsRobotOpen(true);
  };

  const handleOpenProjectDemo = (projectId: string) => {
    const found = PROJECTS_DATA.find(p => p.id === projectId);
    if (found) {
      setActiveSpecProject(found);
    }
  };

  const handleSwitchSpecProject = (projectId: string) => {
    const found = PROJECTS_DATA.find(p => p.id === projectId);
    if (found) {
      setActiveSpecProject(found);
    }
  };

  // If in admin view, render Admin Management Console
  if (currentView === 'admin') {
    return <AdminPortal onBackToSite={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#111318] text-[#e2e2e9] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#8781ff] selection:text-[#1c0091]">
      
      {/* Navigation Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'contact') {
            document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenRobot={() => setIsRobotOpen(true)}
        onStartProject={handleStartProject}
      />

      {/* Main View Router */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'home' && (
          <div className="flex flex-col w-full">
            <HeroSection
              onStartProject={handleStartProject}
              onExploreProjects={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentView('projects');
              }}
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentView('services');
              }}
              onOpenRobotModal={() => setIsRobotOpen(true)}
            />

            <ProjectsSection
              onOpenSpec={(proj) => setActiveSpecProject(proj)}
              onBuildSimilar={handleBuildSimilarProject}
            />

            <ClientTestimonials />

            <ServicesSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
              onAskRobot={handleAskRobotAboutService}
            />

            <TechStackSection />

            <InquiryForm
              initialService={inquiryService}
              initialPackage={inquiryPackage}
              initialFeatures={inquiryFeatures}
              initialBudget={inquiryBudget}
            />
          </div>
        )}

        {currentView === 'projects' && (
          <div className="flex flex-col w-full">
            <ProjectsSection
              onOpenSpec={(proj) => setActiveSpecProject(proj)}
              onBuildSimilar={handleBuildSimilarProject}
            />
            <ClientTestimonials />
            <InquiryForm
              initialService={inquiryService}
              initialPackage={inquiryPackage}
              initialFeatures={inquiryFeatures}
              initialBudget={inquiryBudget}
            />
          </div>
        )}

        {currentView === 'services' && (
          <div className="flex flex-col w-full">
            <ServicesSection
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
              onAskRobot={handleAskRobotAboutService}
            />
            <InquiryForm
              initialService={inquiryService}
              initialPackage={inquiryPackage}
              initialFeatures={inquiryFeatures}
              initialBudget={inquiryBudget}
            />
          </div>
        )}

        {currentView === 'contact' && (
          <div className="flex flex-col w-full py-10">
            <InquiryForm
              initialService={inquiryService}
              initialPackage={inquiryPackage}
              initialFeatures={inquiryFeatures}
              initialBudget={inquiryBudget}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRobot={() => setIsRobotOpen(true)}
        onStartProject={handleStartProject}
      />

      {/* FLOATING CUTE ROBOT ASSISTANT LAUNCHER (Always Accessible Everywhere) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Helper tooltip */}
        <div className="hidden md:flex flex-col items-end pointer-events-none">
          <span className="px-3 py-1.5 rounded-xl bg-[#1e1f25]/95 backdrop-blur-md border border-[#8781ff]/40 text-xs font-semibold text-[#e2e2e9] shadow-xl flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#44dfab]" />
            <span>Roman Urdu Guide Robot</span>
          </span>
        </div>

        {/* Floating Mascot Button */}
        <button
          type="button"
          onClick={() => setIsRobotOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#1e1f25] border-2 border-[#8781ff] shadow-[0_4px_28px_rgba(112,103,255,0.45)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Open SK DEV TEAM AI Guide Robot"
        >
          <img
            src={MASCOT_IMG}
            alt="AI Robot Assistant"
            className="w-full h-full object-cover"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#44dfab] border-2 border-[#111318] animate-ping" />
        </button>
      </div>

      {/* FLOATING WHATSAPP BUTTON (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-30">
        <a
          href="https://wa.me/923153558383"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1e1f25]/95 backdrop-blur-md border border-[#44dfab]/40 text-[#44dfab] shadow-xl hover:bg-[#282a2f] hover:scale-105 transition-all text-xs font-bold"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">+92 315 3558383</span>
        </a>
      </div>

      {/* FULL ROBOT ASSISTANT MODAL */}
      <RobotAssistant
        isOpen={isRobotOpen}
        onClose={() => setIsRobotOpen(false)}
        onSelectServiceForInquiry={handleSelectServiceForInquiry}
        onOpenProjectDemo={handleOpenProjectDemo}
      />

      {/* PROJECT SPEC MODAL */}
      <ProjectSpecModal
        project={activeSpecProject}
        onClose={() => setActiveSpecProject(null)}
        onSelectProjectForInquiry={handleBuildSimilarProject}
        onSwitchProject={handleSwitchSpecProject}
      />

    </div>
  );
}
