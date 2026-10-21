import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../config/app';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, onBack }) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-8">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="px-3.5 py-1.5 rounded-xl bg-[#1e1f25] hover:bg-[#282a2f] text-xs font-semibold text-[#c4c0ff] transition-colors flex items-center gap-2 border border-[#33353a]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Homepage</span>
      </button>

      {type === 'privacy' ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-2xl space-y-6 text-sm text-[#c7c4d8] leading-relaxed">
          <div className="space-y-2 border-b border-[#33353a] pb-6">
            <span className="text-xs uppercase font-bold text-[#44dfab]">Legal & Data Protection</span>
            <h1 className="text-3xl font-extrabold text-[#e2e2e9]">Privacy Policy</h1>
            <p className="text-xs text-[#918fa1]">Last Updated: October 2026 · SK DEV TEAM</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry or contact SK DEV TEAM through our website or direct communication channels (WhatsApp, Email), we collect basic commercial details you provide voluntarily:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name and Business / Organization name (if applicable)</li>
              <li>Email address and WhatsApp / phone contact number</li>
              <li>Requested project specifications, budget estimates, and requirements</li>
            </ul>
            <p>
              We do <strong>not</strong> collect passwords, CNIC numbers, payment card numbers, or unrelated personal identification data from public visitors.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">2. How We Use Your Information</h2>
            <p>
              Your contact details and project specifications are used solely for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Preparing accurate project quotations, timelines, and technical scopes.</li>
              <li>Communicating via WhatsApp or email regarding your software requirements.</li>
              <li>Internal inquiry management within our secure private database.</li>
            </ul>
            <p>
              We do <strong>never</strong> sell, lease, rent, or distribute your private information to third-party marketing brokers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">3. Storage & Security</h2>
            <p>
              Inquiries are stored in our private Google Cloud spreadsheet database protected with encrypted authorization protocols and access controls. Public visitors have zero access to private database records or internal administrative telemetry.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">4. Your Rights & Contact</h2>
            <p>
              You have the right to request deletion or modification of your inquiry record at any time by contacting our lead architect directly at <a href="mailto:suhailahmedaamro786@gmail.com" className="text-[#c4c0ff] underline">suhailahmedaamro786@gmail.com</a> or via WhatsApp at <a href="https://wa.me/923153558383" target="_blank" rel="noopener noreferrer" className="text-[#44dfab] underline">+92 315 3558383</a>.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1e1f25] border border-[#33353a] shadow-2xl space-y-6 text-sm text-[#c7c4d8] leading-relaxed">
          <div className="space-y-2 border-b border-[#33353a] pb-6">
            <span className="text-xs uppercase font-bold text-[#8781ff]">Commercial Terms</span>
            <h1 className="text-3xl font-extrabold text-[#e2e2e9]">Terms and Conditions</h1>
            <p className="text-xs text-[#918fa1]">Last Updated: October 2026 · SK DEV TEAM</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">1. Engagement & Quotations</h2>
            <p>
              SK DEV TEAM provides software engineering, website development, online ordering systems, and custom automation services. All public pricing guidelines and package tiers (Small, Medium, Premium) represent baseline scopes. A formal, binding quotation is issued only after review and mutual sign-off of your specific project deliverables.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">2. Deliverables & Milestones</h2>
            <p>
              Projects are delivered in structured milestones (e.g. Prototype Staging, Functional Review, Final Production Deployment). Client review and sign-off are required at each agreed sprint milestone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">3. Domain, Hosting & Third-Party APIs</h2>
            <p>
              Unless explicitly specified in a commercial agreement:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Domain names and third-party hosting charges remain the client's asset and responsibility.</li>
              <li>Third-party usage costs (such as Stripe transaction fees, SMS gateway fees, or live AI model API tokens) are billed directly by their respective providers.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">4. Intellectual Property & Handoff</h2>
            <p>
              Upon complete milestone settlement, full ownership of agreed bespoke source code, assets, and project deployments is transferred cleanly to the client with comprehensive deployment documentation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#e2e2e9]">5. Governing Law & Inquiries</h2>
            <p>
              These terms are governed under applicable laws in Sindh, Pakistan. For questions, contact <a href="mailto:suhailahmedaamro786@gmail.com" className="text-[#c4c0ff] underline">suhailahmedaamro786@gmail.com</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
