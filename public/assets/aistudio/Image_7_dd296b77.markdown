---
name: Obsidian Kinetic
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1b21'
  surface-container: '#1e1f25'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c4c0ff'
  primary: '#c4c0ff'
  on-primary: '#2100a4'
  primary-container: '#8781ff'
  on-primary-container: '#1c0091'
  inverse-primary: '#5145df'
  secondary: '#44dfab'
  on-secondary: '#003827'
  secondary-container: '#00bf8e'
  on-secondary-container: '#004732'
  tertiary: '#c4c7c9'
  on-tertiary: '#2d3133'
  tertiary-container: '#8e9193'
  on-tertiary-container: '#272a2c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c0ff'
  on-primary-fixed: '#110068'
  on-primary-fixed-variant: '#3725c7'
  secondary-fixed: '#67fcc6'
  secondary-fixed-dim: '#44dfab'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#00513a'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
typography:
  display:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: '700'
    lineHeight: 4.5rem
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.875rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  title-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
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
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses high-conviction digital craftsmanship, forward momentum, and architectural precision. Built for ambitious enterprises and scaling tech businesses, the aesthetic blends the refined discipline of executive enterprise software with the kinetic energy of an elite design engineering firm.

The identity operates at the intersection of **Minimalism**, **Glassmorphism**, and **Deep Dark Mode Precision**:
- **Atmospheric Depth:** Deep canvas backdrops are treated as physical spatial dimensions, punctuated by controlled luminance rather than arbitrary decoration.
- **Micro-Glow Kinetics:** High-energy accents in electric indigo and emerald cyan function as optical beacons for active interaction and system feedback.
- **Editorial Technology:** Razor-sharp geometry, disciplined typographic alignment, and quiet negative space communicate engineering rigor, maturity, and uncompromising quality.

## Colors

The system uses a calibrated palette optimized for high dynamic range in dark environments, alongside a corresponding high-clarity light mode.

### Palette Architecture
- **Primary Canvas (`#0B0D12`):** Pure deep charcoal grounding the primary viewports.
- **Surface Elevation (`#141821`):** Subdued obsidian layer creating baseline container contrast.
- **Surface Highlight / Glass Layer (`#1B202D` at variable opacities):** Used for floatable panels, elevated cards, and tooltips.
- **Electric Indigo (`#7067FF`):** Primary driver for direct conversion targets, selection states, active states, and radiant edge gradients.
- **Emerald Cyan (`#21C997`):** Secondary accent reserved for production health metrics, success validation, growth vectors, and micro-accents.
- **Slate Text Muted (`#A4A9B8`):** Low-strain secondary copy, structural metadata, and descriptive labels.
- **Display Bright (`#F8FAFC`):** Crisp high-contrast typographic highlights and critical headings.

### Light Mode Adaptation
When operating in light mode:
- The base background shifts to `#F8FAFC`.
- Secondary elevated surfaces map to `#FFFFFF` with muted borders (`#E2E8F0`).
- Text elements invert: Primary copy shifts to `#0B0D12` and supporting copy to `#475569`.
- Accents maintain chromatic fidelity: Primary transforms to `#5B50FF` and secondary to `#0D9488` for sustained contrast ratios exceeding WCAG AAA standards.

## Typography

Typography relies on a tailored implementation of `Inter` combined with system-native fallbacks. Metrics prioritize neutral horizontal tracking and negative tracking on larger display headlines to deliver a tight, industrial look.

- **Weight Discipline:** The hierarchy is anchored by strict pairing: `700` and `600` for punchy, impactful statements; `400` for scanning ergonomics in paragraphs; and `600` in all-caps or small-scale tags.
- **Numeric Rhythm:** Enable tabular lining figures (`font-variant-numeric: tabular-nums`) across all data displays, telemetry, and transactional summaries to prevent visual jumping during dynamic updates.
- **Headings & Hierarchy:** Headlines should consistently utilize the tight letter-spacing defined in the tokens to maintain tension and balance across dark viewports.

## Layout & Spacing

This design system uses a strict 12-column fluid grid system pinned to a maximum canvas constraint of `1440px` for desktop viewports, downscaling to 8 columns on tablet devices (`768px - 1023px`), and 4 columns across mobile devices (`< 768px`).

- **Grid Spacing Rhythm:** Built entirely upon an 8-point base module. Vertical rhythms within cards and interior layouts step through increments of `4px` (`space-xs`) and `8px` (`space-sm`) for compact component density, shifting to `16px` (`space-md`), `24px` (`space-lg`), and `40px` (`space-xl`) for macroscopic pacing.
- **Section Transitions:** High-impact landing page blocks enforce vertical gutters of `80px` to `120px` to establish atmospheric pauses between capabilities, proof metrics, and architectural showcases.
- **Fluid Stacking:** Responsive components switch automatically from multi-column grid alignment to full-bleed, vertically stacked patterns below the `768px` threshold, retaining internal horizontal card padding at `1.25rem`.

## Elevation & Depth

Spatial depth is conveyed without heavy, opaque dropped shadows. Instead, it relies on tonal stacking, variable ambient glows, and illuminated micro-borders.

### Surface Tiers
- **Tier 0 (Backdrop):** `#0B0D12` at 100% opacity. The infinite canvas.
- **Tier 1 (Base Panel):** `#141821` with a hairline top border: `1px solid rgba(255, 255, 255, 0.06)`.
- **Tier 2 (Interactive Cards / Dropdowns):** Backdrop filter `blur(12px)`, background `rgba(20, 24, 33, 0.75)`, and an inset ring `1px solid rgba(255, 255, 255, 0.08)`.
- **Tier 3 (Modals / Floats):** Background `rgba(27, 32, 45, 0.95)`, paired with an ambient diffuse shadow `0 24px 48px -12px rgba(0, 0, 0, 0.65)`.

### Chromatic Light Emittance
Hover states and elevated active elements activate back-projected glows:
- **Indigo Pulse:** `0 0 32px -4px rgba(112, 103, 255, 0.25)` applied dynamically behind active calls-to-action or featured service items.
- **Cyan Signal:** `0 0 24px -4px rgba(33, 201, 151, 0.20)` reserved for live status indicators and real-time interactive nodes.

## Shapes

The interface balances sharp geometric poise with tactical ergonomics:

- **Standard Elements (0.5rem / 8px):** Applied to form fields, small buttons, tags, system toasts, and micro-cards.
- **Cards & Enclosures (`rounded-lg` / 1rem / 16px):** Standard boundary for high-level module grouping, solution cards, interactive dashboards, and modal interfaces.
- **Hero Containers (`rounded-xl` / 1.5rem / 24px):** Reserved for framing outer application shells, hero visuals, and nested media galleries.
- **Pill Exceptions:** Filter badges, state badges, and status pips use full circular radii (`9999px`) to distinguish categorical tags from interactive planar controls.

## Components

### Buttons
- **Primary:** Background `#7067FF`, text `#FFFFFF`, radius `0.5rem`, padding `0.75rem 1.5rem`. Hover triggers a brightness increase (`#8078FF`) and an electric-indigo halo (`0 0 20px rgba(112, 103, 255, 0.35)`). Active state applies a subtle scale compression (`scale(0.98)`).
- **Secondary (Glass):** Background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#F8FAFC`. Hover sets border to `rgba(255, 255, 255, 0.24)` and background to `rgba(255, 255, 255, 0.08)`.
- **Tertiary / Ghost:** Borderless, text `#A4A9B8`, hover text `#F8FAFC`.

### Cards
- **Base Style:** Background `#141821`, border `1px solid rgba(255, 255, 255, 0.07)`, radius `1rem`, padding `1.5rem`.
- **Interactive Variant:** Incorporates a subtle radial gradient tracking mouse position on top borders (`background: radial-gradient(circle at top, rgba(112, 103, 255, 0.15), transparent 70%)`). On hover, translate up `2px` with border brightening to `rgba(112, 103, 255, 0.35)`.

### Input Fields
- **Container:** Height `2.75rem`, background `rgba(11, 13, 18, 0.6)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#F8FAFC`, placeholder `#A4A9B8` at 60% opacity.
- **Focus:** Border shifts to `#7067FF`, backed by an ambient glow (`box-shadow: 0 0 0 3px rgba(112, 103, 255, 0.18)`). Transitions occur at `150ms ease-out`.

### Checkboxes & Radios
- **Structure:** `1.125rem` square or circle, background `rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.2)`.
- **Active State:** Background `#7067FF` with an inner white checkmark or dot. Checked state triggers an immediate soft glow `0 0 10px rgba(112, 103, 255, 0.4)`.

### Chips & Badges
- **Status Indicator:** Height `1.5rem`, padding `0.25rem 0.75rem`, radius `9999px`.
- **Active / Verified Variant:** Background `rgba(33, 201, 151, 0.12)`, border `1px solid rgba(33, 201, 151, 0.3)`, text `#21C997`, prepended by a pulse indicator dot.

### Telemetry / Metric Callouts
- **Structure:** Surface background `rgba(20, 24, 33, 0.5)`, backdrop filter `blur(8px)`. Large numeric readout using tabular numerals in `#F8FAFC`, paired with an upward-trending delta badge in `#21C997`.