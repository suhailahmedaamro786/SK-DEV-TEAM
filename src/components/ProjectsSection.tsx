import React, { useState, useMemo } from 'react';
import { Search, X, ExternalLink, ArrowRight, Eye, Copy, MessageCircle } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onOpenSpec: (project: ProjectItem) => void;
  onBuildSimilar: (projectName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenSpec,
  onBuildSimilar
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'alpha'>('featured');

  const categories = [
    { id: 'all', label: 'All Repositories' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: 'AI & Automation', label: 'AI & Automation' },
    { id: 'Education & LMS', label: 'Education & LMS' },
    { id: 'Enterprise & Admin', label: 'Enterprise & Admin' },
    { id: 'Web Platforms', label: 'Web Platforms' }
  ];

  const filteredProjects = useMemo(() => {
    let result = PROJECTS_DATA.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.stack.some(s => s.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });

    if (sortBy === 'alpha') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      result.sort((a, b) => a.order - b.order);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="projects">
      <div className="flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8781ff]">
              Demonstrated Proof of Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e2e2e9] tracking-tight">
              Engineered Platforms in Production
            </h2>
            <p className="text-sm sm:text-base text-[#918fa1] max-w-xl">
              Live web systems with verified uptime, modern architecture, and performance-first execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1e1f25] border border-[#33353a] text-[#44dfab] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#44dfab] animate-pulse" />
              6 Active Verified Client Deployments
            </span>
          </div>
        </div>

        {/* Search, Filter & Controls Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1e1f25] border border-[#33353a] flex flex-col gap-4 shadow-md">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input: allow the field to shrink on mobile instead of forcing a wider page. */}
            <div className="relative flex-1 min-w-0 w-full">
              <Search className="w-4 h-4 text-[#918fa1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, technology (e.g., Next.js, Stripe, FastAPI)..."
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-[#0c0e13] text-[#e2e2e9] placeholder:text-[#918fa1] text-xs sm:text-sm border border-[#33353a] focus:outline-none focus:border-[#8781ff] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#918fa1] hover:text-[#e2e2e9]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#918fa1] uppercase font-semibold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-11 px-3 py-2 rounded-xl bg-[#0c0e13] text-[#e2e2e9] text-xs font-semibold border border-[#33353a] focus:outline-none focus:border-[#8781ff] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Releases</option>
                  <option value="alpha">Name (A – Z)</option>
                </select>
              </div>

              <div className="px-3.5 py-2.5 rounded-xl bg-[#282a2f] text-xs font-semibold text-[#c7c4d8] flex items-center gap-1.5 whitespace-nowrap border border-[#33353a]">
                <span className="text-[#8781ff] font-bold font-mono">{filteredProjects.length}</span>
                <span>deployments</span>
              </div>
            </div>
          </div>

          {/* Category Tabs: chips scroll within their row on phones rather than widening the page. */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#8781ff] text-[#1c0091] shadow-md'
                    : 'bg-[#14151a] hover:bg-[#282a2f] text-[#918fa1] hover:text-[#e2e2e9] border border-[#33353a]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center p-8 rounded-2xl bg-[#1e1f25] border border-[#33353a] space-y-3">
            <h3 className="text-lg font-bold text-[#e2e2e9]">No matching projects found</h3>
            <p className="text-sm text-[#918fa1]">Adjust your search query or reset category filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#8781ff] text-[#1c0091] font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-2xl bg-[#1e1f25] border border-[#33353a] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#8781ff]/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-[#282a2f]">
                  <img
                    src={p.bannerImg}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f25] via-[#1e1f25]/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#111318]/90 text-[#c4c0ff] text-[11px] font-semibold uppercase">
                      {p.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#44dfab]/20 text-[#44dfab] text-[10px] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#44dfab]" /> Live
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-3">
                    <span className="font-mono text-[10px] text-[#e2e2e9] px-2 py-0.5 rounded bg-[#111318]/80 backdrop-blur-sm">
                      {p.sla}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#e2e2e9] group-hover:text-[#c4c0ff] transition-colors">
                        {p.title}
                      </h3>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-lg text-[#918fa1] hover:text-[#e2e2e9] hover:bg-[#282a2f] transition-colors"
                        title="Open Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-xs text-[#918fa1] line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.stack.slice(0, 3).map((st, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#14151a] text-[11px] text-[#c7c4d8] border border-[#33353a]/60">
                          {st}
                        </span>
                      ))}
                      {p.stack.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#14151a] text-[10px] text-[#918fa1]">
                          +{p.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-[#33353a] space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenSpec(p)}
                        className="w-full py-2 px-3 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8781ff]" />
                        <span>View Spec</span>
                      </button>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-[#8781ff] hover:bg-[#c4c0ff] text-[#1c0091] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        <span>Launch Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => onBuildSimilar(p.title)}
                      className="w-full text-center py-1 text-[11px] text-[#44dfab] hover:text-[#67fcc6] transition-colors flex items-center justify-center gap-1 font-medium"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Build Similar Architecture</span>
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* Technical Standard Compliance Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1e1f25] via-[#282a2f] to-[#1e1f25] border border-[#8781ff]/30 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-bold text-[#44dfab] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#44dfab]" />
              Technical Standard Compliance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#e2e2e9]">
              Need custom enterprise software deployed with these production benchmarks?
            </h3>
            <p className="text-xs sm:text-sm text-[#918fa1] leading-relaxed">
              Every build includes 100% test coverage for mission-critical routes, automated CI/CD staging via Vercel / Docker, sub-second edge latency, and turnkey handoff documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/923153558383?text=Hello%20SK%20DEV%20TEAM!%20I%20would%20like%20to%20discuss%20a%20new%20enterprise%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#44dfab] hover:bg-[#67fcc6] text-[#003827] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fast WhatsApp Inquiry</span>
            </a>
            <a
              href="mailto:suhailahmedaamro786@gmail.com?subject=Project%20Scope%20Inquiry%20-%20SK%20DEV%20TEAM"
              className="px-5 py-2.5 rounded-xl bg-[#282a2f] hover:bg-[#33353a] text-[#e2e2e9] font-semibold text-xs sm:text-sm transition-colors border border-[#33353a]"
            >
              <span>Send Specs by Email</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
