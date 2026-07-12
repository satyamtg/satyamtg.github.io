import SectionLabel from '@/components/ui/SectionLabel';
import { PROJECTS } from '@/data/portfolio';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => (
  <section id="projects" className="py-28 md:py-40">
    <div className="mx-auto max-w-5xl px-6">
      <SectionLabel number="02" label="Projects" className="mb-14" />
    </div>

    {/* Horizontally scrollable strip — momentum swipe optimized for touch/mobile devices */}
    <div
      className="flex gap-6 overflow-x-auto px-6 pb-6 md:px-[calc((100vw-80rem)/2+1.5rem)] scroll-smooth"
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
    >
      {PROJECTS.map((item, i) => (
        <ProjectCard key={item.id} item={item} index={i} />
      ))}

      {/* Minimalist typographic end signature — breaks boxy layout, no transparency issues */}
      <div className="flex w-64 shrink-0 flex-col items-center justify-center gap-2.5 px-8 text-center select-none">
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse mb-1"
          style={{ background: '#D0BCFF', boxShadow: '0 0 12px #D0BCFF' }}
          aria-hidden="true"
        />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-secondary">
          Next Project
        </span>
        <span className="font-display text-sm font-semibold text-muted leading-relaxed">
          Brewing in the background...
        </span>
      </div>
    </div>
  </section>
);

export default Projects;