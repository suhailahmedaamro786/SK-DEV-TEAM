import { ServiceItem } from '../types';

export const SERVICES_CATALOGUE: ServiceItem[] = [
  {
    id: 'business-website',
    title: 'Business Website Development',
    icon: 'language',
    badge: 'Core Online Presence',
    summary: 'Ultra-fast, responsive corporate websites engineered for brand authority, lead generation, and effortless updates.',
    romanUrduIntro: 'A business website aap ke business ka online office hoti hai. Is par clients aap ki services, business information, photos aur contact details dekh sakte hain.',
    whoNeedsIt: 'Chhoti, darmiyani aur bari companies, professional firms, consultants, real estate agencies aur clinics jo market mein apni digital pehchan mazboot banana chahte hain.',
    problemSolved: 'Agar aap ki online website nahi hai to clients aap par jaldi trust nahi karte. Business website aap ke business ko 24/7 credible aur easily reachable banati hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Basic Online Presence',
        features: [
          'Simple, professional aur fully mobile-responsive website',
          'Single Home page ya compact landing page structure',
          'About us aur services information section (agreed scope ke mutabiq)',
          'Complete business contact information',
          'Direct WhatsApp chat contact button',
          'Basic page titles aur fundamental SEO meta setup',
          'Basic deployment assistance (Vercel / Netlify / Hosting)'
        ],
        suitableFor: 'New startups, local businesses aur consultants jinhein foran ek simple aur clean online presence chahiye.',
        quotationRequirements: 'Page count aur content scope discussion ke baad confirm hota hai. Additional pages alag quotation mein aate hain.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Growing Business Website',
        features: [
          'Multiple dedicated pages (Home, About, Services, Contact, Blog/Team)',
          'Zyada customized modern visual design',
          'Detailed services showcase ya product catalogue preview',
          'Interactive contact aur business inquiry form',
          'WhatsApp integration with customized pre-filled message',
          'Enhanced on-page SEO (headings, meta descriptions, image alt tags)',
          'Smooth animations aur modern interactive UI elements',
          'Analytics ya Google conversion tracking setup (agar required ho)'
        ],
        suitableFor: 'Growing businesses aur agencies jo apni services ko detail mein show karke leads capture karna chahte hain.',
        quotationRequirements: 'Content drafting, specific custom graphics aur multiple language support separately quote hoti hain.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Business Presence',
        features: [
          'Highly customized, bespoke page designs with unique visual identity',
          'Large page & structured content architecture',
          'Advanced multi-step lead capture workflows',
          'Custom third-party integrations (CRM, newsletter, booking links)',
          'Top-tier Core Web Vitals optimization aur speed performance',
          'Comprehensive SEO structure (schema markup, sitemaps, open-graph)',
          'Advanced conversion tracking aur telemetry analytics',
          'Agreed post-launch maintenance & dedicated support (quotation ke mutabiq)'
        ],
        suitableFor: 'Established enterprises, corporate organizations aur brands jinhein top-tier design aur high conversion system chahiye.',
        quotationRequirements: 'Ongoing monthly retainer ya complex CRM workflows scope review ke baad quote kiye jaate hain.'
      }
    },
    optionalAddons: [
      'Multi-language English/Urdu switch',
      'Custom interactive calculators or price estimators',
      'CMS / Blog publishing dashboard',
      'Custom corporate email setup'
    ],
    quotationNotice: 'Page counts aur custom integrations project scope discussion ke baad confirm hote hain.',
    relevantProjectIds: ['sk-portfolio', 'sk-builder']
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio & Personal Website',
    icon: 'palette',
    badge: 'Personal Branding',
    summary: 'Showcase your creative work, skills, and client proof with high-conviction visual design and fast load speeds.',
    romanUrduIntro: 'Portfolio website aap ke personal career, skills aur previous projects ka live showroom hai. Is par prospective clients ya employers aap ka real proof-of-work dekh sakte hain.',
    whoNeedsIt: 'Developers, designers, freelancers, consultants, photographers, agencies, students aur professionals jo apna personal brand elevate karna chahte hain.',
    problemSolved: 'Simple PDF resume se client impress nahi hota. Ek live interactive portfolio aap ke actual caliber aur execution speed ko prove karta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Basic Personal Brand',
        features: [
          'Personal introduction & bio banner',
          'Skills matrix aur core competencies section',
          'Selected projects showcase cards with external links',
          'Direct contact details, social links aur WhatsApp button',
          'Fully responsive clean layout'
        ],
        suitableFor: 'Students, junior developers aur freelancers jo apna pehla live portfolio launch karna chahte hain.',
        quotationRequirements: 'Projects count limited to agreed items in initial scope.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Professional Freelancer / Agency',
        features: [
          'Multiple categorized portfolio sections',
          'Detailed interactive project cards with live demo buttons & GitHub links',
          'Client testimonials section (agar genuine testimonials provide kiye gaye hon)',
          'Interactive contact form aur smooth animated transitions',
          'On-page SEO aur speed optimization'
        ],
        suitableFor: 'Active freelancers aur senior professionals jo high-ticket international clients close karna chahte hain.',
        quotationRequirements: 'Client testimonials verified hone chahiye, fake testimonials nahi add kiye jaate.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Interactive Showcase',
        features: [
          'High-end bespoke portfolio presentation with rich dark/light UI',
          'Dynamic project filtering by technology & category, plus search bar',
          'CMS or editable content option (agar separately configure kiya jaye)',
          'Deep case studies, interactive project galleries aur modal spec viewers',
          'Custom micro-interactions, resume download tracking aur analytics'
        ],
        suitableFor: 'Elite creative agencies, technical directors aur high-profile consultants.',
        quotationRequirements: 'Backend CMS setup aur custom animations client requirements ke mutabiq quote hotay hain.'
      }
    },
    optionalAddons: [
      'Headless CMS integration for dynamic blog posts',
      'PDF Resume generator or instant download tracker',
      'Calendly / Google Calendar booking embed',
      'Video interview or case study showcase reel'
    ],
    quotationNotice: 'Custom CMS integration aur case study writing separately quote kiye jaate hain.',
    relevantProjectIds: ['sk-portfolio']
  },
  {
    id: 'ecommerce-website',
    title: 'E-commerce Website',
    icon: 'shopping_bag',
    badge: 'Digital Commerce',
    summary: 'Full-featured online stores engineered with responsive catalogues, cart state, secure checkouts, and order routing.',
    romanUrduIntro: 'E-commerce website aap ki online dukan hoti hai jahan customers aap ki products browse karte hain, cart mein add karte hain aur order place karte hain.',
    whoNeedsIt: 'Retail businesses, fashion brands, electronics sellers, grocery stores, homemade food brands aur manufacturers jo direct-to-consumer sell karna chahte hain.',
    problemSolved: 'Manual WhatsApp par har dafa pictures aur prices bhejna thaka dene wala kaam hai. E-commerce store catalogue aur orders ko automate kar deta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Starter Product Catalogue',
        features: [
          'Organized product catalogue with high-res photos, titles & prices',
          'Categorized product listings',
          'Direct WhatsApp order or inquiry button on each product',
          'Basic cart-like selection (agar agreed scope mein shamil ho)',
          'Clean, mobile-optimized responsive layout'
        ],
        suitableFor: 'Local vendors aur home businesses jinhein foran online product catalogue launch karni ho.',
        quotationRequirements: 'Online payments aur automatic backend database is package mein shamil nahi hoti.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Standard Online Store',
        features: [
          'Expanded product catalogue with search aur category filters',
          'Full shopping cart & checkout flow (chosen architecture ke mutabiq)',
          'Customer order entry form with delivery address fields',
          'Clear order summary with subtotal, tax/delivery calculation',
          'Admin product management panel (agar scope mein shamil ho)',
          'Order-status workflow (agar backend agreed ho)'
        ],
        suitableFor: 'Established retail shops aur D2C brands jinhein regular order pipeline automate karni ho.',
        quotationRequirements: 'Payment gateway integration aur server database configuration separately confirm hoti hai.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise Commerce Platform',
        features: [
          'Advanced multi-category shopping experience with instant search',
          'Customer accounts & login system (agar required ho)',
          'Advanced inventory & order management backend workflows',
          'Real payment gateway integration (Stripe / Bank / JazzCash / EasyPaisa agar approved ho)',
          'Discount coupons, sales reporting dashboards aur email alerts',
          'Role-based admin access aur strict database security hardening'
        ],
        suitableFor: 'High-volume e-commerce brands aur multi-vendor or multi-branch retail businesses.',
        quotationRequirements: 'Payment gateway approvals, merchant merchant account credentials aur third-party transaction fees client ki responsibility hoti hain.'
      }
    },
    optionalAddons: [
      'Stripe / Local Payment Gateway API integration',
      'Inventory barcode / SKU tracking',
      'Automated SMS / Email receipt dispatch',
      'Courier API integration (Trax, PostEx, Leopard, etc.)'
    ],
    quotationNotice: 'Online payments, customer accounts, inventory management aur complex admin systems har package mein automatically included nahi hotay; inhein specific scope ke mutabiq quote kiya jata hai.',
    relevantProjectIds: ['d-pizza']
  },
  {
    id: 'whatsapp-ordering',
    title: 'WhatsApp Ordering System',
    icon: 'chat',
    badge: 'Quick Conversions',
    summary: 'Frictionless food and retail ordering where visitors fill a cart and send formatted orders directly to your WhatsApp.',
    romanUrduIntro: 'Customer aap ki website par products ya food menu select karta hai, delivery details enter karta hai, aur single click par pura formatted order aap ke WhatsApp number par bhej deta hai.',
    whoNeedsIt: 'Restaurants, cafes, cloud kitchens, bakeries, clothing boutiques aur local vendors jahan customer WhatsApp par rabta karna prefer karta hai.',
    problemSolved: 'Customer ko menu ki list type karne ki zaroorat nahi rehti; items, quantities aur delivery location ek clean message ban kar seedha WhatsApp par pohonchti hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Basic Menu & WhatsApp Dispatch',
        features: [
          'Clean digital menu or product grid',
          'Simple product selection',
          'Customer name & contact phone fields',
          'Basic order summary',
          'Instant WhatsApp dispatch button with pre-formatted message'
        ],
        suitableFor: 'Chhotay food points, single-item businesses aur home kitchens.',
        quotationRequirements: 'Limited menu items. Custom multi-variant choices is package mein basic rehti hain.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Smart Ordering & Cart Control',
        features: [
          'Product categories (Burgers, Drinks, Deals, etc.) aur instant search',
          'Advanced cart with quantity increment/decrement controls',
          'Complete customer delivery details (Address, Area, Special Instructions)',
          'Automatic order total calculation with delivery charges',
          'Smart WhatsApp message generated dynamically from actual cart',
          'Optimized mobile ordering experience with bottom floating cart'
        ],
        suitableFor: 'Popular restaurants, pizza shops, delivery kitchens aur boutiques.',
        quotationRequirements: 'Custom addon choices (extra cheese, sauces) discussion ke baad add hoti hain.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Multi-Branch Ordering',
        features: [
          'Comprehensive catalogue with rich item customizers and variants',
          'Custom order workflows (Delivery vs Takeaway vs Dine-in selection)',
          'Multiple branch / location selector with branch-specific WhatsApp routing',
          'Optional admin order management / receipts if backend agreed',
          'Sales telemetry and daily order export reports (agar scope mein shamil ho)'
        ],
        suitableFor: 'Multi-branch food chains aur large retail businesses.',
        quotationRequirements: 'Remember: WhatsApp par order bhejna aur database-backed centralized management system do alag cheezein hain. Backend database ke liye alag module configure hota hai.'
      }
    },
    optionalAddons: [
      'Multi-branch WhatsApp phone number router',
      'Delivery radius / area fee calculator',
      'Automated thermal print receipt formatting',
      'Promo codes / discounts calculation'
    ],
    quotationNotice: 'WhatsApp par order dispatch hona ek client-side convenience hai; centralized live database order tracking ke liye backend system quote kiya jata hai.',
    relevantProjectIds: ['d-pizza']
  },
  {
    id: 'school-management',
    title: 'School & Education Management System',
    icon: 'school',
    badge: 'Institutional LMS',
    summary: 'Academic governance engines featuring student registries, role-based dashboards, attendance tracking, and syllabus distribution.',
    romanUrduIntro: 'Education Management System school, college ya academy ki daily operations jaise admission, fee records, attendance aur student reports ko organize karne ka software hai.',
    whoNeedsIt: 'Schools, colleges, coaching centres, academies, tuition hubs aur online courses provide karne wale institutes.',
    problemSolved: 'Kaghzi registers aur bikhri hui Excel sheets mein data kho jata hai. Centralized LMS tamam records ko aik jaga secure karta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'School Information Portal',
        features: [
          'Modern school presentation website',
          'Classes, courses & campus information',
          'Faculty & staff directory (provided data ke mutabiq)',
          'Online admission inquiry form',
          'Direct contact details, location map & WhatsApp inquiry button'
        ],
        suitableFor: 'Schools jinhein pehle ek professional online presence aur admission inquiries collect karni hon.',
        quotationRequirements: 'Is package mein live student database nahi hota, sirf inquiry form hota hai.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'LMS Core & Student Records',
        features: [
          'Student records database & admission management workflow',
          'Teacher portal & student directory access (agar backend configured ho)',
          'Attendance tracking module (agar agreed ho)',
          'Admin dashboard for school operations overview',
          'Academic reports appropriate to implemented modules'
        ],
        suitableFor: 'Private schools aur academies jo manual register se digital record system par switch hona chahti hain.',
        quotationRequirements: 'Database hosting aur specific operational modules scope discussion ke baad finalize hotay hain.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Complete Academic ERP Suite',
        features: [
          'Expanded institutional management modules',
          'Strict role-based access for Admin, Principal, Teachers, Students & Parents',
          'Comprehensive attendance, grading book, exam schedules & student report cards',
          'Student ID cards generation or QR code workflows (agar implemented ho)',
          'Document repository, notifications & fee voucher tracking (agar configured ho)',
          'Custom school-specific operational workflows & integrations'
        ],
        suitableFor: 'Large school campuses, college networks aur progressive education groups.',
        quotationRequirements: 'Bina working configured backend ke full system nahi chalta; quotation mein server, backup aur maintenance clearly define hotay hain.'
      }
    },
    optionalAddons: [
      'Fee slip PDF generator with barcode',
      'Parent SMS notification gateway integration',
      'Online quiz & assignment submission portal',
      'Library & asset tracking module'
    ],
    quotationNotice: 'Hum clearly batate hain ke school system working backend ke baghair operational nahi hota; quotation mein exact modules confirm kiye jaate hain.',
    relevantProjectIds: ['education-hub', 'dccid']
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Internal Tools',
    icon: 'dashboard_customize',
    badge: 'Operational Command',
    summary: 'Operational consoles, live KPI visualizers, role-based controls, inventory monitors, and exportable data tables.',
    romanUrduIntro: 'Admin Dashboard aap ke business ka control room hota hai jahan aap metrics, users, orders, revenue aur system data ko live manage aur monitor kar sakte hain.',
    whoNeedsIt: 'Business owners, operations managers, SaaS companies, logistics firms aur organizations jo apne data par real-time control chahte hain.',
    problemSolved: 'Bikhre hue WhatsApp messages aur spreadsheets se business ki real performance samajh nahi aati. Dashboard sab kuch visual aur actionable banata hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Essential Dashboard Overview',
        features: [
          'Clean dashboard home view with key KPI summary cards',
          'Simple structured data tables',
          'Essential sidebar / header navigation',
          'Fully responsive modern desktop and tablet layout',
          'Mock data rendering ya single API connection'
        ],
        suitableFor: 'MVPs, internal monitoring of a single workflow aur prototype demonstrations.',
        quotationRequirements: 'Authentication aur live database connection basic scope ke mutabiq decide hoti hai.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Multi-Section Data Console',
        features: [
          'Multiple dashboard operational sections (Users, Orders, Analytics, Settings)',
          'Live table search, column filters, and pagination',
          'Data entry & update forms with frontend validation',
          'Interactive charts and KPI performance graphs (real data supported)',
          'Authentication & session security (agar configured ho)'
        ],
        suitableFor: 'Mid-sized businesses jo daily sales, clients ya internal task distribution manage karna chahti hain.',
        quotationRequirements: 'Real database (PostgreSQL, Supabase, Firebase) setup ki requirement hoti hai.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise Control Platform',
        features: [
          'Advanced multi-role permissions (Super Admin, Manager, Operator, Viewer)',
          'Complex data workflows with bulk actions and real-time socket updates',
          'Export to CSV, Excel, and PDF reports',
          'Audit trail logs and action history (agar implemented ho)',
          'Third-party API integrations (Payment gateways, CRM, Cloud services)',
          'Strict operational controls, rate limiting and encryption standards'
        ],
        suitableFor: 'Scale-ups, enterprise logistics, fintech dashboards aur mission-critical platforms.',
        quotationRequirements: 'Data sources, API access aur security protocols client ki requirements ke mutabiq quote hotay hain.'
      }
    },
    optionalAddons: [
      'Real-time WebSocket data synchronization',
      'Automated scheduled report emails',
      'Dark / Light theme switch for staff ergonomics',
      'Role-based permission editor'
    ],
    quotationNotice: 'Dashboard ko real business data par run karne ke liye backend data source aur access permissions ki zaroorat hoti hai.',
    relevantProjectIds: ['dccid', 'education-hub']
  },
  {
    id: 'custom-web-apps',
    title: 'Custom Web Applications',
    icon: 'extension',
    badge: 'Bespoke Software',
    summary: 'Tailored software architectures built from the ground up for unique business logic, SaaS models, and specialized workflows.',
    romanUrduIntro: 'Custom web application aisi software hoti hai jo aap ki unique business zarooriyat ke mutabiq specifically zero se banayi jati hai.',
    whoNeedsIt: 'Tech founders, innovative startups, logistics companies, healthcare providers aur specialized businesses jin ka kaam standard templates se nahi chalta.',
    problemSolved: 'Ready-made off-the-shelf software aap ke specific process par fit nahi hoti aur monthly mehengi subscriptions leti hai. Custom app aap ka apna asset hoti hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Single Core MVP Workflow',
        features: [
          'One clearly defined primary core workflow',
          'Essential intuitive screens and navigation',
          'Clean input forms with validation',
          'Modern responsive UI layout',
          'Agreed Minimum Viable Product (MVP) deployment'
        ],
        suitableFor: 'Proof-of-concept testing, client pitches aur targeted utility tools.',
        quotationRequirements: 'Scope strictly limited to 1 primary feature loop.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Multi-Module Web Application',
        features: [
          'Multiple connected user workflows',
          'Additional supporting modules & settings',
          'Data persistence through an agreed backend (SQL / NoSQL)',
          'Secure user authentication & account handling (agar required ho)',
          'Search, filtering, and data management',
          'Integration with approved third-party services'
        ],
        suitableFor: 'Growing commercial SaaS products aur business automation web apps.',
        quotationRequirements: 'Database architecture aur external API availability verify karke final quote tayar hoti hai.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise SaaS & System Architecture',
        features: [
          'Complex multi-tiered business logic and multi-tenant architectures',
          'Multiple user roles, permissions and team workspaces',
          'Advanced API integrations and webhook dispatch systems',
          'Reporting, analytics exports, and background data queues',
          'Comprehensive error handling, automated testing within agreed scope',
          'Production cloud deployment, documentation, and handoff'
        ],
        suitableFor: 'High-scale commercial platforms, B2B SaaS platforms aur venture-backed software.',
        quotationRequirements: 'Pehle client ka problem statement aur architecture design review kiya jata hai.'
      }
    },
    optionalAddons: [
      'Multi-tenant workspace isolation',
      'Subscription billing with Stripe / Paddle',
      'Real-time collaborative features',
      'Mobile PWA installability'
    ],
    quotationNotice: 'Hum pehle pochte hain ke client kaun sa masla hal karna chahta hai, phir exact package aur timeline suggest karte hain.',
    relevantProjectIds: ['ai-booking', 'education-hub', 'dccid']
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking System',
    icon: 'calendar_month',
    badge: 'Scheduling Engine',
    summary: 'Frictionless scheduling engines for clinics, salons, and consultants with calendar sync, availability checks, and reminders.',
    romanUrduIntro: 'Appointment booking system se clients aap ki available dates aur time slots dekh kar direct online booking kar sakte hain.',
    whoNeedsIt: 'Doctors, dental clinics, beauty salons, lawyers, legal advisors, fitness trainers aur coaching consultants.',
    problemSolved: 'Phone calls aur manual calendar notes mein double-booking ho jati hai ya appointments miss ho jati hain. Online scheduling sab organize kar deta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Service Request Intake',
        features: [
          'Service list with descriptions and durations',
          'Contact & appointment request submission form',
          'Preferred date and time selection fields',
          'Direct WhatsApp ya email dispatch option',
          'Clean responsive booking UI'
        ],
        suitableFor: 'Solo consultants aur clinics jo appointment requests WhatsApp ya email par receive karna chahte hain.',
        quotationRequirements: 'Is package mein real-time calendar availability check nahi hota, request notification hoti hai.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Managed Appointment System',
        features: [
          'Persistent appointment records (agar backend configure kiya jaye)',
          'Admin appointment management console (accept, reschedule, cancel)',
          'Clear booking-status workflow',
          'Email notifications for booking confirmations (agar configured ho)',
          'Basic calendar view where implemented'
        ],
        suitableFor: 'Busy clinics aur service offices jinhein daily appointments schedule manage karni ho.',
        quotationRequirements: 'Email SMTP server aur database configuration scope mein decide hoti hai.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Autonomous Scheduling Platform',
        features: [
          'Advanced scheduling rules, buffer times, and holiday blocking',
          'Multiple staff members or service categories selection',
          'Live availability checks (agar backend calendar API sync supported ho)',
          'Automated SMS / WhatsApp reminders (agar third-party provider configured ho)',
          'Deposit / advance payment collection options if agreed',
          'Role-based administration and operational reports'
        ],
        suitableFor: 'Multi-doctor healthcare clinics, salon chains aur premium consultancy firms.',
        quotationRequirements: 'Real-time calendar sync aur automatic SMS reminders third-party APIs par depend karte hain jinka separate usage cost hota hai.'
      }
    },
    optionalAddons: [
      'Google Calendar / Outlook two-way sync',
      'SMS reminder gateway integration',
      'Advance deposit checkout pipeline',
      'Staff specific calendar management'
    ],
    quotationNotice: 'Real-time availability aur automatic reminders sirf tab promise kiye jaate hain jab unka backend aur third-party API setup quote mein agreed ho.',
    relevantProjectIds: ['ai-booking']
  },
  {
    id: 'ai-assistants',
    title: 'AI Assistants & Chatbots',
    icon: 'smart_toy',
    badge: 'Intelligent Automation',
    summary: 'Intelligent conversational agents, lead qualification assistants, and knowledge retrieval bots tailored for your business.',
    romanUrduIntro: 'AI Assistant ya Chatbot aap ki website par aane wale visitors se guftagu karta hai, un ke sawalat ke jawabat deta hai aur leads collect karta hai.',
    whoNeedsIt: 'Customer service businesses, e-commerce stores, B2B agencies, educational institutes aur tech platforms.',
    problemSolved: 'Har waqt staff available nahi hota. AI assistant 24/7 ghanton instant jawabat de kar potential client ko engage rakhta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'FAQ-Style Interactive Assistant',
        features: [
          'Predefined questions & answers knowledge engine',
          'Interactive guided company service explanation',
          'Direct contact routing and quick action buttons',
          'Zero-cost browser execution (no paid external AI subscription required)'
        ],
        suitableFor: 'Websites jinhein standard customer questions aur service orientation automate karni ho.',
        quotationRequirements: 'No external LLM API cost. Completely reliable browser-based assistant.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Guided Sales & Inquiry Assistant',
        features: [
          'Advanced conversational logic and intent matching',
          'Detailed service & package breakdowns in Roman Urdu / English',
          'Context-aware lead capture form guidance',
          'Connected knowledge base or custom API integration (agar configured ho)',
          'Modern sleek chat UI with voice synthesis audio option'
        ],
        suitableFor: 'Businesses jo visitors ko qualify karke accurate project applications collect karna chahte hain.',
        quotationRequirements: 'External AI API keys or custom endpoints separate quote ke mutabiq configure hotay hain.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Autonomous Enterprise AI Agent',
        features: [
          'Bespoke AI workflows tailored to business data',
          'External tool calling & database query integrations',
          'Document retrieval / RAG knowledge base (agar configured ho)',
          'Seamless escalation to human WhatsApp / CRM team',
          'Conversation analytics, feedback logs, and continuous tuning'
        ],
        suitableFor: 'Enterprises jo deep automation aur real-time data lookups implement karna chahte hain.',
        quotationRequirements: 'Live AI model tokens aur external hosting ke usage costs separate hotay hain; hum client ko transparently guide karte hain.'
      }
    },
    optionalAddons: [
      'Voice synthesis / audio playback in browser',
      'Multi-language English and Roman Urdu toggle',
      'CRM lead auto-forwarding',
      'Custom vector database for private documents'
    ],
    quotationNotice: 'Predefined browser assistant aur live LLM API agent mein farq hota hai; live AI model usage aur API tokens ke alag costs hotay hain.',
    relevantProjectIds: ['ai-booking']
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    icon: 'settings_suggest',
    badge: 'Process Acceleration',
    summary: 'Eliminate repetitive manual tasks with webhook pipelines, database synchronization, notifications, and custom scripts.',
    romanUrduIntro: 'Business automation aap ke roz marra ke repetitive kaamon (jaise form data transfer, notification bhejna, record update karna) ko automatic bana deti hai.',
    whoNeedsIt: 'Businesses jo ghanton data entry aur manual follow-ups mein barbad karte hain aur apna operational waqt bachana chahte hain.',
    problemSolved: 'Insani ghaltiyan (human errors) aur delay khatam ho jata hai; system automatically seconds mein task perform karta hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Single Task Automation',
        features: [
          'One clearly defined repetitive workflow automated',
          'Simple form-to-email or form-to-notification dispatch',
          'Basic data transfer between supported channels'
        ],
        suitableFor: 'Single landing page alerts aur direct email/WhatsApp routing.',
        quotationRequirements: 'Limited to 1 trigger and 1 action point.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Multi-Step Connected Automation',
        features: [
          'Multi-step operational data pipelines',
          'Data validation, cleaning and conditional logic',
          'Notification dispatch across multiple channels',
          'Integration with approved tools (Google Sheets, CRM, Webhooks)'
        ],
        suitableFor: 'Companies jo customer inquiry aane par CRM update, email notify aur team alert aik sath chahti hain.',
        quotationRequirements: 'Third-party API accounts client provide karta hai.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise Orchestration Engine',
        features: [
          'Complex multi-system business orchestration',
          'Multiple approved platform integrations',
          'Robust error handling, fallback retries & monitoring alerts',
          'Advanced permission controls and execution history logs',
          'Extensive testing, documentation, and handoff support'
        ],
        suitableFor: 'Logistics pipelines, multi-platform inventory syncing aur financial reporting.',
        quotationRequirements: 'System access aur API limits analyze karne ke baad precise quotation di jati hai.'
      }
    },
    optionalAddons: [
      'Webhook listener for third-party systems',
      'Automated PDF invoice generation',
      'Slack / Discord / Telegram team bots',
      'Scheduled cron job batch processors'
    ],
    quotationNotice: 'Automation client ke pass maujood systems aur unki APIs par depend karti hai; pehle exact workflow confirm kiya jata hai.',
    relevantProjectIds: ['ai-booking', 'dccid']
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages & Campaign Websites',
    icon: 'rocket_launch',
    badge: 'High Conversion',
    summary: 'Single-page conversion engines designed for paid ad campaigns, product launches, event registrations, and fast leads.',
    romanUrduIntro: 'Landing page ek aisi single-page website hoti hai jo kisi specific marketing campaign ya product launch ke liye banayi jati hai taake visitor seedha action le.',
    whoNeedsIt: 'Course creators, event organizers, product launchers, real estate projects aur digital marketers jo Google / Facebook ads chala rahe hain.',
    problemSolved: 'Normal website par visitor bhatak jata hai. Landing page par sirf ek clear goal hota hai: lead dena ya buy karna.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Single-Focused Landing Page',
        features: [
          'One focused high-impact landing page',
          'Compelling headline, benefits grid, and clear Call to Action (CTA)',
          'Direct contact or WhatsApp lead button',
          'Mobile-responsive fast-loading layout'
        ],
        suitableFor: 'Fast promo launches, simple service offers aur quick ad tests.',
        quotationRequirements: 'Client copy and images provided.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Lead-Capture Campaign Page',
        features: [
          'Multiple custom storytelling sections (Hero, Problem, Solution, Proof, FAQ)',
          'Interactive lead capture form with instant validation',
          'Client-supplied testimonials & proof showcase',
          'Enhanced visual effects, micro-animations & on-page SEO',
          'Ad campaign tracking scripts (Meta Pixel / Google Tag Manager agar configured ho)'
        ],
        suitableFor: 'Active ad spenders jo maximum lead conversion rate chahte hain.',
        quotationRequirements: 'Ad tracking IDs client ko provide karni hoti hain.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Multi-Variant Funnel Experience',
        features: [
          'Multiple campaign page variants or targeted funnel flow',
          'Advanced conversion-focused layouts with high-end copywriting assistance',
          'Complete analytics and event telemetry setup',
          'Additional qualification forms and custom routing workflows',
          'In-depth performance optimization for sub-second ad load speed'
        ],
        suitableFor: 'High-budget commercial marketing campaigns aur multi-tier offers.',
        quotationRequirements: 'A/B testing tools aur external marketing software separate hotay hain.'
      }
    },
    optionalAddons: [
      'Meta Pixel & Google Ads Conversion tracking setup',
      'Exit-intent lead capture modal',
      'Countdown offer timer',
      'Direct WhatsApp click tracking'
    ],
    quotationNotice: 'Ad setup aur media spend client ka hota hai; SK DEV TEAM high-conversion web engineering provide karti hai.',
    relevantProjectIds: ['sk-builder', 'd-pizza']
  },
  {
    id: 'seo-optimization',
    title: 'SEO & Website Optimization',
    icon: 'search',
    badge: 'Organic Search',
    summary: 'Technical and on-page search engine optimization, meta structuring, speed enhancements, and indexing preparation.',
    romanUrduIntro: 'SEO aap ki website ko Google aur search engines par behtar position par dikhane aur organic visitors lane ka technical amal hai.',
    whoNeedsIt: 'Har business jo Google search se genuine clients aur customers attract karna chahta hai bina har click ke paise diye.',
    problemSolved: 'Agar website Google par index hi nahi hogi ya slow hogi to koi client use dhund nahi sakega.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Foundation On-Page Setup',
        features: [
          'Accurate page titles and meta descriptions optimization',
          'Semantic HTML heading structure (H1, H2, H3)',
          'Image alt attributes for search crawler accessibility',
          'Basic XML sitemap & robots.txt configuration',
          'Google Search Console indexing readiness checks'
        ],
        suitableFor: 'New websites jinhein initial search indexing theek karwani ho.',
        quotationRequirements: 'Guaranteed 1st position claim hum nahi karte, genuine best practices enforce karte hain.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Technical & Content SEO',
        features: [
          'Expanded on-page SEO across all primary website sections',
          'Internal linking and keyword-aligned content hierarchy',
          'Technical SEO audit and broken link fixes',
          'Schema.org structured data (Organization, LocalBusiness, Breadcrumb)',
          'Mobile usability and Core Web Vitals speed improvements'
        ],
        suitableFor: 'Established businesses jo local competition ko beat karna chahte hain.',
        quotationRequirements: 'Ongoing link building is package mein shamil nahi hoti.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Comprehensive SEO & Speed Audit',
        features: [
          'In-depth technical SEO architecture audit',
          'Advanced rich snippet structured data & canonical setup',
          'Content & page optimization roadmap',
          'Speed performance optimization for sub-second Lighthouse scores',
          'Ongoing monthly SEO retaining arrangements (sirf agreed contract ke tehat)'
        ],
        suitableFor: 'Corporate brands aur e-commerce sites jin ke liye organic search primary revenue stream hai.',
        quotationRequirements: 'Google ranking competition, time, content quality aur indexing par depend karti hai; koi fake guarantee nahi di jati.'
      }
    },
    optionalAddons: [
      'Google My Business local profile optimization guidance',
      'Schema JSON-LD for products / FAQs',
      'Image WebP compression pipeline',
      'Competitor SEO keyword audit report'
    ],
    quotationNotice: 'Hum kabhi bhi first-place Google ranking ki fake guarantee nahi dete; rankings content, competition aur time par depend karti hain.',
    relevantProjectIds: ['sk-portfolio']
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance & Improvements',
    icon: 'build',
    badge: 'Stability & Upgrades',
    summary: 'Proactive security patches, library updates, content iterations, speed audits, and bug fixes to keep your platforms solid.',
    romanUrduIntro: 'Website banne ke baad use up-to-date rakhna, bugs fix karna, naya content add karna aur speed theek rakhna maintenance kehlata hai.',
    whoNeedsIt: 'Businesses jin ki live website chal rahi hai aur unhein technical issue aane par foran expert support chahiye hoti hai.',
    problemSolved: 'Outdated libraries crash ho sakti hain ya website slow ho jati hai. Regular maintenance site ko safe aur active rakhti hai.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Minor Fixes & Updates Batch',
        features: [
          'Clearly defined batch of minor content updates (text, contact, photos)',
          'Agreed minor bug fixes or alignment issues',
          'Basic SSL and broken link checks'
        ],
        suitableFor: 'Chhoti websites jinhein month mein aik ya do dafa chhotay updates chahiye hotay hain.',
        quotationRequirements: 'Limited to agreed batch of tasks.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Active Maintenance & UI Polish',
        features: [
          'More extensive monthly updates and section improvements',
          'UI adjustments and mobile responsiveness refinements',
          'Core Web Vitals and speed performance audits',
          'Additional bug fixes and defined operational support window'
        ],
        suitableFor: 'Growing commercial websites jin par regular promotions aur content changes aati hain.',
        quotationRequirements: 'Hours and scope defined in the maintenance agreement.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Dedicated SLA & Retainer Support',
        features: [
          'Substantial ongoing maintenance and continuous enhancement retainer',
          'Planned feature additions and new module rollouts',
          'Uptime monitoring, security audits & backup workflows (where configured)',
          'Defined priority response times in the SLA agreement',
          'Dedicated senior developer consultation hours'
        ],
        suitableFor: 'Mission-critical web platforms, portals aur enterprise applications.',
        quotationRequirements: 'Free unlimited maintenance ka promise nahi kiya jata; clear terms contract mein hoti hain.'
      }
    },
    optionalAddons: [
      '24/7 automated uptime monitor alerts',
      'Database scheduled cloud backup',
      'Monthly performance audit report',
      'Priority emergency hotline support'
    ],
    quotationNotice: 'Free ya unlimited maintenance ka waada nahi kiya jata; har maintenance arrangement defined scope aur agreed terms par hoti hai.',
    relevantProjectIds: ['sk-portfolio', 'dccid']
  }
];
