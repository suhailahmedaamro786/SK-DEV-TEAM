import { PackageTier, QuickAction } from '../types';

export const ROBOT_WELCOME_TEXT = `👋 Assalam-o-Alaikum! SK DEV TEAM mein khush aamdeed! 🤖✨

Main aap ka digital assistant hoon. Main aap ko hamari tamam services, packages aur project options detail mein samjha sakta hoon.

Aap business website, online store, WhatsApp ordering system, school management software, admin dashboard, appointment booking system, AI assistant ya koi custom web application banwana chahte hain, to main aap ki rehnumai kar sakta hoon.

Main aap ko Small, Medium aur Premium packages ka farq bhi samjhaunga, taake aap apni requirements ke mutabiq behtar option choose kar sakein.

Aap hamare projects ke demos dekh sakte hain, application form submit kar sakte hain, ya hamari team se WhatsApp aur email par rabta kar sakte hain.

Aap kis service ke baare mein maloomat lena chahte hain? 🚀`;

export const ROBOT_CONTACT_SCRIPT = `Agar aap ko hamari services pasand aayi hain aur aap apne project par baat karna chahte hain, to aap WhatsApp par hamari team se rabta kar sakte hain (+92 315 3558383). Aap email bhi bhej sakte hain (suhailahmedaamro786@gmail.com), ya website ka project inquiry form fill karke apni application submit kar sakte hain.

Form mein apni requirements aur preferred package batayein. Hamari team aap ke project ki details review karke quotation aur next steps ke baare mein guide kar sakegi.

SK DEV TEAM ko apna waqt dene aur hum par trust karne ka bohat shukriya! 🤝✨`;

export const ROBOT_PRIMARY_ACTIONS: QuickAction[] = [
  { label: '🛠️ All Services', actionKey: 'show_all_services' },
  { label: '📦 Small / Medium / Premium', actionKey: 'explain_packages_general' },
  { label: '💰 Pricing Information', actionKey: 'explain_pricing_policy' },
  { label: '💼 Project Demos', actionKey: 'show_demos' },
  { label: '🧭 Help Me Choose (Wizard)', actionKey: 'start_wizard' },
  { label: '📝 Submit Application', actionKey: 'go_to_form' },
  { label: '💬 WhatsApp Contact', actionKey: 'open_whatsapp' },
  { label: '📩 Email Contact', actionKey: 'open_email' }
];

export const ROBOT_PACKAGE_COMPARISON_GENERAL = `Small package basic requirements aur limited scope ke liye hota hai. Medium package mein zyada pages, features ya workflows shamil ho sakte hain. Premium package un clients ke liye hota hai jinhein zyada customized ya advanced solution chahiye.

Final package aap ki exact requirements dekh kar decide hota hai:

🔹 **Small Package**:
- New business ya initial online presence ke liye behtareen hai.
- Compact structure, essential pages/sections, direct WhatsApp/contact buttons.
- Quick delivery aur budget-friendly MVP setup.

🔹 **Medium Package**:
- Growing businesses aur active operations ke liye.
- Multiple sections/pages, lead capture forms, dynamic catalogue/cart, enhanced on-page SEO aur smooth animations.
- Database records ya admin operations agar agreed hon.

🔹 **Premium Package**:
- High-performance, tailored enterprise platforms ke liye.
- Bespoke design, multi-role permissions, complex workflows, advanced integrations (Stripe, APIs, analytics, telemetry).
- Ongoing dedicated support aur SLA quotation ke mutabiq.`;

export const ROBOT_PRICING_POLICY_TEXT = `💰 **SK DEV TEAM Pricing Policy**:

Hum kabhi bhi ghair-tasdeeq shuda (unverified) ya man-maani prices invent nahi karte. Har project ki unique requirements hoti hain, is liye:

1. **Custom Quotation**:
Aap ki requirements, page counts, backend complexity aur desired integrations ke mutabiq precise quotation tayar ki jati hai.

2. **Domain aur Hosting**:
Domain aur hosting standard packages mein automatically included nahi hote jab tak agreement mein explicitly confirmed na ho. Agar aap chahein to hamari team domain & cloud deployment setup mein complete help karti hai.

3. **External Services & Third-Party APIs**:
Online payment gateways (jaise Stripe), SMS alerts ya live AI model tokens ke usage charges directly third-party provider ke hotay hain.

4. **Future Add-ons**:
Aap shuru mein Small ya Medium package se start kar sakte hain, aur baad mein kabhi bhi naye features ya upgrades add karwa sakte hain!`;

export const ROBOT_FAQS: { question: string; answer: string; relatedAction?: string }[] = [
  {
    question: 'Small package mein kya milega?',
    answer: 'Small package mein aap ko essential foundation milti hai: simple responsive layout, mobile friendly view, core information, direct WhatsApp contact aur basic SEO. Yeh un ke liye perfect hai jinhein jaldi aur budget mein reliable online presence chahiye.'
  },
  {
    question: 'Medium aur Premium mein kya difference hai?',
    answer: 'Medium package mein multiple pages, lead-capture forms, dynamic catalog/cart aur structured SEO shamil hoti hai. Premium package mein fully bespoke architecture, multi-role dashboards, automated workflows, third-party API integrations aur deep customization di jati hai.'
  },
  {
    question: 'Mere business ke liye konsa package sahi hai?',
    answer: 'Agar aap bilkul naye hain aur budget limited hai to Small se start karein. Agar aap regular leads aur customers se order lena chahte hain to Medium best hai. Agar aap ka business bada hai ya specific automation/multi-user features chahiye to Premium recommend kiya jata hai.'
  },
  {
    question: 'Price kitni hogi?',
    answer: 'Aap ki requirements ke mutabiq quotation tayar ki jayegi. Hum andaza laga kar ghalat price nahi batate. Aap niche inquiry form fill karein ya WhatsApp par connect karein, hamari team foran detail review karegi.'
  },
  {
    question: 'Kya domain aur hosting included hain?',
    answer: 'Domain aur hosting standard development fees mein shamil nahi hoti, unless quotation mein explicitly confirm ki gayi ho. Lekin hamari team Vercel, Cloudflare, Netlify ya custom server par complete deployment provide karti hai.'
  },
  {
    question: 'Kya baad mein features add kar sakte hain?',
    answer: 'Ji bilkul! Hamara architecture modular hota hai. Aap shuru mein Small ya Medium se start kar sakte hain aur baad mein naye pages, payment gateway, student portal ya AI chatbot asaani se integrate karwa sakte hain.'
  }
];

export const ROBOT_WIZARD_STEPS = [
  {
    id: 1,
    question: '1. Aap kis type ka project banwana chahte hain?',
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
    question: '2. Aap ko kaun se main features chahiye?',
    options: [
      { label: 'Mobile Responsive + WhatsApp button', value: 'Basic Responsive + WhatsApp' },
      { label: 'Product Catalogue + Shopping Cart', value: 'Catalogue + Cart' },
      { label: 'Online Payment (Stripe / Gateway)', value: 'Payment Gateway' },
      { label: 'Admin Login + Data Management', value: 'Admin Portal & Database' },
      { label: 'Calendar Booking + Notifications', value: 'Calendar Sync' },
      { label: 'AI Natural Language Guidance', value: 'AI Agent' }
    ]
  },
  {
    id: 3,
    question: '3. Aap ka preferred package konsa hai?',
    options: [
      { label: '🔹 Small Package (Starter / Essential)', value: 'Small' },
      { label: '🔸 Medium Package (Growing / Custom)', value: 'Medium' },
      { label: '💎 Premium Package (Advanced Enterprise)', value: 'Premium' },
      { label: '❓ Not Sure Yet (Team Se Mashwara)', value: 'Not Sure Yet' }
    ]
  },
  {
    id: 4,
    question: '4. Kya aap apna estimated budget share karna chahenge? (Optional)',
    options: [
      { label: 'Starter / Sprint MVP ($300 - $800)', value: '$300 - $800' },
      { label: 'Production Commercial ($800 - $2,500)', value: '$800 - $2,500' },
      { label: 'Full Enterprise Solution ($2,500+)', value: '$2,500+' },
      { label: 'Pehle Scope & Quotation Discuss Karni Hai', value: 'To be discussed' }
    ]
  },
  {
    id: 5,
    question: '5. Kya aap inquiry application form submit karna chahte hain ya pehle team se WhatsApp par baat karna chahte hain?',
    options: [
      { label: '📝 Fill Project Application Form', value: 'form' },
      { label: '💬 Chat Directly on WhatsApp (+92 315 3558383)', value: 'whatsapp' },
      { label: '📩 Send Details via Email', value: 'email' }
    ]
  }
];
