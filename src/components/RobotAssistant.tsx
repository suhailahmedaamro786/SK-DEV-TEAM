import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Volume2, Square, RotateCcw, X, Send, 
  HelpCircle, Sparkles, MessageCircle, Mail, Layers, 
  ExternalLink, CheckCircle2, ChevronRight, ArrowRight,
  ShieldAlert, Compass, DollarSign, Briefcase
} from 'lucide-react';
import { SERVICES_CATALOGUE } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { 
  ROBOT_WELCOME_TEXT, 
  ROBOT_CONTACT_SCRIPT, 
  ROBOT_PRIMARY_ACTIONS, 
  ROBOT_PACKAGE_COMPARISON_GENERAL, 
  ROBOT_PRICING_POLICY_TEXT,
  ROBOT_FAQS,
  ROBOT_WIZARD_STEPS
} from '../data/robotDialogue';
import { ServiceItem, PackageTier, QuickAction } from '../types';

interface RobotAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceForInquiry?: (serviceId: string, packageTier?: PackageTier) => void;
  onOpenProjectDemo?: (projectId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'robot' | 'user';
  text: string;
  serviceDetail?: ServiceItem;
  selectedTier?: PackageTier;
  quickActions?: QuickAction[];
  isWizardStep?: number;
  wizardChoices?: Record<number, string>;
}

const MASCOT_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKYcY3DnyZ1LBqZKfn2XRSkhozk7tk4nbX8ckd9ujfdi2i_6tZjc1HLhGN5LvTm6xhk4fFRbe2LlvB-_fku7ItaFyV264fwwqBG7K_2mHGOm6KR1XBK7cgEv6d79P7lA3F4bH1vfTUwuleOMe3Ips7-pz5mIUW3k28b2qLMizijJUDti5fKGPiD2SwoMwd4ec63Z5iiaqT-hKEz9I93v2c4yrB3VwCcJbcYdfjKdI4RZJ8XHjEnmUO';
const MASCOT_FALLBACK = '/assets/aistudio/Image_1_3714ee34.png';

export const RobotAssistant: React.FC<RobotAssistantProps> = ({
  isOpen,
  onClose,
  onSelectServiceForInquiry,
  onOpenProjectDemo
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechText, setActiveSpeechText] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'services' | 'packages' | 'wizard'>('chat');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPackageTier, setSelectedPackageTier] = useState<PackageTier>('Small');
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState<Record<number, string>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize with the exact welcome message on first open
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'robot',
          text: ROBOT_WELCOME_TEXT,
          quickActions: ROBOT_PRIMARY_ACTIONS
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // Stop speaking when closed or unmounted
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
    return () => {
      stopSpeaking();
    };
  }, [isOpen]);

  // Speech synthesis management
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    stopSpeaking();

    // Clean text of emojis and markdown for speech clarity
    const cleanedText = text
      .replace(/[#*_`~>•]/g, ' ')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick best English or regional voice if present
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
      v.lang.includes('ur') || 
      v.lang.includes('hi') || 
      (v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setActiveSpeechText(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeechText('');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeechText('');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveSpeechText('');
  };

  const replayLastSpeech = () => {
    if (activeSpeechText) {
      speakText(activeSpeechText);
    } else if (messages.length > 0) {
      const lastRobotMsg = [...messages].reverse().find(m => m.sender === 'robot');
      if (lastRobotMsg) {
        speakText(lastRobotMsg.text);
      }
    }
  };

  // User sends text
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Generate intelligent Roman Urdu reply
    setTimeout(() => {
      respondToQuery(query);
    }, 300);
  };

  const respondToQuery = (query: string) => {
    const q = query.toLowerCase();

    // 1. Check for service keywords
    const matchedService = SERVICES_CATALOGUE.find(s => 
      q.includes(s.title.toLowerCase()) ||
      q.includes(s.id.toLowerCase()) ||
      (s.id === 'ecommerce-website' && (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('store') || q.includes('shop') || q.includes('dukan'))) ||
      (s.id === 'whatsapp-ordering' && (q.includes('whatsapp') && (q.includes('order') || q.includes('food') || q.includes('menu')))) ||
      (s.id === 'school-management' && (q.includes('school') || q.includes('education') || q.includes('college') || q.includes('lms') || q.includes('student'))) ||
      (s.id === 'admin-dashboards' && (q.includes('admin') || q.includes('dashboard') || q.includes('crm') || q.includes('panel'))) ||
      (s.id === 'appointment-booking' && (q.includes('appointment') || q.includes('booking') || q.includes('doctor') || q.includes('clinic') || q.includes('schedule'))) ||
      (s.id === 'ai-assistants' && (q.includes('ai') || q.includes('bot') || q.includes('assistant') || q.includes('chatbot'))) ||
      (s.id === 'business-website' && (q.includes('business') || q.includes('corporate') || q.includes('company'))) ||
      (s.id === 'portfolio-website' && (q.includes('portfolio') || q.includes('cv') || q.includes('resume') || q.includes('personal')))
    );

    if (matchedService) {
      const replyText = `🛠️ **${matchedService.title}**:\n\n${matchedService.romanUrduIntro}\n\n👥 **Kisko chahiye:** ${matchedService.whoNeedsIt}\n\n💡 **Masla jo hal hota hai:** ${matchedService.problemSolved}\n\nAap is ke Small, Medium ya Premium packages ka muwazna dekhna chahte hain?`;
      
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: replyText,
          serviceDetail: matchedService,
          quickActions: [
            { label: '🔹 Small Package', actionKey: 'show_service_tier', payload: { service: matchedService, tier: 'Small' } },
            { label: '🔸 Medium Package', actionKey: 'show_service_tier', payload: { service: matchedService, tier: 'Medium' } },
            { label: '💎 Premium Package', actionKey: 'show_service_tier', payload: { service: matchedService, tier: 'Premium' } },
            { label: '📝 Apply for this Project', actionKey: 'apply_service', payload: { service: matchedService } },
            { label: '💬 Discuss on WhatsApp', actionKey: 'open_whatsapp_for_service', payload: { service: matchedService } }
          ]
        }
      ]);
      return;
    }

    // 2. Check for package comparison questions
    if (q.includes('package') || q.includes('small') || q.includes('medium') || q.includes('premium') || q.includes('farq') || q.includes('difference')) {
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: ROBOT_PACKAGE_COMPARISON_GENERAL,
          quickActions: [
            { label: '🧭 Help Me Choose (Wizard)', actionKey: 'start_wizard' },
            { label: '💰 Pricing Guide', actionKey: 'explain_pricing_policy' },
            { label: '🛠️ View All 13 Services', actionKey: 'show_all_services' },
            { label: '📝 Submit Application', actionKey: 'go_to_form' }
          ]
        }
      ]);
      return;
    }

    // 3. Check for price / cost questions
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('charges') || q.includes('paise') || q.includes('paisa') || q.includes('budget') || q.includes('kitne')) {
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: `“Aap ki requirements ke mutabiq quotation tayar ki jayegi.”\n\n${ROBOT_PRICING_POLICY_TEXT}`,
          quickActions: [
            { label: '📝 Submit Application Form', actionKey: 'go_to_form' },
            { label: '💬 Ask Team on WhatsApp', actionKey: 'open_whatsapp' },
            { label: '📦 Compare Packages', actionKey: 'explain_packages_general' }
          ]
        }
      ]);
      return;
    }

    // 4. Check for domain / hosting
    if (q.includes('domain') || q.includes('hosting') || q.includes('server')) {
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: `🌐 **Domain & Hosting Information:**\n\nStandard development packages mein domain aur hosting automatically included nahi hotay, jab tak agreement mein explicitly shamil na hon.\n\nLekin hamari team aap ke liye reliable platform (Vercel, Cloudflare, Netlify ya VPS) par deployment complete karke deti hai aur domain DNS setup mein poori guide karti hai.`,
          quickActions: [
            { label: '💬 Discuss Deployment on WhatsApp', actionKey: 'open_whatsapp' },
            { label: '📝 Submit Project Scope', actionKey: 'go_to_form' }
          ]
        }
      ]);
      return;
    }

    // 5. Check for demo / portfolio
    if (q.includes('demo') || q.includes('project') || q.includes('example') || q.includes('sample') || q.includes('previous work')) {
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: `💼 **SK DEV TEAM Verified Production Demos:**\n\nAap hamari 6 verified live applications test kar sakte hain:\n\n1. **SK DEV TEAM Portfolio**: suhailahmedaamro.vercel.app\n2. **D-Pizza Storefront & Ordering**: d-pizza.shop\n3. **Education Hub (LMS)**: education-hub-dusky.vercel.app\n4. **DCCID Institutional Platform**: dccid-79522kcag-aamrosk519-3847s-projects.vercel.app\n5. **AI Appointment Booking Agent**: ai-appointment-booking-agent-omega.vercel.app\n6. **SK Builder Platform**: sk-conding.vercel.app\n\nAap kisi bhi demo par click karke uski complete architecture aur stack dekh sakte hain!`,
          quickActions: [
            { label: '🍕 D-Pizza Demo', actionKey: 'open_project', payload: 'd-pizza' },
            { label: '🎓 Education Hub Demo', actionKey: 'open_project', payload: 'education-hub' },
            { label: '🤖 AI Booking Agent Demo', actionKey: 'open_project', payload: 'ai-booking' },
            { label: '🏢 DCCID Portal Demo', actionKey: 'open_project', payload: 'dccid' },
            { label: '🏗️ SK Builder Demo', actionKey: 'open_project', payload: 'sk-builder' }
          ]
        }
      ]);
      return;
    }

    // 6. Check for contact / rabta
    if (q.includes('contact') || q.includes('rabta') || q.includes('number') || q.includes('phone') || q.includes('email') || q.includes('whatsapp')) {
      setMessages(prev => [
        ...prev,
        {
          id: `robot-${Date.now()}`,
          sender: 'robot',
          text: ROBOT_CONTACT_SCRIPT,
          quickActions: [
            { label: '💬 WhatsApp (+92 315 3558383)', actionKey: 'open_whatsapp' },
            { label: '📩 Email (suhailahmedaamro786@gmail.com)', actionKey: 'open_email' },
            { label: '📝 Submit Application Form', actionKey: 'go_to_form' }
          ]
        }
      ]);
      return;
    }

    // Fallback: polite response adhering to rule "Never invent prices, discounts, features; if it does not know, tell how to contact the team"
    setMessages(prev => [
      ...prev,
      {
        id: `robot-${Date.now()}`,
        sender: 'robot',
        text: `Aap ka sawal note kar liya gaya hai! 🤝\n\nHum ghair-tasdeeq shuda ya man-maani information invent nahi karte. Aap ke is specific sawal par accurate guide karne ke liye hamare lead engineer, Suhail Ahmed aur team available hain.\n\nAap WhatsApp (+92 315 3558383) par direct pooch sakte hain, ya application form submit kar sakte hain:`,
        quickActions: [
          { label: '💬 WhatsApp Par Poochein', actionKey: 'open_whatsapp' },
          { label: '📝 Application Form Fill Karein', actionKey: 'go_to_form' },
          { label: '🛠️ All Services Dekhein', actionKey: 'show_all_services' },
          { label: '📦 Packages Compare Karein', actionKey: 'explain_packages_general' }
        ]
      }
    ]);
  };

  // Quick Action Click Handler
  const handleActionClick = (action: QuickAction) => {
    switch (action.actionKey) {
      case 'show_all_services':
        setActiveTab('services');
        break;

      case 'explain_packages_general':
        setActiveTab('packages');
        setMessages(prev => [
          ...prev,
          {
            id: `robot-${Date.now()}`,
            sender: 'robot',
            text: ROBOT_PACKAGE_COMPARISON_GENERAL,
            quickActions: [
              { label: '🧭 Help Me Choose (Wizard)', actionKey: 'start_wizard' },
              { label: '🛠️ View 13 Services', actionKey: 'show_all_services' },
              { label: '📝 Submit Application Form', actionKey: 'go_to_form' }
            ]
          }
        ]);
        break;

      case 'explain_pricing_policy':
        setMessages(prev => [
          ...prev,
          {
            id: `robot-${Date.now()}`,
            sender: 'robot',
            text: ROBOT_PRICING_POLICY_TEXT,
            quickActions: [
              { label: '📝 Submit Application Form', actionKey: 'go_to_form' },
              { label: '💬 Chat on WhatsApp', actionKey: 'open_whatsapp' }
            ]
          }
        ]);
        break;

      case 'show_demos':
        respondToQuery('demos');
        break;

      case 'start_wizard':
        setActiveTab('wizard');
        setWizardStep(1);
        setWizardAnswers({});
        break;

      case 'go_to_form':
        onClose();
        const inquirySection = document.getElementById('inquiry');
        inquirySection?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'open_whatsapp':
        window.open('https://wa.me/923153558383?text=Assalam-o-Alaikum%20SK%20DEV%20TEAM!%20Main%20apne%20project%20par%20baat%20karna%20chahta%20hoon.', '_blank');
        break;

      case 'open_email':
        window.location.href = 'mailto:suhailahmedaamro786@gmail.com?subject=Project%20Inquiry%20-%20SK%20DEV%20TEAM';
        break;

      case 'show_service_tier':
        if (action.payload) {
          const { service, tier } = action.payload;
          const pkg = tier === 'Small' ? service.packages.small : tier === 'Medium' ? service.packages.medium : service.packages.premium;
          const msgText = `📦 **${service.title} — ${pkg.name}**\n*${pkg.subtitle}*\n\n✅ **Features shamil hain:**\n${pkg.features.map((f: string) => `• ${f}`).join('\n')}\n\n🎯 **Kiske liye best hai:** ${pkg.suitableFor}\n\n📌 **Quotation Note:** ${pkg.quotationRequirements || 'Agreed scope ke mutabiq.'}`;
          
          setMessages(prev => [
            ...prev,
            {
              id: `robot-${Date.now()}`,
              sender: 'robot',
              text: msgText,
              serviceHighlight: service.id,
              packageHighlight: tier,
              quickActions: [
                { label: `📝 Select ${tier} in Form`, actionKey: 'apply_service_tier', payload: { service, tier } },
                { label: '💬 Discuss on WhatsApp', actionKey: 'open_whatsapp_for_service', payload: { service, tier } },
                { label: '📦 Compare other packages', actionKey: 'explain_packages_general' }
              ]
            }
          ]);
        }
        break;

      case 'apply_service':
        if (action.payload?.service) {
          onSelectServiceForInquiry?.(action.payload.service.title, 'Small');
          onClose();
        }
        break;

      case 'apply_service_tier':
        if (action.payload?.service) {
          onSelectServiceForInquiry?.(action.payload.service.title, action.payload.tier);
          onClose();
        }
        break;

      case 'open_whatsapp_for_service':
        if (action.payload?.service) {
          const sName = action.payload.service.title;
          const tier = action.payload.tier || 'Small';
          const msg = encodeURIComponent(`Assalam-o-Alaikum SK DEV TEAM! Main aap ki service "${sName}" ke ${tier} package ke baare mein quotation aur timeline lena chahta hoon.`);
          window.open(`https://wa.me/923153558383?text=${msg}`, '_blank');
        }
        break;

      case 'open_project':
        if (action.payload && onOpenProjectDemo) {
          onOpenProjectDemo(action.payload);
        }
        break;

      default:
        break;
    }
  };

  // Wizard Option Selection
  const handleWizardSelect = (stepId: number, value: string) => {
    const updated = { ...wizardAnswers, [stepId]: value };
    setWizardAnswers(updated);

    if (stepId < ROBOT_WIZARD_STEPS.length) {
      setWizardStep(stepId + 1);
    } else {
      // Completed wizard!
      const projectType = updated[1] || 'Business Website';
      const features = updated[2] || 'Basic';
      const packageTier = (updated[3] || 'Small') as PackageTier;
      const budget = updated[4] || 'To be discussed';
      const nextStep = updated[5] || 'form';

      const summaryText = `🎉 **Mubarak ho! Aap ki requirements record ho gayi hain:**\n\n📌 **Project Type:** ${projectType}\n⚙️ **Core Features:** ${features}\n📦 **Recommended Package:** ${packageTier}\n💰 **Estimated Budget:** ${budget}\n\nAb agla step chunien:`;

      setMessages(prev => [
        ...prev,
        {
          id: `wizard-finish-${Date.now()}`,
          sender: 'robot',
          text: summaryText,
          quickActions: [
            { 
              label: '📝 Transfer to Inquiry Form', 
              actionKey: 'apply_wizard_to_form',
              payload: { projectType, packageTier, features, budget } 
            },
            { 
              label: '💬 Send Answers to WhatsApp', 
              actionKey: 'send_wizard_to_whatsapp',
              payload: { projectType, packageTier, features, budget } 
            }
          ]
        }
      ]);
      setActiveTab('chat');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0c0e13]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl h-[88vh] max-h-[820px] bg-[#1a1b21] border border-[#33353a] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* TOP BAR / HEADER */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#1e1f25] border-b border-[#33353a] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#282a2f] border border-[#8781ff]/30 shadow-inner flex-shrink-0">
              <img 
                src={MASCOT_IMG} 
                alt="SK DEV TEAM AI Robot Mascot" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = MASCOT_FALLBACK;
                }}
              />
              <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-[#1e1f25] ${isSpeaking ? 'bg-[#44dfab] animate-ping' : 'bg-[#44dfab]'}`} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#e2e2e9] text-sm sm:text-base tracking-tight">
                  SK Core Sales Robot
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#44dfab]/15 text-[#44dfab] border border-[#44dfab]/30">
                  Roman Urdu Guide
                </span>
              </div>
              <span className="text-xs text-[#918fa1] flex items-center gap-1">
                {isSpeaking ? (
                  <span className="text-[#44dfab] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#44dfab] animate-pulse" />
                    Bol raha hoon... (Voice Active)
                  </span>
                ) : (
                  'Online · Verified Services & Pricing Guide'
                )}
              </span>
            </div>
          </div>

          {/* Top Audio Controls & Exit */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isSpeaking ? (
              <button
                type="button"
                onClick={() => replayLastSpeech()}
                className="px-2.5 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] hover:text-[#e2e2e9] text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Sunne ke liye click karein"
              >
                <Volume2 className="w-4 h-4 text-[#8781ff]" />
                <span className="hidden sm:inline">Play Voice</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopSpeaking}
                className="px-2.5 py-1.5 rounded-lg bg-[#93000a]/30 hover:bg-[#93000a]/50 text-[#ffb4ab] text-xs font-medium flex items-center gap-1.5 transition-colors border border-[#ffb4ab]/30"
                title="Awaaz band karein"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#918fa1] hover:text-[#e2e2e9] flex items-center justify-center transition-colors ml-1"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="px-4 sm:px-6 bg-[#18191f] border-b border-[#33353a] flex items-center gap-2 overflow-x-auto scrollbar-none flex-shrink-0 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`py-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Assistant Chat</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`py-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>13 Services Catalogue</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`py-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-[#8781ff] text-[#c4c0ff]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Small / Med / Prem</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('wizard');
              setWizardStep(1);
            }}
            className={`py-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wizard'
                ? 'border-[#44dfab] text-[#44dfab]'
                : 'border-transparent text-[#918fa1] hover:text-[#e2e2e9]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#44dfab]" />
            <span>Help Me Choose</span>
          </button>
        </div>

        {/* TAB BODY 1: CHAT INTERFACE */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#14151a]">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'robot' && (
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#282a2f] border border-[#8781ff]/40 flex-shrink-0 mt-1">
                      <img src={MASCOT_IMG} alt="Robot" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#8781ff] text-[#1c0091] font-medium ml-auto'
                        : 'bg-[#1e1f25] text-[#e2e2e9] border border-[#33353a]'
                    }`}
                  >
                    <div className="whitespace-pre-line prose-invert text-xs sm:text-sm">
                      {msg.text}
                    </div>

                    {/* Quick Action Buttons inside message */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-[#33353a]/60 flex flex-wrap gap-2">
                        {msg.quickActions.map((qa, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleActionClick(qa)}
                            className="px-3 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] hover:text-white text-xs font-medium border border-[#464555]/40 transition-colors flex items-center gap-1 active:scale-95"
                          >
                            <span>{qa.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-[#18191f] border-t border-[#33353a]/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] text-[#918fa1] uppercase font-semibold whitespace-nowrap">
                Poochhein:
              </span>
              {ROBOT_FAQS.map((faq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const userMsg: ChatMessage = {
                      id: `user-${Date.now()}`,
                      sender: 'user',
                      text: faq.question
                    };
                    setMessages(prev => [
                      ...prev,
                      userMsg,
                      {
                        id: `robot-${Date.now() + 1}`,
                        sender: 'robot',
                        text: faq.answer,
                        quickActions: [
                          { label: '📝 Submit Application', actionKey: 'go_to_form' },
                          { label: '💬 WhatsApp Contact', actionKey: 'open_whatsapp' }
                        ]
                      }
                    ]);
                  }}
                  className="px-2.5 py-1 rounded-full bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs whitespace-nowrap border border-[#33353a] transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 bg-[#1e1f25] border-t border-[#33353a] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Roman Urdu ya English mein sawal likhein (e.g., E-commerce price, School system, Small package...)"
                className="flex-1 h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/60 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="h-11 px-4 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] disabled:opacity-40 text-[#1c0091] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md flex-shrink-0"
              >
                <span>Bhejein</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB BODY 2: 13 SERVICES CATALOGUE */}
        {activeTab === 'services' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#14151a]">
            {/* Service list sidebar */}
            <div className="w-full md:w-72 bg-[#18191f] border-r border-[#33353a] overflow-y-auto p-3 space-y-1.5 flex-shrink-0 max-h-[35vh] md:max-h-full">
              <span className="text-xs uppercase font-bold text-[#918fa1] px-2 block mb-2">
                13 Certified Services
              </span>
              {SERVICES_CATALOGUE.map((s) => {
                const isSelected = (selectedService?.id || SERVICES_CATALOGUE[0].id) === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(s);
                      setSelectedPackageTier('Small');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs sm:text-sm ${
                      isSelected
                        ? 'bg-[#282a2f] text-[#c4c0ff] font-semibold border border-[#8781ff]/40 shadow-sm'
                        : 'text-[#c7c4d8] hover:bg-[#282a2f]/50 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{s.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 flex-shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Service detail view */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
              {(() => {
                const cur = selectedService || SERVICES_CATALOGUE[0];
                const curPkg = selectedPackageTier === 'Small' 
                  ? cur.packages.small 
                  : selectedPackageTier === 'Medium' 
                  ? cur.packages.medium 
                  : cur.packages.premium;

                return (
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#33353a]">
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#8781ff]/20 text-[#c4c0ff]">
                          {cur.badge}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#e2e2e9] mt-1">
                          {cur.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          speakText(`${cur.title}. ${cur.romanUrduIntro}`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-[#8781ff]" />
                        <span>Sunein (Listen)</span>
                      </button>
                    </div>

                    {/* Roman Urdu Explanation */}
                    <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a]/60 space-y-2">
                      <span className="text-xs uppercase font-bold text-[#44dfab]">
                        Roman Urdu Wazahat:
                      </span>
                      <p className="text-sm text-[#e2e2e9] leading-relaxed">
                        “{cur.romanUrduIntro}”
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#282a2f]/60">
                          <span className="text-[#918fa1] block font-semibold mb-0.5">👥 Kisko Chahiye:</span>
                          <span className="text-[#c7c4d8]">{cur.whoNeedsIt}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#282a2f]/60">
                          <span className="text-[#918fa1] block font-semibold mb-0.5">💡 Problem Solved:</span>
                          <span className="text-[#c7c4d8]">{cur.problemSolved}</span>
                        </div>
                      </div>
                    </div>

                    {/* Small / Medium / Premium Tier Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-bold text-[#918fa1]">
                          Package Options for this Service:
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Small', 'Medium', 'Premium'] as PackageTier[]).map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setSelectedPackageTier(tier)}
                            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                              selectedPackageTier === tier
                                ? 'bg-[#8781ff] text-[#1c0091] border-[#8781ff] shadow-md'
                                : 'bg-[#1e1f25] text-[#918fa1] border-[#33353a] hover:text-white hover:bg-[#282a2f]'
                            }`}
                          >
                            {tier} Package
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Package Features Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#1e1f25] border border-[#8781ff]/30 shadow-lg space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <h4 className="text-base font-bold text-[#e2e2e9]">
                            {curPkg.name} — <span className="text-[#c4c0ff]">{curPkg.subtitle}</span>
                          </h4>
                          <p className="text-xs text-[#918fa1] mt-0.5">
                            Target: {curPkg.suitableFor}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-semibold text-[#918fa1] uppercase">Features included:</span>
                        <ul className="space-y-1.5">
                          {curPkg.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#e2e2e9]">
                              <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {curPkg.quotationRequirements && (
                        <div className="p-3 rounded-lg bg-[#282a2f]/80 text-xs text-[#918fa1] flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-[#8781ff] flex-shrink-0 mt-0.5" />
                          <span>{curPkg.quotationRequirements}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-[#33353a] flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectServiceForInquiry?.(cur.title, selectedPackageTier);
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
                        >
                          <span>Apply for {cur.title} ({selectedPackageTier})</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <a
                          href={`https://wa.me/923153558383?text=${encodeURIComponent(`Assalam-o-Alaikum SK DEV TEAM! Main aap ki service "${cur.title}" (${selectedPackageTier} Package) par quotation aur discussion karna chahta hoon.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#44dfab] font-medium text-xs sm:text-sm transition-all border border-[#44dfab]/30 flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Discuss on WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Optional Addons */}
                    <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a]/60 space-y-2">
                      <span className="text-xs uppercase font-bold text-[#c4c0ff]">
                        Optional Add-ons (Requires Specific Scope Quote):
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#c7c4d8]">
                        {cur.optionalAddons.map((addon, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8781ff]" />
                            <span>{addon}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-[#918fa1] italic pt-1">
                        Notice: {cur.quotationNotice}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB BODY 3: GENERAL PACKAGE COMPARISON */}
        {activeTab === 'packages' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#14151a]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#33353a]">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#e2e2e9]">
                  Small vs. Medium vs. Premium Comparison
                </h3>
                <p className="text-xs sm:text-sm text-[#918fa1]">
                  Aap ki requirements aur scale ke mutabiq behtareen package ka intikhab
                </p>
              </div>
              <button
                type="button"
                onClick={() => speakText(ROBOT_PACKAGE_COMPARISON_GENERAL)}
                className="px-3 py-1.5 rounded-lg bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                <Volume2 className="w-4 h-4 text-[#8781ff]" />
                <span>Audio Summary</span>
              </button>
            </div>

            {/* 3 Columns Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Small */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1e1f25] border border-[#33353a] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#8781ff]/20 text-[#c4c0ff]">
                      Starter / MVP
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#e2e2e9] mt-2">Small Package</h4>
                  <p className="text-xs text-[#918fa1] mt-1">
                    Basic online presence aur limited scope ke liye ideal.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-[#c7c4d8]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Compact single-page ya basic structure</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Mobile-responsive clean layout</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Direct WhatsApp contact button</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Basic SEO titles & deployment setup</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#33353a]">
                  <span className="text-[11px] text-[#918fa1] block mb-2">Quotation scope review ke baad.</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectServiceForInquiry?.('General Web Project', 'Small');
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] text-xs font-semibold transition-colors"
                  >
                    Select Small in Form
                  </button>
                </div>
              </div>

              {/* Medium */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1e1f25] border-2 border-[#8781ff]/60 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#44dfab]/20 text-[#44dfab]">
                      Most Popular
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#e2e2e9] mt-2">Medium Package</h4>
                  <p className="text-xs text-[#918fa1] mt-1">
                    Growing businesses ke liye jinhein dynamic features aur leads chahiye.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-[#c7c4d8]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Multiple pages (Home, About, Services, Contact)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Interactive lead capture form & WhatsApp router</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Dynamic catalogue / shopping cart controls</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Enhanced on-page SEO & smooth animations</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Backend database records (agar agreed ho)</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#33353a]">
                  <span className="text-[11px] text-[#918fa1] block mb-2">High conversion balance.</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectServiceForInquiry?.('General Web Project', 'Medium');
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] text-xs font-bold transition-all shadow-md"
                  >
                    Select Medium in Form
                  </button>
                </div>
              </div>

              {/* Premium */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1e1f25] border border-[#33353a] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#c4c0ff]/20 text-[#c4c0ff]">
                      Enterprise Scale
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#e2e2e9] mt-2">Premium Package</h4>
                  <p className="text-xs text-[#918fa1] mt-1">
                    Customized enterprise workflows aur advanced integrations ke liye.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-[#c7c4d8]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Bespoke custom architecture & visual identity</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Multi-role admin/client authorization</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Payment gateway (Stripe) & API integrations</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Top-tier speed & Core Web Vitals optimization</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#44dfab] flex-shrink-0 mt-0.5" />
                      <span>Dedicated support & maintenance agreement</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#33353a]">
                  <span className="text-[11px] text-[#918fa1] block mb-2">Mission-critical deployment.</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectServiceForInquiry?.('General Web Project', 'Premium');
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#c4c0ff] text-xs font-semibold transition-colors"
                  >
                    Select Premium in Form
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing transparency note */}
            <div className="p-4 rounded-xl bg-[#1e1f25] border border-[#33353a] space-y-2">
              <span className="text-xs uppercase font-bold text-[#44dfab] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Verified Pricing Rules
              </span>
              <p className="text-xs sm:text-sm text-[#c7c4d8] leading-relaxed">
                “Final package aur quotation aap ki exact requirements, page counts aur integrations dekh kar decide hota hai. Hum bina scope samjhe ghalat ya fabricated prices nahi batate.”
              </p>
            </div>
          </div>
        )}

        {/* TAB BODY 4: GUIDED QUESTIONNAIRE (WIZARD) */}
        {activeTab === 'wizard' && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#14151a]">
            <div className="pb-4 border-b border-[#33353a] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#44dfab] uppercase">
                  Step {wizardStep} of {ROBOT_WIZARD_STEPS.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#e2e2e9] mt-0.5">
                  Requirements Discovery Wizard
                </h3>
              </div>
              <span className="text-xs text-[#918fa1]">
                Quick 1-Minute Helper
              </span>
            </div>

            {(() => {
              const currentStepData = ROBOT_WIZARD_STEPS.find(s => s.id === wizardStep) || ROBOT_WIZARD_STEPS[0];
              return (
                <div className="max-w-2xl mx-auto space-y-6 pt-2">
                  <div className="p-4 rounded-2xl bg-[#1e1f25] border border-[#8781ff]/40 shadow-md">
                    <p className="text-base sm:text-lg font-bold text-[#e2e2e9]">
                      {currentStepData.question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStepData.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleWizardSelect(wizardStep, opt.value)}
                        className="p-3.5 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] border border-[#33353a] hover:border-[#8781ff] text-left transition-all duration-200 flex items-center justify-between group"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[#e2e2e9] group-hover:text-[#c4c0ff]">
                          {opt.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#918fa1] group-hover:text-[#8781ff] transition-transform group-hover:translate-x-1 flex-shrink-0" />
                      </button>
                    ))}
                  </div>

                  {/* Wizard navigation footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#33353a]">
                    <button
                      type="button"
                      disabled={wizardStep === 1}
                      onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 rounded-lg bg-[#282a2f] text-xs font-medium text-[#918fa1] hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Peechhe (Back)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('chat');
                      }}
                      className="text-xs text-[#918fa1] hover:text-[#e2e2e9] underline"
                    >
                      Skip to Chat
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* BOTTOM QUICK STATUS STRIP */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#18191f] border-t border-[#33353a] flex flex-wrap items-center justify-between gap-2 text-xs text-[#918fa1]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#44dfab]" />
            <span className="font-mono text-[#c7c4d8]">SK DEV TEAM — High-Conviction Digital Craftsmanship</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/923153558383" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#44dfab] hover:underline flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>+92 315 3558383</span>
            </a>
            <a 
              href="mailto:suhailahmedaamro786@gmail.com" 
              className="text-[#c4c0ff] hover:underline flex items-center gap-1 font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>suhailahmedaamro786@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
