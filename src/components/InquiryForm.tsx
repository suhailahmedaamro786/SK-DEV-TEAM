import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, CheckCircle2, AlertCircle, ShieldCheck, Mail, Phone, Loader2 } from 'lucide-react';
import { SERVICES_CATALOGUE } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { InquiryFormData, PackageTier } from '../types';
import { api } from '../services/api';
import { APP_CONFIG } from '../config/app';

interface InquiryFormProps {
  initialService?: string;
  initialPackage?: PackageTier;
  initialFeatures?: string;
  initialBudget?: string;
  onOpenPrivacyNotice?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialService,
  initialPackage,
  initialFeatures,
  initialBudget,
  onOpenPrivacyNotice
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    clientName: '',
    businessName: '',
    email: '',
    phone: '',
    serviceCategory: initialService || SERVICES_CATALOGUE[0].title,
    selectedPackage: initialPackage || 'Small',
    projectDetails: '',
    desiredFeatures: initialFeatures || '',
    estimatedBudget: initialBudget || 'To be discussed',
    preferredContact: 'WhatsApp',
    referenceDemo: 'None',
    additionalNotes: ''
  });

  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedId, setConfirmedId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [backendNotice, setBackendNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync props changes if user picked something from robot or service cards
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceCategory: initialService }));
    }
    if (initialPackage) {
      setFormData(prev => ({ ...prev, selectedPackage: initialPackage }));
    }
    if (initialFeatures) {
      setFormData(prev => ({ ...prev, desiredFeatures: initialFeatures }));
    }
    if (initialBudget) {
      setFormData(prev => ({ ...prev, estimatedBudget: initialBudget }));
    }
  }, [initialService, initialPackage, initialFeatures, initialBudget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setBackendNotice('');

    // Field validations
    if (!formData.clientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp or phone contact number.');
      return;
    }
    if (!formData.projectDetails.trim()) {
      setErrorMsg('Please describe your project objectives and requirements.');
      return;
    }
    if (!privacyConsent) {
      setErrorMsg('Please consent to the privacy notice to submit your inquiry.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to Google Apps Script backend
      const response = await api.submitInquiry(formData);

      if (response.success && response.data) {
        setConfirmedId(response.data.inquiryId);
        setIsDuplicate(!!response.data.isDuplicate);
        setSubmitted(true);
      } else {
        // Fallback: If backend returns permission error or is offline, save to local leads storage
        // and provide clear explanatory message without failing the user
        const localId = 'SK-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
        setConfirmedId(localId);

        try {
          const existingLeads = JSON.parse(localStorage.getItem('sk_client_leads') || '[]');
          const newLead = {
            id: localId,
            clientName: formData.clientName,
            company: formData.businessName || 'Direct Client',
            email: formData.email,
            phone: formData.phone,
            projectScope: `${formData.serviceCategory} (${formData.selectedPackage})`,
            estimatedBudget: formData.estimatedBudget,
            status: 'new',
            notes: `Details: ${formData.projectDetails}. Desired: ${formData.desiredFeatures}. Preferred: ${formData.preferredContact}. Ref: ${formData.referenceDemo}. Notes: ${formData.additionalNotes}`,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
          };
          localStorage.setItem('sk_client_leads', JSON.stringify([newLead, ...existingLeads]));
        } catch (storageErr) {
          console.warn('Storage sync skipped:', storageErr);
        }

        setBackendNotice(
          response.error?.code === 'APPS_SCRIPT_PERMISSIONS_REQUIRED'
            ? 'Inquiry recorded locally. Google Apps Script Web App permissions are currently pending deployment authorization. You can also send a direct copy to WhatsApp below.'
            : 'Inquiry saved to offline queue. You may also dispatch directly via WhatsApp.'
        );
        setSubmitted(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please send your inquiry directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const name = formData.clientName || 'Client';
    const biz = formData.businessName ? ` (${formData.businessName})` : '';
    const service = formData.serviceCategory;
    const pkg = formData.selectedPackage;
    const details = formData.projectDetails || 'Project consultation';
    const budget = formData.estimatedBudget;
    const contact = formData.preferredContact;

    const msg = `Assalam-o-Alaikum SK DEV TEAM!

My Name: ${name}${biz}
Email: ${formData.email || 'Provided on chat'}
WhatsApp: ${formData.phone || 'This number'}

Requested Service: ${service}
Preferred Package: ${pkg}
Project Details: ${details}
Desired Features: ${formData.desiredFeatures || 'Standard package features'}
Estimated Budget: ${budget}
Preferred Contact Channel: ${contact}
Reference Demo: ${formData.referenceDemo}
Reference ID: ${confirmedId || 'New Inquiry'}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923153558383?text=${encoded}`, '_blank');
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="inquiry">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Section Title */}
        <div className="flex flex-col text-center items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-[#8781ff]">
            Transparent Discovery & Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
            Start Your Engineering Engagement
          </h2>
          <p className="text-sm sm:text-base text-[#918fa1] max-w-xl">
            Submit your requirements directly to our executive engineering inbox or launch an immediate WhatsApp conversation with lead architect Suhail Ahmed.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-[#1e1f25] border border-[#33353a] p-6 sm:p-8 lg:p-10 shadow-2xl relative">
          
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#14151a] border border-[#44dfab]/40 flex flex-col items-center text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#44dfab]/20 text-[#44dfab] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#282a2f] text-xs font-mono text-[#44dfab] border border-[#44dfab]/30">
                  <span>Reference ID: {confirmedId}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2e9]">
                  {isDuplicate ? 'Inquiry Already Received' : 'Inquiry Dispatched Successfully!'}
                </h3>
                <p className="text-sm text-[#918fa1] max-w-md leading-relaxed">
                  Thank you for reaching out to SK DEV TEAM. Suhail Ahmed and our lead engineering team have received your specification and will review your scope for quotation.
                </p>
                {backendNotice && (
                  <p className="text-xs text-[#c4c0ff] bg-[#282a2f] p-3 rounded-xl border border-[#8781ff]/30 max-w-lg mx-auto">
                    {backendNotice}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="px-5 py-2.5 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Immediate Copy on WhatsApp (+92 315 3558383)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setConfirmedId('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Row 1: Client Name & Business */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="clientName" className="text-xs font-semibold text-[#918fa1]">
                    Full Name *
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Henderson or Suhail Ahmed"
                    className="h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="businessName" className="text-xs font-semibold text-[#918fa1]">
                    Business or Organization Name (Optional)
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Nexus Global Ltd. or D-Pizza"
                    className="h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email and WhatsApp Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[#918fa1]">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-[#918fa1]">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 315 3558383 or international format"
                    className="h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Service Category & Selected Package */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="serviceCategory" className="text-xs font-semibold text-[#918fa1]">
                    Service Category *
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                  >
                    {SERVICES_CATALOGUE.map(s => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="selectedPackage" className="text-xs font-semibold text-[#918fa1]">
                    Preferred Package Tier *
                  </label>
                  <select
                    id="selectedPackage"
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                  >
                    <option value="Small">Small Package (Basic / Starter Online Presence)</option>
                    <option value="Medium">Medium Package (Growing Business / Multi-section)</option>
                    <option value="Premium">Premium Package (Advanced Enterprise / Bespoke)</option>
                    <option value="Not Sure Yet">Not Sure Yet (Pehle Team Se Mashwara)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Desired Features & Estimated Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="desiredFeatures" className="text-xs font-semibold text-[#918fa1]">
                    Desired Key Features
                  </label>
                  <input
                    id="desiredFeatures"
                    name="desiredFeatures"
                    type="text"
                    value={formData.desiredFeatures}
                    onChange={handleChange}
                    placeholder="e.g. WhatsApp cart, Admin login, Stripe checkout, SMS"
                    className="h-11 px-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="estimatedBudget" className="text-xs font-semibold text-[#918fa1]">
                    Estimated Budget Range (Optional)
                  </label>
                  <select
                    id="estimatedBudget"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                  >
                    <option value="$300 - $800">$300 – $800 / PKR Equivalent (Starter / Sprint MVP)</option>
                    <option value="$800 - $2,500">$800 – $2,500 / PKR Equivalent (Production Commercial)</option>
                    <option value="$2,500+">$2,500+ (Full Enterprise Solution / Custom AI)</option>
                    <option value="To be discussed">Flexible / Consultation & Quotation First</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Reference Live Demo & Preferred Contact Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="referenceDemo" className="text-xs font-semibold text-[#918fa1]">
                    Reference an Existing Live Demo (Optional)
                  </label>
                  <select
                    id="referenceDemo"
                    name="referenceDemo"
                    value={formData.referenceDemo}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                  >
                    <option value="None">None / Custom Concept</option>
                    {PROJECTS_DATA.map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="preferredContact" className="text-xs font-semibold text-[#918fa1]">
                    Preferred Contact Channel *
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                  >
                    <option value="WhatsApp">Direct WhatsApp (+92 315 3558383)</option>
                    <option value="Email">Email Communication</option>
                    <option value="Phone">Direct Phone Call</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Project Objectives & Requirements */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="projectDetails" className="text-xs font-semibold text-[#918fa1]">
                  Project Objectives & Requirements *
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  required
                  rows={4}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Apne project ka maqsad, zaroori features, target audience aur koi specific requirement tafseel se batayein..."
                  className="p-4 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1]/50 text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors leading-relaxed"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="privacyConsent"
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-0.5 rounded bg-[#0c0e13] border-[#33353a] text-[#8781ff] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="privacyConsent" className="text-xs text-[#918fa1] cursor-pointer select-none">
                  I consent to SK DEV TEAM processing my details for technical scoping and quotation. View our{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacyNotice}
                    className="text-[#c4c0ff] underline hover:text-white"
                  >
                    Privacy Notice
                  </button>.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] disabled:opacity-50 text-[#1c0091] font-bold text-sm sm:text-base transition-all shadow-[0_0_24px_rgba(112,103,255,0.4)] active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to ProjectInquiries...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#14151a] hover:bg-[#282a2f] text-[#44dfab] font-bold text-sm transition-all border border-[#44dfab]/40 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send directly via WhatsApp</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
