import { ServiceItem } from '../types';

export const SERVICES_CATALOGUE: ServiceItem[] = [
  {
    id: 'business-website',
    title: 'Business Website Development',
    icon: 'language',
    badge: 'Core Online Presence',
    summary: 'Ultra-fast, responsive corporate websites engineered for brand authority, lead generation, and effortless updates.',
    romanUrduIntro: 'A business website is your company\'s online headquarters. It presents your services, business information, images, and contact details to potential customers.',
    whoNeedsIt: 'Small, medium, and large companies, professional firms, consultants, real estate agencies, and clinics that want to strengthen their online presence.',
    problemSolved: 'Without a professional website, potential customers may find it harder to trust or contact your business. A website makes your business accessible and credible around the clock.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Basic Online Presence',
        features: [
          'Simple, professional and fully mobile-responsive website',
          'Single Home page ya compact landing page structure',
          'About us and services information section (agreed scope according to the agreed scope)',
          'Complete business contact information',
          'Direct WhatsApp chat contact button',
          'Basic page titles and fundamental SEO meta setup',
          'Basic deployment assistance (Vercel / Netlify / Hosting)'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Growing Business Website',
        features: [
          'Multiple dedicated pages (Home, About, Services, Contact, Blog/Team)',
          'Zyada customized modern visual design',
          'Detailed services showcase ya product catalogue preview',
          'Interactive contact and business inquiry form',
          'WhatsApp integration with customized pre-filled message',
          'Enhanced on-page SEO (headings, meta descriptions, image alt tags)',
          'Smooth animations and modern interactive UI elements',
          'Analytics ya Google conversion tracking setup (if required ho)'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Business Presence',
        features: [
          'Highly customized, bespoke page designs with unique visual identity',
          'Large page & structured content architecture',
          'Advanced multi-step lead capture workflows',
          'Custom third-party integrations (CRM, newsletter, booking links)',
          'Top-tier Core Web Vitals optimization and speed performance',
          'Comprehensive SEO structure (schema markup, sitemaps, open-graph)',
          'Advanced conversion tracking and telemetry analytics',
          'Agreed post-launch maintenance & dedicated support (quotation according to the agreed scope)'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Multi-language English/Urdu switch',
      'Custom interactive calculators or price estimators',
      'CMS / Blog publishing dashboard',
      'Custom corporate email setup'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['sk-portfolio', 'sk-builder']
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio & Personal Website',
    icon: 'palette',
    badge: 'Personal Branding',
    summary: 'Showcase your creative work, skills, and client proof with high-conviction visual design and fast load speeds.',
    romanUrduIntro: 'A portfolio website is a live showcase of your career, skills, and previous projects. It helps prospective clients and employers review your actual work.',
    whoNeedsIt: 'Developers, designers, freelancers, consultants, photographers, agencies, students, and professionals building a personal brand.',
    problemSolved: 'A basic PDF résumé may not fully demonstrate your abilities. An interactive portfolio presents real projects and evidence of your skills.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Basic Personal Brand',
        features: [
          'Personal introduction & bio banner',
          'Skills matrix and core competencies section',
          'Selected projects showcase cards with external links',
          'Direct contact details, social links and WhatsApp button',
          'Fully responsive clean layout'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Professional Freelancer / Agency',
        features: [
          'Multiple categorized portfolio sections',
          'Detailed interactive project cards with live demo buttons & GitHub links',
          'Client testimonials section (if genuine testimonials provide kiye gaye hon)',
          'Interactive contact form and smooth animated transitions',
          'On-page SEO and speed optimization'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Interactive Showcase',
        features: [
          'High-end bespoke portfolio presentation with rich dark/light UI',
          'Dynamic project filtering by technology & category, plus search bar',
          'CMS or editable content option (if separately configure kiya jaye)',
          'Deep case studies, interactive project galleries and modal spec viewers',
          'Custom micro-interactions, resume download tracking and analytics'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Headless CMS integration for dynamic blog posts',
      'PDF Resume generator or instant download tracker',
      'Calendly / Google Calendar booking embed',
      'Video interview or case study showcase reel'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['sk-portfolio']
  },
  {
    id: 'ecommerce-website',
    title: 'E-commerce Website',
    icon: 'shopping_bag',
    badge: 'Digital Commerce',
    summary: 'Full-featured online stores engineered with responsive catalogues, cart state, secure checkouts, and order routing.',
    romanUrduIntro: 'An e-commerce website lets customers browse products, add items to a shopping cart, and place orders online.',
    whoNeedsIt: 'Retail businesses, fashion brands, electronics sellers, grocery stores, food brands, and manufacturers selling directly to customers.',
    problemSolved: 'Managing product photos, prices, and orders manually can take time. An online store organizes product information and streamlines the ordering process.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Starter Product Catalogue',
        features: [
          'Organized product catalogue with high-res photos, titles & prices',
          'Categorized product listings',
          'Direct WhatsApp order or inquiry button on each product',
          'Basic cart-like selection (if agreed scope included in the scope ho)',
          'Clean, mobile-optimized responsive layout'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Standard Online Store',
        features: [
          'Expanded product catalogue with search and category filters',
          'Full shopping cart & checkout flow (chosen architecture according to the agreed scope)',
          'Customer order entry form with delivery address fields',
          'Clear order summary with subtotal, tax/delivery calculation',
          'Admin product management panel (if scope included in the scope ho)',
          'Order-status workflow (if backend agreed ho)'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise Commerce Platform',
        features: [
          'Advanced multi-category shopping experience with instant search',
          'Customer accounts & login system (if required ho)',
          'Advanced inventory & order management backend workflows',
          'Real payment gateway integration (Stripe / Bank / JazzCash / EasyPaisa if approved ho)',
          'Discount coupons, sales reporting dashboards and email alerts',
          'Role-based admin access and strict database security hardening'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Stripe / Local Payment Gateway API integration',
      'Inventory barcode / SKU tracking',
      'Automated SMS / Email receipt dispatch',
      'Courier API integration (Trax, PostEx, Leopard, etc.)'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['d-pizza']
  },
  {
    id: 'whatsapp-ordering',
    title: 'WhatsApp Ordering System',
    icon: 'chat',
    badge: 'Quick Conversions',
    summary: 'Frictionless food and retail ordering where visitors fill a cart and send formatted orders directly to your WhatsApp.',
    romanUrduIntro: 'Customers select products or menu items on your website, enter delivery details, and send a formatted order directly to your WhatsApp number.',
    whoNeedsIt: 'Restaurants, cafés, cloud kitchens, bakeries, clothing boutiques, and local vendors that accept orders through WhatsApp.',
    problemSolved: 'Customers do not need to type out their order manually. Items, quantities, and delivery details are organized into a message and sent to your WhatsApp.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Smart Ordering & Cart Control',
        features: [
          'Product categories (Burgers, Drinks, Deals, etc.) and instant search',
          'Advanced cart with quantity increment/decrement controls',
          'Complete customer delivery details (Address, Area, Special Instructions)',
          'Automatic order total calculation with delivery charges',
          'Smart WhatsApp message generated dynamically from actual cart',
          'Optimized mobile ordering experience with bottom floating cart'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Advanced Multi-Branch Ordering',
        features: [
          'Comprehensive catalogue with rich item customizers and variants',
          'Custom order workflows (Delivery vs Takeaway vs Dine-in selection)',
          'Multiple branch / location selector with branch-specific WhatsApp routing',
          'Optional admin order management / receipts if backend agreed',
          'Sales telemetry and daily order export reports (if scope included in the scope ho)'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Multi-branch WhatsApp phone number router',
      'Delivery radius / area fee calculator',
      'Automated thermal print receipt formatting',
      'Promo codes / discounts calculation'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['d-pizza']
  },
  {
    id: 'school-management',
    title: 'School & Education Management System',
    icon: 'school',
    badge: 'Institutional LMS',
    summary: 'Academic governance engines featuring student registries, role-based dashboards, attendance tracking, and syllabus distribution.',
    romanUrduIntro: 'An education management system helps schools, colleges, and academies organize admissions, fee records, attendance, and student reports.',
    whoNeedsIt: 'Schools, colleges, coaching centres, academies, tuition centres, and online learning providers.',
    problemSolved: 'Paper registers and scattered spreadsheets make records difficult to manage. A centralized system keeps information organized in one place.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'School Information Portal',
        features: [
          'Modern school presentation website',
          'Classes, courses & campus information',
          'Faculty & staff directory (provided data according to the agreed scope)',
          'Online admission inquiry form',
          'Direct contact details, location map & WhatsApp inquiry button'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'LMS Core & Student Records',
        features: [
          'Student records database & admission management workflow',
          'Teacher portal & student directory access (if backend configured ho)',
          'Attendance tracking module (if agreed ho)',
          'Admin dashboard for school operations overview',
          'Academic reports appropriate to implemented modules'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Complete Academic ERP Suite',
        features: [
          'Expanded institutional management modules',
          'Strict role-based access for Admin, Principal, Teachers, Students & Parents',
          'Comprehensive attendance, grading book, exam schedules & student report cards',
          'Student ID cards generation or QR code workflows (if implemented ho)',
          'Document repository, notifications & fee voucher tracking (if configured ho)',
          'Custom school-specific operational workflows & integrations'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Fee slip PDF generator with barcode',
      'Parent SMS notification gateway integration',
      'Online quiz & assignment submission portal',
      'Library & asset tracking module'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['education-hub', 'dccid']
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Internal Tools',
    icon: 'dashboard_customize',
    badge: 'Operational Command',
    summary: 'Operational consoles, live KPI visualizers, role-based controls, inventory monitors, and exportable data tables.',
    romanUrduIntro: 'An admin dashboard is a central workspace for managing and monitoring business metrics, users, orders, revenue, and operational data.',
    whoNeedsIt: 'Business owners, operations managers, SaaS companies, logistics firms, and organizations that need clear access to their operational data.',
    problemSolved: 'Scattered messages and spreadsheets make performance difficult to understand. A dashboard brings key information together in a visual, actionable format.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Multi-Section Data Console',
        features: [
          'Multiple dashboard operational sections (Users, Orders, Analytics, Settings)',
          'Live table search, column filters, and pagination',
          'Data entry & update forms with frontend validation',
          'Interactive charts and KPI performance graphs (real data supported)',
          'Authentication & session security (if configured ho)'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Enterprise Control Platform',
        features: [
          'Advanced multi-role permissions (Super Admin, Manager, Operator, Viewer)',
          'Complex data workflows with bulk actions and real-time socket updates',
          'Export to CSV, Excel, and PDF reports',
          'Audit trail logs and action history (if implemented ho)',
          'Third-party API integrations (Payment gateways, CRM, Cloud services)',
          'Strict operational controls, rate limiting and encryption standards'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Real-time WebSocket data synchronization',
      'Automated scheduled report emails',
      'Dark / Light theme switch for staff ergonomics',
      'Role-based permission editor'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['dccid', 'education-hub']
  },
  {
    id: 'custom-web-apps',
    title: 'Custom Web Applications',
    icon: 'extension',
    badge: 'Bespoke Software',
    summary: 'Tailored software architectures built from the ground up for unique business logic, SaaS models, and specialized workflows.',
    romanUrduIntro: 'A custom web application is software designed and developed around your specific business requirements and workflows.',
    whoNeedsIt: 'Technology founders, startups, logistics companies, healthcare providers, and specialized businesses with processes that standard templates cannot support.',
    problemSolved: 'Off-the-shelf software may not fit your workflow and can involve recurring subscription costs. A custom application is built around your own requirements.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Multi-Module Web Application',
        features: [
          'Multiple connected user workflows',
          'Additional supporting modules & settings',
          'Data persistence through an agreed backend (SQL / NoSQL)',
          'Secure user authentication & account handling (if required ho)',
          'Search, filtering, and data management',
          'Integration with approved third-party services'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Multi-tenant workspace isolation',
      'Subscription billing with Stripe / Paddle',
      'Real-time collaborative features',
      'Mobile PWA installability'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['ai-booking', 'education-hub', 'dccid']
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking System',
    icon: 'calendar_month',
    badge: 'Scheduling Engine',
    summary: 'Frictionless scheduling engines for clinics, salons, and consultants with calendar sync, availability checks, and reminders.',
    romanUrduIntro: 'An appointment booking system allows clients to view available dates and time slots and submit bookings online.',
    whoNeedsIt: 'Doctors, dental clinics, beauty salons, lawyers, fitness trainers, and coaching consultants.',
    problemSolved: 'Phone calls and manual calendars can lead to scheduling conflicts or missed appointments. Online scheduling helps keep bookings organized.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Managed Appointment System',
        features: [
          'Persistent appointment records (if backend configure kiya jaye)',
          'Admin appointment management console (accept, reschedule, cancel)',
          'Clear booking-status workflow',
          'Email notifications for booking confirmations (if configured ho)',
          'Basic calendar view where implemented'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Autonomous Scheduling Platform',
        features: [
          'Advanced scheduling rules, buffer times, and holiday blocking',
          'Multiple staff members or service categories selection',
          'Live availability checks (if backend calendar API sync supported ho)',
          'Automated SMS / WhatsApp reminders (if third-party provider configured ho)',
          'Deposit / advance payment collection options if agreed',
          'Role-based administration and operational reports'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Google Calendar / Outlook two-way sync',
      'SMS reminder gateway integration',
      'Advance deposit checkout pipeline',
      'Staff specific calendar management'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['ai-booking']
  },
  {
    id: 'ai-assistants',
    title: 'AI Assistants & Chatbots',
    icon: 'smart_toy',
    badge: 'Intelligent Automation',
    summary: 'Intelligent conversational agents, lead qualification assistants, and knowledge retrieval bots tailored for your business.',
    romanUrduIntro: 'An AI assistant or chatbot interacts with website visitors, answers questions, and can help collect project inquiries.',
    whoNeedsIt: 'Customer service businesses, e-commerce stores, B2B agencies, educational institutes, and technology platforms.',
    problemSolved: 'Staff may not always be available to answer questions. An AI assistant can provide guidance around the clock, subject to its configured capabilities.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Guided Sales & Inquiry Assistant',
        features: [
          'Advanced conversational logic and intent matching',
          'Detailed service and package explanations in English',
          'Context-aware lead capture form guidance',
          'Connected knowledge base or custom API integration (if configured ho)',
          'Modern sleek chat UI with voice synthesis audio option'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      premium: {
        name: 'Premium Package',
        subtitle: 'Autonomous Enterprise AI Agent',
        features: [
          'Bespoke AI workflows tailored to business data',
          'External tool calling & database query integrations',
          'Document retrieval / RAG knowledge base (if configured ho)',
          'Seamless escalation to human WhatsApp / CRM team',
          'Conversation analytics, feedback logs, and continuous tuning'
        ],
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Voice synthesis / audio playback in browser',
      'English-language assistant responses and voice output',
      'CRM lead auto-forwarding',
      'Custom vector database for private documents'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['ai-booking']
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    icon: 'settings_suggest',
    badge: 'Process Acceleration',
    summary: 'Eliminate repetitive manual tasks with webhook pipelines, database synchronization, notifications, and custom scripts.',
    romanUrduIntro: 'Business automation handles repetitive tasks such as transferring form data, sending notifications, and updating records.',
    whoNeedsIt: 'Businesses that spend significant time on manual data entry and follow-ups and want to streamline routine operations.',
    problemSolved: 'Automation can reduce repetitive manual work, delays, and avoidable data-entry errors.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Single Task Automation',
        features: [
          'One clearly defined repetitive workflow automated',
          'Simple form-to-email or form-to-notification dispatch',
          'Basic data transfer between supported channels'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Webhook listener for third-party systems',
      'Automated PDF invoice generation',
      'Slack / Discord / Telegram team bots',
      'Scheduled cron job batch processors'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['ai-booking', 'dccid']
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages & Campaign Websites',
    icon: 'rocket_launch',
    badge: 'High Conversion',
    summary: 'Single-page conversion engines designed for paid ad campaigns, product launches, event registrations, and fast leads.',
    romanUrduIntro: 'A landing page is a focused, single-page website created for a specific marketing campaign, service, or product launch.',
    whoNeedsIt: 'Course creators, event organizers, product launch teams, real estate projects, and digital marketers running online campaigns.',
    problemSolved: 'A general website can give visitors many paths to follow. A focused landing page highlights one clear action, such as submitting an inquiry or making a purchase.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      },
      medium: {
        name: 'Medium Package',
        subtitle: 'Lead-Capture Campaign Page',
        features: [
          'Multiple custom storytelling sections (Hero, Problem, Solution, Proof, FAQ)',
          'Interactive lead capture form with instant validation',
          'Client-supplied testimonials & proof showcase',
          'Enhanced visual effects, micro-animations & on-page SEO',
          'Ad campaign tracking scripts (Meta Pixel / Google Tag Manager if configured ho)'
        ],
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Meta Pixel & Google Ads Conversion tracking setup',
      'Exit-intent lead capture modal',
      'Countdown offer timer',
      'Direct WhatsApp click tracking'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['sk-builder', 'd-pizza']
  },
  {
    id: 'seo-optimization',
    title: 'SEO & Website Optimization',
    icon: 'search',
    badge: 'Organic Search',
    summary: 'Technical and on-page search engine optimization, meta structuring, speed enhancements, and indexing preparation.',
    romanUrduIntro: 'SEO improves how your website is presented and indexed by search engines, helping relevant visitors discover your content.',
    whoNeedsIt: 'Businesses that want to attract customers through organic search and improve their website\'s technical quality.',
    problemSolved: 'A website that is difficult to find, poorly structured, or slow may lose potential visitors. Technical SEO and performance improvements help address these issues.',
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
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      'Google My Business local profile optimization guidance',
      'Schema JSON-LD for products / FAQs',
      'Image WebP compression pipeline',
      'Competitor SEO keyword audit report'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['sk-portfolio']
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance & Improvements',
    icon: 'build',
    badge: 'Stability & Upgrades',
    summary: 'Proactive security patches, library updates, content iterations, speed audits, and bug fixes to keep your platforms solid.',
    romanUrduIntro: 'Website maintenance keeps a live website updated, fixes bugs, adds content, and monitors performance.',
    whoNeedsIt: 'Businesses with an active website that need ongoing technical updates and support.',
    problemSolved: 'Outdated dependencies can create security or reliability issues, and websites can become slower over time. Regular maintenance helps keep a site stable and up to date.',
    packages: {
      small: {
        name: 'Small Package',
        subtitle: 'Minor Fixes & Updates Batch',
        features: [
          'Clearly defined batch of minor content updates (text, contact, photos)',
          'Agreed minor bug fixes or alignment issues',
          'Basic SSL and broken link checks'
        ],
        suitableFor: 'Startups, small teams, and businesses launching an essential first version.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Growing businesses that need expanded features, integrations, and structured workflows.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
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
        suitableFor: 'Established organizations that need advanced customization, integrations, and scalable operations.',
        quotationRequirements: 'Final inclusions, integrations, dependencies, and delivery expectations are confirmed in the written quotation.'
      }
    },
    optionalAddons: [
      '24/7 automated uptime monitor alerts',
      'Database scheduled cloud backup',
      'Monthly performance audit report',
      'Priority emergency hotline support'
    ],
    quotationNotice: 'The final scope, deliverables, integrations, and any third-party costs are confirmed in the written quotation.',
    relevantProjectIds: ['sk-portfolio', 'dccid']
  }
];
