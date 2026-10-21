import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'sk-portfolio',
    title: 'SK DEV TEAM Portfolio',
    category: 'Web Platforms',
    badgeCat: 'Flagship Showcase',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtJe9b157Xox0UVlvXr7S8xcbhMbzsumon-SOGYPwOawqsNcffO5t-FrFYoFV9dxnq5yGEjhiFTs3vQJX3nAOEO8uyFb2qUVGMtjoBLC96zChpF9Y2QZO4_-ARJEA7hZ5dHqzx7snrR8QYwQWxA-ps5OYFFtwm8hvgQsEn7GPweKPZ4qlT81wAiIL0RVW36-X1MmdDJA8agfA2vghhSf1f-HJVy_0QHxdozNcDbBRkpIykeupJSotA',
    liveUrl: 'https://suhailahmedaamro.vercel.app/',
    client: 'SK DEV TEAM Architecture',
    sla: '100% Uptime',
    latency: '< 280ms',
    desc: 'The high-performance official headquarters featuring dynamic portfolio navigation, contact workflows, and modular UI engineering.',
    deliverables: [
      'Dynamic route prefetching with sub-second page hydration',
      'Integrated telemetry and real-time project filtering pipeline',
      'Material Symbols & Tailwind Obsidian theme system',
      'Direct WhatsApp & Calendly lead conversion triggers'
    ],
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Vercel Edge'],
    date: '2025-01',
    order: 1,
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Portfolio', 'UI Architecture'],
    testimonial: {
      quote: 'SK DEV TEAM built a lightning-fast, high-converting digital headquarters that showcases our full capabilities with crisp aesthetics and zero downtime.',
      author: 'Suhail Ahmed',
      role: 'Lead Architect & Founder, SK DEV TEAM',
      rating: 5.0,
      metrics: '100% On-Time Delivery · Sub-second TTI',
      duration: '01:30 HD',
      initials: 'SA'
    }
  },
  {
    id: 'd-pizza',
    title: 'D-Pizza Storefront & Ordering',
    category: 'E-Commerce',
    badgeCat: 'E-Commerce & Ordering',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqdg4tXYIkNzs1nJ-mX7Qj0KwbVDtV02gjZK5IRZzDw4na79qp_HoaEFcknen-rwrO4xMZ3jJslf1z3Yz8pXbqeUmrIE0LxAJkOOxSXHXKNgIa6vnvV15nkyFQIjZ6PJdY1aN2PhIMYAn2VCtM2yvSplqq2-sY6WkjPl7TDUVXDfytSsH7i9Us6MUrwBq8NwjvV5v0MnK5_vE_UttJidwZQxM7pm3YhLanwZwRce94x8o5WLddUKl',
    liveUrl: 'https://www.d-pizza.shop/',
    client: 'Artisanal Dining Brand',
    sla: '99.98% Uptime',
    latency: '< 350ms',
    desc: 'Comprehensive digital restaurant storefront with real-time menu customization, frictionless Stripe checkout, and automated delivery order dispatch.',
    deliverables: [
      'Real-time pizza dough, topping & cheese customizer',
      'Stripe Checkout Elements with SCA 3D-Secure 2.0',
      'Instant kitchen dispatch order ticket printing pipeline',
      'Full PWA offline caching & instant mobile cart store'
    ],
    stack: ['React 18', 'Node.js API', 'Stripe Payments', 'Tailwind CSS', 'Vercel'],
    date: '2024-11',
    order: 2,
    tags: ['React', 'Node.js', 'Stripe', 'Tailwind CSS', 'E-Commerce', 'Ordering', 'Cart', 'Payments'],
    testimonial: {
      quote: 'SK DEV TEAM delivered our custom ordering platform in 12 days. Instant checkout reduced cart dropouts by 34%, and kitchen dispatch has been completely seamless during peak dinner rush.',
      author: 'Marco Castiglione',
      role: 'Founder & CEO, D-Pizza',
      rating: 5.0,
      metrics: '+34% Conversions · <350ms Checkout',
      duration: '01:42 HD',
      initials: 'MC'
    }
  },
  {
    id: 'education-hub',
    title: 'Education Hub (LMS)',
    category: 'Education & LMS',
    badgeCat: 'LMS & School Portal',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTwtNGjblrYsAaLWhAo-9oujT3vbM4LXHUO4E9Aw7dKtsv6toIyHP7nmCo7skJpC7Yu_MQr5J63KEBYDyFs_ZN97gNDXDnzJCj1FSB0BJvL0oj0jnYSnPb8_xXrfVFkmpOfufcwRjviLpfrwfJ5UaVRIx-5Bi1Ar7KV2OMvQPNePaXtrPLLFUDI2_lVbkMWI08noyHKOSnDLrnvI6F1STFhPFJr1kgR1XaY_o98-Dj1X7CqmXo76Ne',
    liveUrl: 'https://education-hub-dusky.vercel.app/',
    client: 'Global Academy Network',
    sla: '99.95% Uptime',
    latency: '< 420ms',
    desc: 'Comprehensive academic governance engine with role-based dashboards for administrators, faculty, and students, grading books, and syllabus distribution.',
    deliverables: [
      'Role-based access matrix for students, instructors, and admins',
      'PostgreSQL relational schema with high-efficiency querying',
      'Automated quiz grading engine & certification generator',
      'Adaptive video bitrate streaming integration'
    ],
    stack: ['Next.js', 'PostgreSQL', 'JWT Auth', 'Tailwind CSS', 'Prisma ORM'],
    date: '2024-12',
    order: 3,
    tags: ['Next.js', 'PostgreSQL', 'Auth', 'LMS', 'Education', 'Courses', 'Student Portal'],
    testimonial: {
      quote: 'A robust multi-role academic platform. Teachers manage syllabus effortlessly while students submit assignments with automated progress tracking.',
      author: 'Prof. Tariq Mahmood',
      role: 'Academic Director, Education Hub Network',
      rating: 5.0,
      metrics: '3,500+ Active Students · 99.95% Uptime',
      duration: '02:05 HD',
      initials: 'TM'
    }
  },
  {
    id: 'dccid',
    title: 'DCCID Institutional Platform',
    category: 'Enterprise & Admin',
    badgeCat: 'Institutional Portal',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfzGwyYvNxJx4U4ZoNz37enbLLOnbbmIYiJKzb4kwRxqb0okjaT-rseC6k24LGBqRp_fKAZRrzWPwFPfr6ZBSWDvo5Fdf7cXPWOSuem9dguJ8VIMERA8LHDxswz2lOomCU2Eh94XbVxJFNZK1O5SsZnNFrHv6LkawKzPMUktiZa8MFI9k4ozGHFPvd5Jqt4BOdsaLnjadSHbD8R7G3WAbTgsxA5qgT7O7Y0r0SLKnmg_yIoK6zg0GT',
    liveUrl: 'https://dccid-79522kcag-aamrosk519-3847s-projects.vercel.app/',
    client: 'Institutional Governance',
    sla: '99.99% SLA',
    latency: '< 180ms',
    desc: 'Secure organizational website featuring institutional directories, document archives, encrypted inquiries, and multi-tier public resources.',
    deliverables: [
      'Zero-latency client hydration with instant state syncing',
      'Departmental approval hierarchies and role delegation',
      'Audit trail event streaming with cryptographic timestamps',
      'High-density data tables with CSV & PDF export'
    ],
    stack: ['Enterprise Next.js', 'React', 'Cloudflare DNS', 'Tailwind CSS', 'Zustand'],
    date: '2025-02',
    order: 4,
    tags: ['Web Application', 'React', 'Vite', 'Enterprise', 'Admin Portal', 'Dashboard'],
    testimonial: {
      quote: 'Flawless execution on our high-traffic directory and secure archive. The team\'s communication over WhatsApp was daily and proactive.',
      author: 'Farhan Akhtar',
      role: 'Technical Director, DCCID Org',
      rating: 5.0,
      metrics: '100% On-Time Delivery · Zero Security Exploits',
      duration: '01:58 HD',
      initials: 'FA'
    }
  },
  {
    id: 'ai-booking',
    title: 'AI Appointment Booking Agent',
    category: 'AI & Automation',
    badgeCat: 'GenAI & Automation',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbQ1XMRvVGiSVsQHO5l56a9vqjb93H6O442HSxQxXuTWKnYshj2EEWQQ1J7fOVB9pnXsPj005Tdx80mNPrSh2AQMya1DMYX2B_SWkCQivFE3h60HOtZIyjEKG9qnlQpOqVQ3iJvEYJJxRYU5qeMXSqmDwo-jqAEvgWENYSlvZknve-tt27s3lG4Ib-enkjgOOODNe17hliahvxQdR43lNsYuf34h5RGMm5Gs2Zu5y31kBrSCVmY1Xy',
    liveUrl: 'https://ai-appointment-booking-agent-omega.vercel.app/',
    client: 'Healthcare & Professional Services',
    sla: '99.9% Uptime',
    latency: '< 250ms',
    desc: 'Autonomous conversational AI that conducts qualification interviews, syncs with Google/Outlook calendar slots, and delivers verified bookings.',
    deliverables: [
      'Autonomous natural language parsing of booking intent',
      'Two-way synchronization with Google Calendar & Outlook slots',
      'Automated SMS and email reminders with one-click rescheduling',
      'FastAPI async backend handling concurrent multi-tenant dialogues'
    ],
    stack: ['FastAPI', 'Python 3.12', 'AI Agents', 'OpenAI SDK', 'Webhooks'],
    date: '2025-02',
    order: 5,
    tags: ['FastAPI', 'AI Agents', 'Webhooks', 'Python', 'Automation', 'LLM', 'Calendar'],
    testimonial: {
      quote: 'The conversational AI appointment bot manages 450+ inquiries weekly with zero missed bookings and full calendar sync.',
      author: 'Dr. Elena Rostova',
      role: 'VP of Operations, HealthTech Solutions',
      rating: 5.0,
      metrics: '450+ Auto-Bookings / Week · 99.98% Uptime',
      duration: '02:15 HD',
      initials: 'ER'
    }
  },
  {
    id: 'sk-builder',
    title: 'SK Builder Platform',
    category: 'Web Platforms',
    badgeCat: 'Industrial & Architecture',
    bannerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHZB5oNAtMmtyrAJ3-4h5UmybdbgzdWaZYdfB6hNS_8QRw6h4LWftwzmA3qmPkc4vF53FNRneN8M28LBK3UllIUdW4a72bAJkBEZk0g030yE3sUCuCP6Pdt8FYrBsIqTlWAdl7DKbgH_nAQtq4_7uZbP0CAUdE6oavHMuWn6-YU3yvS2OQluQKk0qlvh3VT1M0gjSutbAYmQUZ4tSpg4rrAtzfVPrfoVrjicsdkO5n-7LwXpOy0Ofd',
    liveUrl: 'https://sk-conding.vercel.app/',
    client: 'Infrastructure & Civil Contracting Firm',
    sla: '99.95% Uptime',
    latency: '< 300ms',
    desc: 'Modern corporate hub for construction, architectural estimators, real estate project showcases, and digital blueprint inquiry flows.',
    deliverables: [
      'Dynamic quotation estimator with instant cost modeling',
      'Multi-category project showcase gallery with lazy-loaded media',
      'Interactive client consultation and quotation dispatch intake',
      'Optimized responsive layout with high-resolution blueprint renderers'
    ],
    stack: ['React', 'Tailwind CSS', 'Modern CSS', 'Vercel', 'Node.js'],
    date: '2024-10',
    order: 6,
    tags: ['React', 'Tailwind CSS', 'Responsive Web', 'Construction', 'Engineering', 'Builder'],
    testimonial: {
      quote: 'Turnkey digital solution for construction and engineering firms featuring reactive cost calculators, project galleries, and responsive asset loading.',
      author: 'Eng. Bilal Siddiqui',
      role: 'Director of Civil Engineering, SK Builder',
      rating: 5.0,
      metrics: '280+ Blueprint Inquiries Processed',
      duration: '01:45 HD',
      initials: 'BS'
    }
  },
  {
    id: 'noble-public-school-dadu',
    title: 'Noble Public School Dadu',
    category: 'Education & LMS',
    badgeCat: 'School Website',
    bannerImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://npsd.vercel.app/',
    client: 'Noble Public School Dadu',
    sla: 'Live Demo',
    latency: 'Open website',
    desc: 'A school-focused web experience for presenting school information and helping families find key details in a clear, accessible layout.',
    deliverables: [
      'School information presented in a clear page structure',
      'Responsive browsing experience across desktop and mobile',
      'Easy-to-follow navigation for families and visitors',
      'Direct link to the live school website'
    ],
    stack: ['School Website', 'Responsive UI', 'Education'],
    date: '2026-10',
    order: 7,
    tags: ['Education', 'School Website', 'Responsive Design', 'Noble Public School', 'Dadu']
  },
  {
    id: 'noble-dadu-school-hub',
    title: 'Noble Dadu School Hub',
    category: 'Education & LMS',
    badgeCat: 'School Hub',
    bannerImg: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://noble-dadu-school-hub.lovable.app/',
    client: 'Noble Dadu School Hub',
    sla: 'Live Demo',
    latency: 'Open website',
    desc: 'A dedicated school-hub experience designed to make school-related information easier to explore through a focused, education-oriented interface.',
    deliverables: [
      'Dedicated school hub landing experience',
      'Clear information hierarchy and navigation',
      'Responsive layout for common screen sizes',
      'Direct link to the live school hub'
    ],
    stack: ['School Hub', 'Responsive UI', 'Education'],
    date: '2026-10',
    order: 8,
    tags: ['Education', 'School Hub', 'Responsive Design', 'Dadu', 'Noble School']
  }
];
