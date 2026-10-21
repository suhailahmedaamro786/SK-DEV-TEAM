export type PackageTier = 'Small' | 'Medium' | 'Premium' | 'Not Sure Yet';

export interface PackageDetail {
  name: string;
  subtitle: string;
  features: string[];
  suitableFor: string;
  quotationRequirements?: string;
  priceNote?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  summary: string;
  romanUrduIntro: string;
  whoNeedsIt: string;
  problemSolved: string;
  packages: {
    small: PackageDetail;
    medium: PackageDetail;
    premium: PackageDetail;
  };
  optionalAddons: string[];
  quotationNotice: string;
  relevantProjectIds?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badgeCat: string;
  bannerImg: string;
  liveUrl: string;
  client: string;
  sla: string;
  latency: string;
  desc: string;
  deliverables: string[];
  stack: string[];
  date: string;
  order: number;
  tags: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    rating: number;
    metrics: string;
    duration?: string;
    initials: string;
  };
}

export interface InquiryFormData {
  clientName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  selectedPackage: PackageTier;
  projectDetails: string;
  desiredFeatures: string;
  estimatedBudget: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone';
  referenceDemo: string;
  additionalNotes: string;
}

export interface QuickAction {
  label: string;
  actionKey: string;
  payload?: any;
}

export interface RobotMessage {
  id: string;
  sender: 'robot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: QuickAction[];
  serviceHighlight?: string;
  packageHighlight?: PackageTier;
}

export interface LeadRecord {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  projectScope: string;
  estimatedBudget: string;
  status: 'new' | 'contacted' | 'quoted' | 'progress' | 'closed';
  notes: string;
  createdAt: string;
}
