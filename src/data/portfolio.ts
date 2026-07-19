import type { PortfolioMeta, ProjectItem, SocialLink, WorkItem } from '@/types';

// ─── Personal Meta ────────────────────────────────────────────────────────────

// Release asset base URL — update tag if you cut a new release
const RESUME_RELEASE_BASE = 'https://github.com/satyamtg/satyamtg/releases/latest/download';

export const META: PortfolioMeta = {
  name: 'Satyam Kumar',
  firstName: 'SATYAM',
  lastName: 'KUMAR',
  role: 'SDE III',
  company: 'TATA 1mg',
  tagline: 'AI Systems Architect. Building tools that make engineers faster.',
  email: 'io.satyamtg@gmail.com',
  resumeUrl: `${RESUME_RELEASE_BASE}/resume-modern.pdf`,
  resumeVariants: [
    {
      label: '1-Page · Modern',
      url: `${RESUME_RELEASE_BASE}/resume-modern.pdf`,
      description: 'Roboto — best for humans & recruiters',
    },
    {
      label: '1-Page · Classic',
      url: `${RESUME_RELEASE_BASE}/resume-classic.pdf`,
      description: 'Default font — ATS optimised',
    },
    {
      label: '2-Page CV · Modern',
      url: `${RESUME_RELEASE_BASE}/cv-modern.pdf`,
      description: 'Roboto — full detail',
    },
    {
      label: '2-Page CV · Classic',
      url: `${RESUME_RELEASE_BASE}/cv-classic.pdf`,
      description: 'Default font — ATS optimised',
    },
  ],
};

// ─── Work Experience ──────────────────────────────────────────────────────────

export const WORK: WorkItem[] = [
  {
    id: 'tata-1mg',
    title: 'TATA 1mg',
    subtitle: 'SDE III · AI Systems & Platform Engineering',
    description:
      'Joined as SDE I building loyalty infrastructure. Promoted to SDE II shipping DeputyDev, then to SDE III leading multi-agent platform engineering — backed by a published arxiv study.',
    period: 'Oct 2022 – Present',
    timeline: [
      {
        role: 'SDE III · AI Systems & Platform Engineering',
        period: 'Apr 2026 – Present',
        highlights: [
          'Authored persistent multi-agent orchestration framework (PydanticAI) — adopted as core layer across 6+ internal AI products',
          'Built autonomous coding-agent infra with async execution, pause/resume checkpoints, real-time streaming',
          'Extended DeputyDev: Tree-sitter parsing, semantic vector search, multi-provider LLM routing with fallback',
          'Built 1mg MCP — authenticated MCP server exposing commerce tools (search, cart, checkout, order tracking)',
          'Designed AI-assisted catalog system: 40+ entity types, human-in-the-loop approval, full audit history',
        ],
      },
      {
        role: 'SDE II · Backend & AI Platform Engineering',
        period: 'Apr 2024 – Apr 2026',
        highlights: [
          'Built and shipped DeputyDev — multi-model AI assistant + CLI deployed to 300+ engineers, backed by arxiv research',
          'Overhauled query-solving, history, and intent systems — speed 3–4x, chat errors 300+ → <100/day',
          'Re-architected payments/refunds pipeline — 50% less memory, 30% lower latency; refactored Python backend with UV + Ruff',
          'Enhanced Care Plan & Loyalty — 6x adoption (200 → 1,200 orders/day), 30× faster third-party integrations',
        ],
      },
      {
        role: 'SDE I · Backend Engineering',
        period: 'Oct 2022 – Apr 2024',
        highlights: [
          'Built loyalty/rewards service for fault tolerance across high-traffic order flows',
          'Created third-party partnership onboarding system via clean APIs — saved 30× implementation time',
        ],
      },
    ],
    metrics: [
      { value: 30, suffix: '%+', label: 'engineering throughput', decimals: 0 },
      { value: 60, suffix: '%+', label: 'latency & error reduction', decimals: 0 },
      { value: 6, suffix: 'x', label: 'loyalty system adoption', decimals: 0 },
    ],
    tags: ['GenAI', 'LLMs', 'Python', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Kafka', 'RAG', 'RabbitMQ'],
    links: [
      { label: 'Research Paper', url: 'https://arxiv.org/abs/2509.19708', icon: 'paper' },
    ],
    featured: true,
  },
  {
    id: 'speakx',
    title: 'Yellow Class (now SpeakX)',
    subtitle: 'Software Development Engineer',
    description:
      'Built and scaled microservices for a top-10 Indian EdTech application. Owned the communications backend, gamification, and quiz infrastructure.',
    period: 'Jul 2021 – Oct 2022',
    metrics: [
      { value: 5, suffix: 'x', label: 'growth in user interactions', decimals: 0 },
      { value: 1000, suffix: '+', label: 'quiz req/min handled', decimals: 0 },
    ],
    highlights: [
      'Developed communications backend enabling 5x growth in user interactions',
      'Created Quiz module from scratch, handling 1,000+ req/min with minimal resource use',
      'Designed URL shortener with caching and message queues for low-latency performance',
      'Built reusable nested discriminator library in Mongoose; introduced strict typing across services',
      'Implemented backend for mini-games, collectibles, and rewards',
    ],
    tags: ['Node.js', 'TypeScript', 'Mongoose', 'Redis', 'Microservices', 'Message Queues'],
    links: [],
    featured: false,
  },
  {
    id: 'kiwix-gsoc',
    title: 'Kiwix',
    subtitle: 'Student Developer · Google Summer of Code 2020',
    description:
      'Selected to improve Python-based offliners and Zimfarm — a semi-decentralized system that automatically builds ZIM files for archiving the best of the internet for offline access.',
    period: 'Jun 2020 – Aug 2020',
    metrics: [
      { value: 10, suffix: 'x', label: 'faster offlining via S3 cache', decimals: 0 },
      { value: 4, suffix: '', label: 'major open-source projects maintained', decimals: 0 },
    ],
    highlights: [
      'Added S3-based optimization cache to all Python offliners — 10x faster offlining and 10x higher Zimfarm throughput',
      'Built and improved offliners for TED videos, all StackExchange forums, OpenEdX MOOCs, and Project Gutenberg Library',
      'Transitioned offlining to write ZIM files on-the-fly, eliminating intermediate disk writes for faster, more reliable builds',
      'Maintained 4 projects: python_scraperlib, ted2zim, openedx2zim, sotoki — scraperlib adopted by a Mozilla-sponsored project',
      'Enabled code sharing across Python offliners and expanded Zimfarm CI/CD pipeline integrations',
    ],
    tags: ['Python', 'S3', 'ZIM', 'Open Source', 'Zimfarm', 'CI/CD'],
    links: [
      { label: 'GSoC Project', url: 'https://summerofcode.withgoogle.com/projects/#4706577602314240', icon: 'link' },
      { label: 'Work Report', url: 'https://gist.github.com/satyamtg/c2685cd199ef3594b8703f59fd84056d', icon: 'paper' },
    ],
    featured: false,
  },
];

// ─── Open Source / Projects ───────────────────────────────────────────────────

export const PROJECTS: ProjectItem[] = [
  {
    id: 'element-tiles',
    title: 'element-tiles-refind-theme',
    description:
      'Periodic-table-inspired rEFInd bootloader theme with automated CI builds, light/dark variants, and system-package installer.',
    tags: ['Linux', 'rEFInd', 'Shell', 'CI/CD'],
    url: 'https://github.com/satyamtg/element-tiles-refind-theme',
    year: '2021',
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/satyamtg', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/satyamtg', icon: 'linkedin' },
  { label: 'Twitter', url: 'https://twitter.com/satyamtg', icon: 'twitter' },
  { label: 'Email', url: 'mailto:io.satyamtg@gmail.com', icon: 'email' },
];