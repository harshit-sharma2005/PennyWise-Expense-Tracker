# Design System — Analytics Dashboard
> Extracted from deep UI analysis of the dark-mode SaaS analytics dashboard.

---

## 1. Design Philosophy

This dashboard follows a **dark-luxury utilitarian** aesthetic:
- **High-density information** with precise spatial rhythm
- **Neon-green accent** on near-black backgrounds for maximum contrast and brand identity
- **Card-based modular layout** — every section is a self-contained "panel"
- **Minimal chrome, maximum data** — UI elements recede; data is the hero
- Typography is compact and functional; no decorative display fonts
- Micro-details (badges, avatars, dot indicators) carry significant UX weight

---

## 2. Color Tokens

### Background Palette
```
--color-bg-base:         #0d0f0e   /* Page/root background — near-black with faint green tint */
--color-bg-surface:      #141614   /* Primary card/panel background */
--color-bg-elevated:     #1a1d1a   /* Elevated cards, hover states, dropdowns */
--color-bg-sidebar:      #111311   /* Left navigation sidebar */
--color-bg-overlay:      rgba(20, 22, 20, 0.92)  /* Modal/tooltip overlays */
```

### Brand / Accent
```
--color-accent-primary:       #00e676   /* Neon green — CTAs, active states, highlights */
--color-accent-primary-dim:   #00c853   /* Slightly darker green — hover on accent */
--color-accent-primary-glow:  rgba(0, 230, 118, 0.15)  /* Glow/halo behind accent elements */
--color-accent-primary-subtle: rgba(0, 230, 118, 0.08) /* Faint green tint on active nav rows */
```

### Semantic / Status Colors
```
--color-success:        #00e676   /* Same as accent; positive delta indicators */
--color-success-bg:     rgba(0, 230, 118, 0.10)
--color-danger:         #ff4d4f   /* Negative delta, error states */
--color-danger-bg:      rgba(255, 77, 79, 0.10)
--color-warning:        #ffc107   /* Caution/pending states */
--color-warning-bg:     rgba(255, 193, 7, 0.10)
--color-info:           #40a9ff   /* Informational indicators */
--color-info-bg:        rgba(64, 169, 255, 0.10)
```

### Text Palette
```
--color-text-primary:    #e8ebe8   /* Headings, metric values — near-white */
--color-text-secondary:  #9ba89b   /* Subtext, labels, column headers */
--color-text-tertiary:   #5c675c   /* Placeholder, disabled, timestamps */
--color-text-accent:     #00e676   /* Accent-colored text (links, active labels) */
--color-text-inverse:    #0d0f0e   /* Text on accent-colored backgrounds */
```

### Border / Divider
```
--color-border-default:  rgba(255, 255, 255, 0.06)  /* Card outlines, table dividers */
--color-border-strong:   rgba(255, 255, 255, 0.12)  /* Input focus rings, emphasized dividers */
--color-border-accent:   rgba(0, 230, 118, 0.40)    /* Active/selected element borders */
```

### Chart / Data Visualization Colors
```
--color-chart-1:   #00e676   /* Electronics / primary series — neon green */
--color-chart-2:   #1de9b6   /* Furniture / secondary series — teal */
--color-chart-3:   #ffd740   /* Clothes / tertiary series — amber */
--color-chart-4:   #ff6d00   /* Shoes / quaternary series — orange */
--color-chart-5:   #40c4ff   /* Extra series — sky blue */
--color-chart-area-fill: rgba(0, 230, 118, 0.12)  /* Area chart fill under curve */
```

---

## 3. Typography Tokens

### Font Families
```
--font-family-ui:       'DM Sans', 'Söhne', 'Inter', sans-serif
  /* Used for all UI labels, nav items, body copy */

--font-family-mono:     'JetBrains Mono', 'Fira Code', monospace
  /* Used for numeric metric values, IDs, amounts */

--font-family-display:  'DM Sans', sans-serif
  /* Used for large KPI numbers and section headers */
```

### Font Size Scale
```
--font-size-2xs:   10px   /* Timestamps, micro-labels */
--font-size-xs:    11px   /* Table cell secondary info */
--font-size-sm:    12px   /* Table headers, nav items, badges */
--font-size-base:  13px   /* Default body / UI text */
--font-size-md:    14px   /* Card labels, section subheadings */
--font-size-lg:    16px   /* Card titles, widget headings */
--font-size-xl:    20px   /* Section headings (e.g. "Overview") */
--font-size-2xl:   24px   /* KPI metric values (medium) */
--font-size-3xl:   30px   /* KPI metric values (large, e.g. $3.1M) */
--font-size-4xl:   36px   /* Hero/featured single metrics */
```

### Font Weights
```
--font-weight-regular:    400
--font-weight-medium:     500
--font-weight-semibold:   600
--font-weight-bold:       700
```

### Line Heights
```
--line-height-tight:    1.1   /* Large KPI numbers */
--line-height-snug:     1.3   /* Headings */
--line-height-normal:   1.5   /* Body text */
--line-height-relaxed:  1.6   /* Notification/activity text */
```

### Letter Spacing
```
--letter-spacing-tight:   -0.02em   /* Large numbers */
--letter-spacing-normal:   0        /* Body text */
--letter-spacing-wide:     0.04em   /* ALL-CAPS labels, badge text */
--letter-spacing-wider:    0.06em   /* Section category labels */
```

---

## 4. Spacing Tokens

Using an 4px base grid:
```
--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-8:    32px
--space-10:   40px
--space-12:   48px
--space-16:   64px
```

### Component-Specific Spacing
```
--padding-card:           16px 20px
--padding-card-compact:   12px 16px
--padding-sidebar-item:   8px 12px
--padding-table-cell:     10px 14px
--padding-badge:          2px 8px
--gap-card-grid:          12px
--gap-sidebar-sections:   24px
```

---

## 5. Layout Tokens

### Sidebar
```
--sidebar-width:          220px
--sidebar-collapsed-width: 56px
```

### Top Navigation / Header
```
--topbar-height:          48px
```

### Content Area
```
--content-max-width:      100%   /* Full bleed inside content shell */
--content-padding:        20px 24px
```

### Right Panel (Notifications/Contacts)
```
--right-panel-width:      260px
```

### Grid
```
/* KPI row — 4 equal columns */
--grid-kpi-cols:          repeat(4, 1fr)
--grid-kpi-gap:           12px

/* Main content — 2 columns, 60/40 split */
--grid-main-cols:         3fr 2fr
--grid-main-gap:          12px
```

---

## 6. Border & Shape Tokens

```
--radius-sm:      4px    /* Tags, small badges */
--radius-md:      8px    /* Buttons, inputs */
--radius-lg:      12px   /* Cards, panels */
--radius-xl:      16px   /* Large modals */
--radius-full:    9999px /* Pills, avatar circles, toggle switches */

--border-width-default:  1px
--border-default:        1px solid var(--color-border-default)
--border-strong:         1px solid var(--color-border-strong)
--border-accent:         1px solid var(--color-border-accent)
```

---

## 7. Shadow / Elevation Tokens

```
--shadow-sm:      0 1px 3px rgba(0, 0, 0, 0.4)
--shadow-md:      0 4px 12px rgba(0, 0, 0, 0.5)
--shadow-lg:      0 8px 24px rgba(0, 0, 0, 0.6)
--shadow-accent:  0 0 16px rgba(0, 230, 118, 0.20)   /* Glow shadow for accent elements */
--shadow-card:    0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.04)
```

---

## 8. Iconography Tokens

```
--icon-size-xs:    12px
--icon-size-sm:    14px
--icon-size-base:  16px
--icon-size-md:    18px
--icon-size-lg:    20px
--icon-size-xl:    24px

--icon-color-default:   var(--color-text-secondary)
--icon-color-active:    var(--color-accent-primary)
--icon-color-muted:     var(--color-text-tertiary)
```

Style: **Outline icons** at low emphasis, **filled icons** at active/selected states.

---

## 9. Component Design Rules

### 9.1 Cards / Panels
- Background: `--color-bg-surface`
- Border: `--border-default` (very subtle, ~6% white opacity)
- Border radius: `--radius-lg` (12px)
- Shadow: `--shadow-card`
- Padding: `--padding-card` (16px 20px)
- Cards NEVER have white/light backgrounds — always dark surface tones
- Card headers: label in `--color-text-secondary`, 12px, semibold, uppercase with wide letter-spacing

### 9.2 KPI / Metric Widgets
- Value: `--font-size-3xl` or `--font-size-2xl`, `--font-weight-bold`, `--color-text-primary`, monospace
- Label: `--font-size-sm`, `--color-text-secondary`
- Delta badge: colored pill (green/red) with arrow icon + percentage, `--font-size-xs`
- Sparkline: thin 1.5px line, accent green, no axis labels
- Dividers between KPIs: `--color-border-default`

### 9.3 Navigation Sidebar
- Background: `--color-bg-sidebar`
- Active item: `--color-accent-primary-subtle` background, `--color-accent-primary` text & left-border (2px)
- Hover item: `--color-bg-elevated`
- Icons: 16px, colored when active, muted otherwise
- Section labels: 10px, `--color-text-tertiary`, uppercase, wide letter-spacing
- User avatar row at bottom: avatar + name + role, separated by full-width border

### 9.4 Data Tables
- Header row: `--color-text-secondary`, 11px, uppercase, wide letter-spacing
- Body rows: `--font-size-sm`, `--color-text-primary`
- Row dividers: `--color-border-default` (1px)
- Hover row: `--color-bg-elevated`
- Avatars in table: 28px circle, clipped
- No vertical column borders

### 9.5 Buttons
```
/* Primary CTA */
background: var(--color-accent-primary)
color: var(--color-text-inverse)
border-radius: var(--radius-md)
padding: 8px 16px
font-weight: var(--font-weight-semibold)
font-size: var(--font-size-sm)

/* Primary hover */
background: var(--color-accent-primary-dim)
box-shadow: var(--shadow-accent)

/* Ghost / secondary */
background: transparent
border: var(--border-strong)
color: var(--color-text-primary)

/* Icon button */
background: var(--color-bg-elevated)
border: var(--border-default)
border-radius: var(--radius-md)
padding: 6px
```

### 9.6 Badges / Status Pills
```
/* Positive delta */
background: var(--color-success-bg)
color: var(--color-success)
border-radius: var(--radius-full)
padding: 2px 8px
font-size: 11px
font-weight: 500

/* Negative delta */
background: var(--color-danger-bg)
color: var(--color-danger)

/* Neutral */
background: rgba(255,255,255,0.06)
color: var(--color-text-secondary)
```

### 9.7 Donut / Pie Charts
- Stroke-only donut: 8–10px stroke width, gaps between segments: 2px
- Center label: large bold value + sub-label in secondary text
- Legend: color dot (8px circle) + label + value, stacked list, `--font-size-sm`
- Colors: use `--color-chart-1` through `--color-chart-4`

### 9.8 Line / Area Charts
- Grid lines: `--color-border-default`, dashed or very faint
- Axis labels: `--font-size-xs`, `--color-text-tertiary`
- Line: 2px stroke, `--color-accent-primary`
- Area fill: `--color-chart-area-fill` (semi-transparent green)
- Tooltip: `--color-bg-elevated`, `--border-default`, 8px radius, 12px padding

### 9.9 Notifications / Activity Feed
- Each item: icon (colored by type) + text + timestamp
- Icon container: 28px circle, color-matched background at 10% opacity
- Text: 12px, `--color-text-primary`; timestamp: 10px, `--color-text-tertiary`
- No card border on individual items; full-panel border only
- "New" dot indicator: 6px circle, `--color-accent-primary`

### 9.10 Avatar Stack / Contacts
- Avatar: 32px circle, photo or initials fallback
- Initials bg: deterministic color from name hash (use chart color pool)
- Online indicator: 8px green circle, bottom-right, white 1.5px ring

---

## 10. Motion / Animation Rules

```
--duration-instant:   80ms
--duration-fast:      150ms
--duration-base:      250ms
--duration-slow:      400ms
--duration-slower:    600ms

--ease-standard:      cubic-bezier(0.4, 0, 0.2, 1)
--ease-decelerate:    cubic-bezier(0, 0, 0.2, 1)   /* Elements entering */
--ease-accelerate:    cubic-bezier(0.4, 0, 1, 1)   /* Elements leaving */
--ease-spring:        cubic-bezier(0.34, 1.56, 0.64, 1)  /* Bouncy confirmations */
```

### Animation Guidelines
- **Page load**: KPI cards stagger-in with `opacity 0→1` + `translateY(8px)→0`, 60ms delay each
- **Hover states**: background color at `--duration-fast`, no layout shift
- **Number counters**: animate from 0 to value over `--duration-slower` on mount
- **Chart lines**: draw in from left using `stroke-dashoffset` animation
- **Sidebar collapse**: `width` transition at `--duration-base`, `--ease-standard`
- **Tooltips**: fade + scale(0.95→1) at `--duration-fast`
- Avoid decorative animations on data — users must trust data is real, not animated for flair

---

## 11. Z-Index Scale

```
--z-base:       0
--z-raised:     10    /* Cards on hover, sticky table headers */
--z-dropdown:   100   /* Dropdowns, select menus */
--z-sticky:     200   /* Sticky top nav */
--z-overlay:    300   /* Modal backdrops */
--z-modal:      400   /* Modal dialogs */
--z-toast:      500   /* Notification toasts */
--z-tooltip:    600   /* Tooltips */
```

---

## 12. Responsive Breakpoints

```
--bp-sm:   640px    /* Mobile landscape */
--bp-md:   768px    /* Tablet portrait */
--bp-lg:   1024px   /* Tablet landscape / small desktop */
--bp-xl:   1280px   /* Standard desktop */
--bp-2xl:  1536px   /* Wide desktop */
```

### Responsive Behavior Rules
- **< 768px**: Sidebar collapses to icon-only or bottom nav; KPI row stacks 2×2
- **768–1024px**: Right panel hidden; content takes full width
- **> 1280px**: All three columns (sidebar + content + right panel) visible simultaneously
- KPI cards: `min-width: 160px` to prevent metric truncation

---

## 13. Accessibility Rules

- **Contrast**: All body text on dark surfaces must meet WCAG AA (4.5:1). Accent green `#00e676` on `#141614` = ~7.2:1 — AAA compliant.
- **Focus rings**: `outline: 2px solid var(--color-accent-primary); outline-offset: 2px` on all interactive elements
- **Color alone**: Never use color as the sole differentiator — always pair with icon, shape, or label (e.g., delta arrows alongside green/red text)
- **Font size floor**: Never below 11px for legible content (10px only for purely decorative timestamps)
- **Motion**: Respect `prefers-reduced-motion` — disable all transitions/animations and chart draw-in effects

---

## 14. Design Anti-Patterns (DO NOT)

- ❌ Light/white card backgrounds — breaks the dark-luxury aesthetic
- ❌ Purple or blue accents — the identity is green; one accent color only
- ❌ Rounded corners > 16px on cards — looks toy-like
- ❌ Drop shadows with colored tints (except the explicit green glow token)
- ❌ Gradient fills on text (except sparkline area charts)
- ❌ Dense typography < 11px for interactive elements
- ❌ Horizontal scrollbars on the dashboard shell
- ❌ Borders thicker than 1px on cards
- ❌ Full-opacity separators — always use opacity 6–12%
- ❌ Generic placeholder icons (always use a consistent icon set, e.g. Phosphor or Lucide)

---

## 15. CSS Custom Properties — Full Token Sheet

```css
:root {
  /* === COLORS === */
  --color-bg-base:              #0d0f0e;
  --color-bg-surface:           #141614;
  --color-bg-elevated:          #1a1d1a;
  --color-bg-sidebar:           #111311;
  --color-bg-overlay:           rgba(20, 22, 20, 0.92);

  --color-accent-primary:       #00e676;
  --color-accent-primary-dim:   #00c853;
  --color-accent-primary-glow:  rgba(0, 230, 118, 0.15);
  --color-accent-primary-subtle:rgba(0, 230, 118, 0.08);

  --color-success:              #00e676;
  --color-success-bg:           rgba(0, 230, 118, 0.10);
  --color-danger:               #ff4d4f;
  --color-danger-bg:            rgba(255, 77, 79, 0.10);
  --color-warning:              #ffc107;
  --color-warning-bg:           rgba(255, 193, 7, 0.10);
  --color-info:                 #40a9ff;
  --color-info-bg:              rgba(64, 169, 255, 0.10);

  --color-text-primary:         #e8ebe8;
  --color-text-secondary:       #9ba89b;
  --color-text-tertiary:        #5c675c;
  --color-text-accent:          #00e676;
  --color-text-inverse:         #0d0f0e;

  --color-border-default:       rgba(255, 255, 255, 0.06);
  --color-border-strong:        rgba(255, 255, 255, 0.12);
  --color-border-accent:        rgba(0, 230, 118, 0.40);

  --color-chart-1:              #00e676;
  --color-chart-2:              #1de9b6;
  --color-chart-3:              #ffd740;
  --color-chart-4:              #ff6d00;
  --color-chart-5:              #40c4ff;
  --color-chart-area-fill:      rgba(0, 230, 118, 0.12);

  /* === TYPOGRAPHY === */
  --font-family-ui:     'DM Sans', sans-serif;
  --font-family-mono:   'JetBrains Mono', monospace;

  --font-size-2xs:  10px;
  --font-size-xs:   11px;
  --font-size-sm:   12px;
  --font-size-base: 13px;
  --font-size-md:   14px;
  --font-size-lg:   16px;
  --font-size-xl:   20px;
  --font-size-2xl:  24px;
  --font-size-3xl:  30px;
  --font-size-4xl:  36px;

  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:   1.1;
  --line-height-snug:    1.3;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.6;

  --letter-spacing-tight:  -0.02em;
  --letter-spacing-normal:  0;
  --letter-spacing-wide:    0.04em;
  --letter-spacing-wider:   0.06em;

  /* === SPACING === */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;

  /* === LAYOUT === */
  --sidebar-width:       220px;
  --topbar-height:       48px;
  --right-panel-width:   260px;

  /* === BORDERS === */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  --border-default: 1px solid rgba(255, 255, 255, 0.06);
  --border-strong:  1px solid rgba(255, 255, 255, 0.12);
  --border-accent:  1px solid rgba(0, 230, 118, 0.40);

  /* === SHADOWS === */
  --shadow-sm:     0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md:     0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg:     0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-accent: 0 0 16px rgba(0, 230, 118, 0.20);
  --shadow-card:   0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.04);

  /* === MOTION === */
  --duration-instant: 80ms;
  --duration-fast:    150ms;
  --duration-base:    250ms;
  --duration-slow:    400ms;
  --duration-slower:  600ms;

  --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === Z-INDEX === */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
  --z-tooltip:  600;
}