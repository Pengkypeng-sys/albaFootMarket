---
name: Alba Culinary & Frozen Ecosystem
colors:
  surface: '#fff8f6'
  surface-dim: '#e2d8d6'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf1ef'
  surface-container: '#f6ecea'
  surface-container-high: '#f0e6e4'
  surface-container-highest: '#eae0de'
  on-surface: '#1f1b1a'
  on-surface-variant: '#5e3f3a'
  inverse-surface: '#352f2e'
  inverse-on-surface: '#f9eeec'
  outline: '#936e68'
  outline-variant: '#e9bcb5'
  surface-tint: '#c00500'
  primary: '#b30400'
  on-primary: '#ffffff'
  primary-container: '#e10600'
  on-primary-container: '#fff2f0'
  inverse-primary: '#ffb4a8'
  secondary: '#006d30'
  on-secondary: '#ffffff'
  secondary-container: '#97f8a7'
  on-secondary-container: '#037434'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfa600'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410100'
  on-primary-fixed-variant: '#930300'
  secondary-fixed: '#97f8a7'
  secondary-fixed-dim: '#7cdb8e'
  on-secondary-fixed: '#00210a'
  on-secondary-fixed-variant: '#005322'
  tertiary-fixed: '#ffe087'
  tertiary-fixed-dim: '#efc112'
  on-tertiary-fixed: '#231a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fff8f6'
  on-background: '#1f1b1a'
  surface-variant: '#eae0de'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Brand Personality & Philosophy
This design system bridges two interconnected culinary tiers: the vibrant, appetizing freshness of the parent market brand and the robust, convenient reliability of its frozen foods line. The brand personality is deeply welcoming, trustworthy, and culinary-driven—evoking warmth, fresh market abundance, and immediate appetite appeal. It communicates community intimacy alongside commercial-grade freshness.

### Target Audience
- Household pantry managers and home cooks seeking fresh produce, pantry staples, and ready-to-cook meal solutions.
- Commercial B2B wholesale buyers, culinary entrepreneurs, and authorized resellers seeking reliable margins, batch orders, and bulk supply.
- Busy urban professionals who prioritize food safety, rapid delivery, and seamless WhatsApp ordering.

### Emotional Response
The interface must evoke:
- **Culinary Appetite:** Visual warmth that makes food appear fresh, rich, and craveable.
- **Assurance & Freshness:** Crisp hygiene, strict temperature integrity, and product quality.
- **Frictionless Convenience:** Immediate legibility, swift transactions, and approachable social commerce channels (notably direct WhatsApp ordering).

### Design Style: Modern Tactile Warmth
A synthesis of modern clean retail commerce and tactile warmth. The visual aesthetic utilizes warm cream canvas foundations rather than clinical blue-whites, combined with generous rounded geometries (`rounded-2xl`), soft micro-borders, organic leaf accents, appetizing chromatic highlights, and distinct, high-conversion communication tags.

## Colors

### Palette Strategy & Brand Hierarchy
The palette orchestrates the dual-tier brand narrative:
- **Primary Red (`#E10600`):** Shared focal core for both the parent brand and the frozen line. Expresses appetite, energy, promotional urgency, and assertive brand identity. High contrast pairing with white or deep cream is strictly enforced.
- **Secondary Green (`#1B803E` / Deep `#0E4D25`):** Denotes natural market freshness, organic leafy accents, and culinary safety. Deep green acts as high-contrast structural text and foundational accents for wholesale/reseller tiers.
- **Tertiary Accent Yellow (`#FFD028`):** Highlights, promotional starbursts, ratings, special culinary callouts, and seasonal incentives. Must pair with `#0E4D25` or `#2B2625` for text elements to retain WCAG AA conformance.
- **WhatsApp Action Green (`#25D366`):** Dedicated utility action color strictly isolated for instant direct ordering, live customer care, and conversational checkout actions.
- **Canvas Neutrals (`#FFFDF9` / `#FDFBF7` / `#FDF7E7`):** Warm, inviting culinary backdrops. Cream pills (`#FDF7E7`) serve as background chips for the frozen sub-line badges.
- **Deep Charcoal Neutral (`#2B2625`):** A warm, culinary-tinted charcoal used for standard body copy, avoiding harsh absolute black.

### WCAG AA Compliance Rules
- Small text (<18px regular or <14px bold) against backgrounds must maintain at least a 4.5:1 contrast ratio.
- Primary Red (`#E10600`) passes 4.5:1 on pure white and warm cream `#FFFDF9` when paired with bold display weights; for small informational text, pair with Deep Green (`#0E4D25`) or Charcoal (`#2B2625`).
- Tertiary Yellow (`#FFD028`) must never host white text; use Charcoal (`#2B2625`) or Deep Forest (`#0E4D25`) text only.
- WhatsApp CTA (`#25D366`) features high-contrast dark forest `#083B1A` or pure white `#FFFFFF` text depending on weight, verified at ≥ 4.5:1 ratio.

## Typography

### Hierarchy & Pairing Rationale
- **Headlines (Epilogue):** An expressive, structural geometric grotesque with substantial weight and warmth. It commands attention for retail pricing, promotional campaigns, and appetizing frozen meal banners, evoking craftsmanship and modern culinary identity.
- **Body & Labels (Plus Jakarta Sans):** Highly legible, friendly, and soft-cornered sans-serif with exceptional rendering at small scale. Used across ingredient lists, frozen storage handling instructions, reseller tier breakdowns, and interactive CTA buttons.

### Editorial Guidelines
- Use uppercase styling exclusively for `label-sm` metadata tokens (e.g., reseller badges, batch weight, temperature tags like `BEKU -18°C`).
- Maintain generous line-heights on mobile to prevent accidental tap overlaps on dense catalog grids.

## Layout & Spacing

### Layout Philosophy
The design system employs a structured **12-column responsive fluid grid** with bounded max-widths for desktop experiences (max 1280px) and a continuous fluid scroll experience on mobile.

- **Desktop (1024px+):** 12 columns, 24px (1.5rem) gutters, 32px (2rem) page margins. Cards display in 4-column or 3-column configurations.
- **Tablet (768px - 1023px):** 8 columns, 16px (1rem) gutters, 24px (1.5rem) margins.
- **Mobile (320px - 767px):** 4 columns, 16px (1rem) gutters, 16px (1rem) outer canvas margin. Catalog products appear in an efficient 2-column card reflow with horizontal sliding lanes for quick categories.

### Spacing Rhythm
- Standard 8pt base grid for macro-spacing and 4pt micro-grid for internal component alignments.
- Compact inner padding inside product tiles ensures high information density without visual crowding.

## Elevation & Depth

### Surface Strategy
Depth is primarily established via **tonal layering** and **soft ambient illumination**, avoiding stark drop shadows to preserve the clean, hygienic retail aesthetic.

- **Level 0 (Canvas Base):** Warm Cream (`#FFFDF9` or `#FDFBF7`), un-elevated, providing a cozy domestic backdrop.
- **Level 1 (Card & Content Surface):** Pure White (`#FFFFFF`) containers resting upon cream backgrounds, bounded by soft micro-borders (`1px solid rgba(43, 38, 37, 0.06)`).
- **Level 2 (Interactive Floating Elements):** WhatsApp quick-order pills, sticky checkout navigation, and cart docks. Shadow profile: `0px 8px 24px -4px rgba(27, 128, 62, 0.18)` for WhatsApp CTAs, and `0px 8px 20px -4px rgba(225, 6, 0, 0.15)` for promotional banners.
- **Level 3 (Modals & Overlays):** Wholesale calculation sheets, frozen product nutrition details, with `0px 16px 36px -6px rgba(14, 77, 37, 0.22)`.

## Shapes

### Shape Language & Geometry
The system uses rounded geometry with a standard base of **`rounded-2xl` (1rem / 16px)** for primary cards, visual hero cards, promotional banners, and product wrappers. 

- **Full Pill (`rounded-full`):** Reserved for contextual badges (Reseller tags, "Siap Saji" indicators), WhatsApp quick CTA buttons, search inputs, and quantity incrementers.
- **Medium Round (`rounded-xl` / 12px):** Applied to secondary input elements, internal image wrappers inside cards, and modal dismiss actions.
- **Delicate Edge Framing:** All rounded cards carry a 1px border (`rgba(43, 38, 37, 0.08)`) to preserve physical separation when white cards overlap light cream surfaces.

## Components

### 1. Buttons
- **Primary Action (Brand Red):** Filled `#E10600`, text `#FFFFFF`, font `label-lg`, height 48px, `rounded-xl`. Subtly expands on hover with an ambient red glow.
- **WhatsApp Direct Order CTA:** Filled WhatsApp Green (`#25D366`), white bold text, prefixed by the WhatsApp chat icon. Minimum tap target 48px, pill-shaped (`rounded-full`), accompanied by a persistent micro-ping indicator for live operator availability.
- **Secondary / Reseller Outline Action:** 1.5px border `#0E4D25`, text `#0E4D25`, transparent background, `rounded-xl`.

### 2. Badges & Chips
- **Albafroz Sub-Brand Chip:** Pill container `#FDF7E7` featuring a miniature green leaf icon accent, `#E10600` bold typography (`label-sm`), and soft border `#F3E6C4`.
- **Reseller / Grosir Tier Badges:** High-contrast background in `#0E4D25` (Deep Forest) with `#FFD028` (Bright Yellow) text, denoting bulk savings and wholesale tier thresholds (e.g., `MIN. 10 PCS - HARGA RESELLER`).
- **Category Filter Chips:** Inactive in `#FFFFFF` with soft border; active state switches to `#1B803E` background with `#FFFFFF` text.

### 3. Product Cards
- **Parent Brand / Fresh Produce Card:** White surface, `rounded-2xl`, 1px boundary border `#2B2625` at 6% opacity. High-contrast price in `#E10600`, unit indicator (`/ pack`, `/ kg`) in `#2B2625` muted.
- **Albafroz Frozen Food Card:** Includes frost-safe indicator tag (`Simpan Beku -18°C`), bold red header, warm cream `#FDF7E7` meta-badge for cooking time, and one-tap "Pesan via WhatsApp" quick-add button.

### 4. Input Fields
- Heights set to 48px for effortless touch ergonomics on mobile.
- Background pure `#FFFFFF`, border 1.5px `#E8E4DD`, corner radius `rounded-xl`.
- Focus ring: 3px semi-transparent forest green glow (`rgba(27, 128, 62, 0.2)`) with border transition to `#1B803E`.

### 5. Checkboxes & Radio Controls
- Base control 20px × 20px, `rounded-md` (checkbox) or `rounded-full` (radio).
- Active state filled with `#1B803E` with high-contrast pure white checkmark icon.

### 6. Specialized Reseller Margin Calculator Card
- Dedicated card component featuring a soft cream gradient background (`#FFFDF9` to `#FDF7E7`), structured list of bulk tiers, and an immediate visual indicator of projected profit margins for resellers.