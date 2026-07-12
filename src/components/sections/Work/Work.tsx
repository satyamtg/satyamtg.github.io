import SectionLabel from '@/components/ui/SectionLabel';
import { WORK } from '@/data/portfolio';
import { WORK_ACCENT_COLORS } from '@/lib/palette';
import WorkCard from './WorkCard';

const Work: React.FC = () => (
  <section id="work" className="relative overflow-hidden py-28 md:py-40">
    <div className="relative z-10 mx-auto max-w-6xl px-6">
      <SectionLabel number="01" label="Work Experience" className="mb-16" />

      {/*
        3-item bento:
          Row 1: 1mg — full width (md:col-span-2), has inner timeline
          Row 2: SpeakX | Kiwix — side by side
      */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {WORK.map((item, i) => (
          <WorkCard
            key={item.id}
            item={item}
            index={i}
            accentColor={WORK_ACCENT_COLORS[i % WORK_ACCENT_COLORS.length]}
            fullWidth={item.featured}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Work;