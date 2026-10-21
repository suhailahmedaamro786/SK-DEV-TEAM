import React from 'react';
import { Code, Globe, Cpu, Database, Sparkles, Cloud } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="w-5 h-5 text-[#8781ff]" />,
      skills: ['JavaScript (ES6+)', 'TypeScript', 'Python 3.12', 'HTML5 Semantic', 'CSS3 Modern', 'SQL Standard']
    },
    {
      title: 'Frontend Architecture',
      icon: <Globe className="w-5 h-5 text-[#44dfab]" />,
      skills: ['React 19', 'Next.js (App Router)', 'Vite Ecosystem', 'Tailwind CSS v3/4', 'Framer Motion']
    },
    {
      title: 'Backend & APIs',
      icon: <Cpu className="w-5 h-5 text-[#8781ff]" />,
      skills: ['Node.js Enterprise', 'FastAPI Asynchronous', 'RESTful Architecture', 'GraphQL Protocols', 'Stripe Payments API']
    },
    {
      title: 'Databases & State',
      icon: <Database className="w-5 h-5 text-[#44dfab]" />,
      skills: ['PostgreSQL', 'Supabase Realtime', 'Neon Serverless SQL', 'Firebase Cloud', 'Redis Cache']
    },
    {
      title: 'AI & Automation',
      icon: <Sparkles className="w-5 h-5 text-[#8781ff]" />,
      skills: ['Generative AI LLMs', 'Autonomous AI Agents', 'RAG Pipelines', 'MCP (Model Context Protocol)', 'OpenAI & Anthropic SDKs']
    },
    {
      title: 'Deployment & Cloud',
      icon: <Cloud className="w-5 h-5 text-[#44dfab]" />,
      skills: ['Git & GitHub Actions', 'Vercel Edge Network', 'Cloudflare DNS & Workers', 'Docker Containerization', 'CI/CD Automated Testing']
    }
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="technologies">
      <div className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-bold text-[#8781ff]">
            Battle-Tested Modern Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
            Disciplined Technical Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-[#918fa1]">
            We do not chase transient hype. We build on resilient, industry-standard languages, enterprise frameworks, and battle-tested databases.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#1e1f25] border border-[#33353a] shadow-sm flex flex-col gap-4 hover:border-[#8781ff]/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-[#e2e2e9]">
                {cat.icon}
                <h3 className="text-base font-bold">{cat.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#14151a] text-[#c7c4d8] text-xs font-semibold border border-[#33353a]/60 hover:text-white transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
