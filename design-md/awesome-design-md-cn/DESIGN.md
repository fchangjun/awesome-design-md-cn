# Design System: awesome-design-md-cn

## 1. Visual Theme & Atmosphere

awesome-design-md-cn is a Chinese-first resource-library interface built for long browsing sessions. It should feel technical, calm, and editorial instead of loud or overly decorative. The visual language is defined by a light cold-gray canvas, a deep dark hero, and a single restrained blue accent. The goal is low fatigue: reduce color noise, reduce pure-white glare, and keep hierarchy stable even when there are many cards on screen.

The page favors structure over spectacle. A sticky left filter rail creates a stable control area, while the content column on the right stays compact and easy to scan. Cards are intentionally smaller than marketing blocks. They behave like directory entries rather than showcase posters.

This system is especially tuned for Chinese content. Titles should stay concise, descriptive text should be short, and information density should feel deliberate rather than crowded.

**Key Characteristics:**
- Cold gray page canvas with soft white panels
- Deep charcoal hero with restrained glow accents
- One accent color only: electric/cool blue
- Sticky left sidebar for filters on desktop
- Compact directory cards with clear primary/secondary hierarchy
- Low-fatigue surfaces: avoid repeated bright white blocks
- Chinese-first copy density and spacing rhythm

## 2. Color Palette & Roles

### Primary
- **Graphite** (`#111318`): Hero background, strong text, dark containers
- **Ink** (`#1f2937`): Secondary dark text and high-emphasis UI chrome
- **Accent Blue** (`#4b6bff`): Interactive emphasis, active chips, subtle highlights

### Surface & Background
- **Page Canvas** (`#f2f5f9`): Global background, slightly cooler than white
- **Panel White** (`rgba(255, 255, 255, 0.82)`): Main content panels
- **Card Surface** (`#f7f9fc`): Directory cards
- **Raised Surface** (`#fbfcfe`): Hovered cards and emphasized containers
- **Soft Border** (`rgba(15, 23, 42, 0.08)`): Default borders

### Supporting
- **Muted Text** (`rgba(0, 0, 0, 0.62)`): Secondary descriptions
- **Quiet Text** (`rgba(0, 0, 0, 0.48)`): Hints, notes, counts
- **Accent Wash** (`rgba(75, 107, 255, 0.06)`): Active chips, subtle backgrounds

## 3. Typography Rules

### Font Family
- **Primary**: `SF Pro Display, PingFang SC, Hiragino Sans GB, Microsoft YaHei, system-ui, sans-serif`
- **UI Labels / Mono Accent**: `SF Mono, JetBrains Mono, ui-monospace, monospace`

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Title | 48px | 620 | 1.02 | -0.05em | Very concise, one-line preferred |
| Section Title | 28px | 400 | 1.04 | -0.04em | Calm and editorial |
| Card Title | 18px | 640 | 1.08 | -0.04em | Strongest element inside cards |
| Body | 14px | 330 | 1.60 | -0.01em | Main descriptive copy |
| Small UI Text | 13px | 400 | 1.55 | -0.01em | Notes, helper copy |
| Label / Badge | 11px–12px | 540 | 1.00 | 0.04em | Counters, chips, metadata |

### Principles
- Keep Chinese headlines short. Prefer compression through editing, not through tiny font sizes.
- Use weight and spacing for hierarchy before using color.
- Secondary copy should stay lighter and quieter than titles.
- Avoid long multi-line hero paragraphs.

## 4. Component Stylings

### Hero
- Deep dark surface with a soft focused glow
- Very short title + one supporting sentence
- No dense control panels in the hero itself

### Sticky Filter Rail
- Desktop-only sticky behavior
- Soft panel surface, subtle borders, low visual noise
- Search first, then chips for category and scenario
- Chips use pill geometry and very light accent fill for active states

### Directory Cards
- Compact height, designed for scanning
- Card title, subtitle, short summary, one row of metadata, two actions
- Avoid decorative preview blocks unless they contain real information
- Default state should be slightly gray, not pure white

### Buttons & Actions
- Pill radius for lightweight product feel
- Primary action: subtle blue emphasis, not heavy solid fill
- Secondary action: quiet outline / soft white fill
- Actions should not dominate the card

### Panels
- Use soft white translucent panels over the cold-gray canvas
- Keep radius moderate (`12px`)
- Borders should be visible but quiet

## 5. Layout Principles

### Spacing System
- Base rhythm: `8px`
- Common scale: `8 / 12 / 16 / 24 / 32 / 40 / 64`

### Grid & Container
- Outer shell: wide desktop container with breathing room
- Browse area: `sidebar + content` split on desktop
- Featured section first, grouped library second
- Custom cases separated from reference cases

### Whitespace Philosophy
- Use whitespace to separate actions from content, not to create empty spectacle
- Reduce giant decorative gaps in information-heavy pages
- Cards should feel calm and ordered, not oversized

### Border Radius Scale
- `10px`: Cards
- `12px`: Panels
- `999px`: Chips, pills, small actions

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 | Canvas only | Page background |
| Level 1 | Soft border + subtle white panel | Filter rail, section panels |
| Level 2 | Slightly brighter surface | Hovered cards, emphasized blocks |

Depth should come from surface contrast and rhythm, not from heavy shadows.

## 7. Do's and Don'ts

### Do
- Keep the palette restrained and mostly neutral
- Use the blue accent only where interaction or grouping needs help
- Separate custom cases from reference cases
- Let the sidebar stay stable while the result area scrolls
- Make cards compact and easy to compare
- Tune copy density for Chinese reading

### Don't
- Don't fill the page with bright white cards
- Don't use colorful placeholder blocks that carry no information
- Don't put bulky filters inside the hero
- Don't write long hero paragraphs
- Don't turn the page into a marketing landing page
- Don't mix multiple accent colors

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <720px | Single column, sidebar becomes normal block |
| Tablet | 720–960px | Reduced spacing, smaller titles |
| Desktop | 960px+ | Sticky sidebar + multi-column card layout |

### Collapsing Strategy
- Hero compresses to a single-column introduction
- Sidebar loses sticky behavior on smaller screens
- Featured and library grids reduce to one column on mobile
- Keep the same hierarchy; only simplify layout density

## 9. Agent Prompt Guide

### Quick Style Summary
- Cold gray resource-library interface
- Deep charcoal hero
- One restrained cool-blue accent
- Sticky left filter rail
- Compact directory cards
- Chinese-first information density

### Example Prompts
- "Design a Chinese resource library page with a cold-gray canvas, a dark hero, and a restrained cool-blue accent. Use a sticky left filter rail and compact directory cards on the right."
- "Create a low-fatigue design index page. Avoid colorful preview blocks, keep cards slightly gray instead of pure white, and make actions small pill buttons."
- "Build a Chinese tool catalog interface with a calm editorial hierarchy: short hero title, quiet secondary copy, grouped sections, and compact comparison cards."

### Iteration Guide
1. Start with the neutral surface system before adding any accent
2. Keep hero copy extremely short
3. Treat cards as directory entries, not showcases
4. Reduce white glare and color fatigue first
5. Separate custom and reference content explicitly
