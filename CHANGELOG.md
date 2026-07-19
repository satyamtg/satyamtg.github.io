# Changelog

All notable changes to the portfolio site are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.1.1] — 2026-07-19

### Fixed
- Hero: replaced single download button with split button + variant picker dropdown
- All 4 résumé variants (1-page/2-page × classic/modern) now accessible from the Hero CTA
- Dropdown closes on outside click or variant selection

---

## [1.1.0] — 2026-07-19

### Added
- `ResumeVariant` interface in `src/types/index.ts`
- `resumeVariants: ResumeVariant[]` field on `PortfolioMeta` type
- 4 resume download variants in `META` (all served from GitHub Releases CDN):
  - `1-Page · Modern` — Roboto, best for human readers
  - `1-Page · Classic` — Default font, ATS optimised
  - `2-Page CV · Modern` — Roboto, full detail
  - `2-Page CV · Classic` — Default font, ATS optimised

### Fixed
- Tata 1mg SDE III period corrected: `Apr 2024 – Present` → `Apr 2026 – Present`
- Added missing SDE II timeline entry (`Apr 2024 – Apr 2026`) with correct highlights
  (DeputyDev launch, payments refactor, Care Plan 6× adoption)
- SDE I now has its own timeline entry (`Oct 2022 – Apr 2024`)
- Role label standardised: `SDE 3` → `SDE III`
- `resumeUrl` migrated from local static file (`/downloads/satyamtg_resume.pdf`)
  to GitHub Releases CDN (`releases/latest/download/resume-modern.pdf`)

---

## [1.0.0] — 2026-07

- Initial portfolio release: M3 Expressive design, Vite/React/GSAP, particle wave hero,
  work timeline, projects, contact section.