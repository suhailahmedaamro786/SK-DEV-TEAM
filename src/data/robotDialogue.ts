import { PackageTier, QuickAction } from '../types';

export const ROBOT_WELCOME_TEXT = `👋 Welcome to SK DEV TEAM! 🤖✨

I am your digital assistant. I can explain our services, packages, and project options in clear English.

Whether you need a business website, online store, WhatsApp ordering system, school management software, admin dashboard, appointment booking system, AI assistant, or a custom web application, I am here to guide you.

I can also explain the differences between our Small, Medium, and Premium packages so you can choose the option that best matches your requirements.

You can explore our project demos, submit a project inquiry, or contact our team through WhatsApp or email.

What would you like to learn about today? 🚀`;

export const ROBOT_CONTACT_SCRIPT = `If you are interested in our services and would like to discuss your project, contact our team on WhatsApp at +92 315 3558383. You can also email us at suhailahmedaamro786@gmail.com or submit the project inquiry form on this website.

Please include your requirements and preferred package in the form. Our team will review your project details and guide you through the quotation and next steps.

Thank you for considering SK DEV TEAM and for placing your trust in us! 🤝✨`;

export const ROBOT_PRIMARY_ACTIONS: QuickAction[] = [
  { label: '🛠️ All Services', actionKey: 'show_all_services' },
  { label: '📦 Compare Packages', actionKey: 'explain_packages_general' },
  { label: '💰 Pricing Information', actionKey: 'explain_pricing_policy' },
  { label: '💼 Project Demos', actionKey: 'show_demos' },
  { label: '🧭 Help Me Choose', actionKey: 'start_wizard' },
  { label: '📝 Submit an Inquiry', actionKey: 'go_to_form' },
  { label: '💬 WhatsApp Contact', actionKey: 'open_whatsapp' },
  { label: '📩 Email Contact', actionKey: 'open_email' }
];

export const ROBOT_PACKAGE_COMPARISON_GENERAL = `The Small package is designed for essential requirements and a focused project scope. The Medium package can include more pages, features, and workflows. The Premium package is intended for clients who need a highly customized or advanced solution.

The final package is selected after reviewing your exact requirements.

🔹 **Small Package**
- Ideal for a new business or an initial online presence.
- A compact structure with essential pages or sections and direct contact options.
- A practical, budget-conscious starting point.

🔸 **Medium Package**
- Designed for growing businesses and active operations.
- Multiple pages or sections, lead-capture forms, catalogues or cart features, and enhanced on-page SEO.
- Database records and administration features when included in the agreed scope.

💎 **Premium Package**
- Designed for tailored, advanced business platforms.
- Custom design, role-based permissions, complex workflows, and advanced integrations.
- Dedicated support and service-level agreements as specified in the quotation.`;

export const ROBOT_PRICING_POLICY_TEXT = `💰 **SK DEV TEAM Pricing Policy**

We do not invent unverified or arbitrary prices. Every project has different requirements, so we prepare quotations based on the agreed scope.

1. **Custom Quotation:** Pricing is based on your requirements, page count, backend complexity, and requested integrations.
2. **Domain and Hosting:** These are not automatically included unless explicitly stated in the quotation. Our team can help with deployment and domain configuration.
3. **External Services and Third-Party APIs:** Payment gateways, SMS alerts, and AI model usage may involve separate provider charges.
4. **Future Upgrades:** You can begin with a Small or Medium package and add features as your business grows.`;

export const ROBOT_FAQS: { question: string; answer: string; relatedAction?: string }[] = [
  {
    question: 'What is included in the Small package?',
    answer: 'The Small package provides an essential foundation: a responsive layout, mobile-friendly design, core business information, direct WhatsApp contact, and basic SEO. It is suitable for businesses that need a straightforward online presence.'
  },
  {
    question: 'What is the difference between Medium and Premium?',
    answer: 'The Medium package can include multiple pages, lead-capture forms, catalogues or cart features, and structured SEO. The Premium package can include custom architecture, multi-role dashboards, automated workflows, third-party API integrations, and deeper customization.'
  },
  {
    question: 'Which package is right for my business?',
    answer: 'The Small package is a practical starting point for a new business with limited requirements. The Medium package may suit a business that needs to generate leads and manage customer activity. The Premium package is intended for more complex workflows, automation, or multi-user features.'
  },
  {
    question: 'How much will my project cost?',
    answer: 'We prepare a quotation after reviewing your requirements. We do not provide misleading estimates without understanding the project scope. Submit the inquiry form or contact our team on WhatsApp to discuss your project.'
  },
  {
    question: 'Are domain and hosting included?',
    answer: 'Domain and hosting are not included in standard development fees unless explicitly confirmed in the quotation. Our team can assist with deployment on platforms such as Vercel, Cloudflare, Netlify, or a custom server.'
  },
  {
    question: 'Can I add features later?',
    answer: 'Yes. You can start with a smaller scope and add pages, payment integrations, student portals, or an AI chatbot later, subject to a separate scope and quotation.'
  }
];

export const ROBOT_WIZARD_STEPS = [
  {
    id: 1,
    question: '1. What type of project would you like to build?',
    options: [
      { label: '🌐 Business Website', value: 'Business Website Development' },
      { label: '🛍️ E-Commerce / Online Store', value: 'E-commerce Website' },
      { label: '📲 WhatsApp Ordering System', value: 'WhatsApp Ordering System' },
      { label: '🎓 School / LMS Management', value: 'School and Education Management System' },
      { label: '📊 Admin Dashboard & CRM', value: 'Admin Dashboards' },
      { label: '🤖 AI Assistant / Chatbot', value: 'AI Assistants and Chatbots' },
      { label: '📅 Appointment Booking System', value: 'Appointment Booking System' },
      { label: '🧩 Custom Web Application', value: 'Custom Web Applications' }
    ]
  },
  {
    id: 2,
    question: '2. Which key features do you need?',
    options: [
      { label: 'Mobile Responsive + WhatsApp Button', value: 'Basic Responsive + WhatsApp' },
      { label: 'Product Catalogue + Shopping Cart', value: 'Catalogue + Cart' },
      { label: 'Online Payment Gateway', value: 'Payment Gateway' },
      { label: 'Admin Login + Data Management', value: 'Admin Portal & Database' },
      { label: 'Calendar Booking + Notifications', value: 'Calendar Sync' },
      { label: 'AI-Powered Guidance', value: 'AI Agent' }
    ]
  },
  {
    id: 3,
    question: '3. Which package do you prefer?',
    options: [
      { label: '🔹 Small Package (Starter / Essential)', value: 'Small' },
      { label: '🔸 Medium Package (Growing / Custom)', value: 'Medium' },
      { label: '💎 Premium Package (Advanced / Enterprise)', value: 'Premium' },
      { label: '❓ Not Sure Yet — I Need Advice', value: 'Not Sure Yet' }
    ]
  },
  {
    id: 4,
    question: '4. Would you like to share your estimated budget? (Optional)',
    options: [
      { label: 'Starter / MVP ($300–$800)', value: '$300 - $800' },
      { label: 'Production Commercial ($800–$2,500)', value: '$800 - $2,500' },
      { label: 'Enterprise Solution ($2,500+)', value: '$2,500+' },
      { label: 'I Would Like to Discuss the Scope First', value: 'To be discussed' }
    ]
  },
  {
    id: 5,
    question: '5. How would you like to contact our team?',
    options: [
      { label: '📝 Submit the Project Inquiry Form', value: 'form' },
      { label: '💬 Chat on WhatsApp (+92 315 3558383)', value: 'whatsapp' },
      { label: '📩 Send Details by Email', value: 'email' }
    ]
  }
];
