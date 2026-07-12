import SectionLabel from '@/components/ui/SectionLabel';
import { META } from '@/data/portfolio';
import { getChipStyle } from '@/lib/palette';
import { motion } from 'framer-motion';
import React from 'react';

// Categorised skills for cleaner, premium bento card organization
const SKILL_CATEGORIES = [
  {
    title: 'AI & Systems Engineering',
    skills: ['LLM Orchestration', 'RAG Pipelines', 'Prompt Optimization', 'Vector Search', 'Model Evaluation'],
  },
  {
    title: 'Core Backend Architectures',
    skills: ['Python', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Platforms & Distributed Systems',
    skills: ['RabbitMQ', 'Kafka', 'Docker', 'API Governance', 'CI/CD Pipelines'],
  },
];

const About: React.FC = () => {
  // Track cursor spotlight tracking inside M3 cards
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionLabel number="03" label="About Me" className="mb-16" />

      {/* Asymmetrical Bento Grid */}
      <div className="grid gap-6 md:grid-cols-12">

        {/* ── CARD 1: Journey & Bio (Spans 8 columns on desktop) ────── */}
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="m3-card p-5 sm:p-8 md:p-10 md:col-span-8 flex flex-col gap-6"
        >
          <h2 className="relative z-10 font-display text-3xl font-bold text-primary md:text-4xl leading-tight">
            AI Systems Architect,<br />
            <span className="text-gradient">Backend Developer.</span>
          </h2>

          <div className="relative z-10 flex flex-col gap-5 font-body text-[0.95rem] leading-relaxed text-secondary">
            <p>
              I am an SDE 3 at{' '}
              <a
                href="https://www.1mg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-[#EFB8C8] transition-colors duration-250 font-medium underline underline-offset-4 decoration-accent/30"
              >
                TATA 1mg
              </a>
              , where I lead GenAI product adoption across our engineering divisions. I built{' '}
              <a
                href="https://arxiv.org/abs/2509.19708"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-[#EFB8C8] transition-colors duration-250 font-medium underline underline-offset-4 decoration-accent/30"
              >
                DeputyDev
              </a>
              {' '}— an AI developer assistant and CLI used by over 300+ engineers, which is backed by a published research paper.
            </p>
            <p>
              Before leading AI systems at 1mg, I engineered loyalty, gamification, and high-throughput communications microservices at{' '}
              <span className="text-primary font-medium">SpeakX (Yellow Class)</span>, and designed optimization caching and offliners for offline internet systems at{' '}
              <span className="text-primary font-medium">Kiwix</span> as a Google Summer of Code developer.
            </p>
            <p>
              I specialize in building typed, stateless, rate-limited multi-model backends, low-latency search systems, and robust distributed event streaming architectures.
            </p>
          </div>
        </motion.div>

        {/* ── CARD 2: Portrait crop (Spans 4 columns on desktop) ─────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-4 flex items-center justify-center"
        >
          {/* M3 Organic Symmetrical-Rounded Shape with subtle rotating border glow */}
          <div className="relative w-full aspect-square max-w-[280px] md:max-w-none group">
            {/* Spinning background glow */}
            <div
              className="absolute inset-0 rounded-[3rem_1rem_3rem_3rem] bg-gradient-to-tr from-accent/20 via-tertiary/15 to-[#3B82F6]/10 blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            {/* Inner avatar cropped image */}
            <div className="relative h-full w-full overflow-hidden rounded-[3rem_1rem_3rem_3rem] border border-[rgba(208,188,255,0.25)] bg-[#171224]">
              <img
                src="https://avatars.githubusercontent.com/satyamtg"
                alt={`${META.name} — portrait`}
                className="h-full w-full object-cover grayscale brightness-95 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Outlined decoration pill overlay */}
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-[2rem_0.5rem_2rem_2rem] border-2 border-accent/25 group-hover:border-accent/50 transition-colors duration-300"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* ── CARD 3: Categorised Skills Bento (Spans 8 columns) ───────── */}
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="m3-card p-5 sm:p-8 md:p-10 md:col-span-8 flex flex-col gap-6"
        >
          <h3 className="relative z-10 font-display text-xl font-bold text-primary">
            Technical Arsenal
          </h3>

          <div className="relative z-10 flex flex-col gap-6">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className="flex flex-col gap-2.5">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">
                  {category.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="m3-chip" style={getChipStyle(skill)}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CARD 4: Quick Facts Bento (Spans 4 columns) ─────────────── */}
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="m3-card p-5 sm:p-8 md:p-10 md:col-span-4 flex flex-col justify-between gap-8"
        >
          <h3 className="relative z-10 font-display text-xl font-bold text-primary">
            Quick Facts
          </h3>

          <div className="relative z-10 flex flex-col gap-5 font-body text-[0.88rem] leading-relaxed text-secondary">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider font-mono">B.Tech CS</span>
              <span className="text-primary font-medium text-sm">IIT Kalyani · CGPA 9.26/10</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider font-mono font-medium">SIH 2020</span>
              <span className="text-primary font-medium text-sm">National Winner · Smart India Hackathon</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider font-mono">Open Source</span>
              <span className="text-primary font-medium text-sm">GSoC Alum & GCI Mentor</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;