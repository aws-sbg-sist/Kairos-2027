# KAIROS 2027 — Design System & Visual Specification

> **Design Archetype:** Cybernetic Aerospace / Hardware Monolith  
> **Inspiration:** Linear, Apple Pro Luxury Hardware, Emil Kowalski Interaction Craft  
> **Status:** Production Standard for All 43 Routes  

---

## 1. Visual Philosophy & Identity

The KAIROS 2027 design system abandons generic modern web cliches (soft pastel glassmorphism, floating random gradients, ungrounded cards) in favor of an authentic **Cybernetic Aerospace / Hardware Monolith** aesthetic. 

Every surface is treated like a precision-milled aerospace instrument console:
- **Obsidian Voids:** Deep OLED backgrounds (`#07090E`) that eliminate visual noise and give physical weight to content.
- **Concentric Double-Bezels (Doppelrand):** Nested hardware casing with dual concentric radii, specular inset hairlines, and subtle neon border diffusion.
- **Machined HUD Telemetry:** Monospace metadata badges, crosshair targeting reticles, and sweeping horizontal laser beams.
- **Physical Tactile Feedback:** Every digital action is backed by real physical vibration micro-ticks and synthesized acoustic feedback.

---

## 2. Color System & Design Tokens

### Primary Palette
| Token Name | Hex Value | Role & Architectural Usage |
| :--- | :--- | :--- |
| `--color-canvas` | `#07090E` | Deep OLED Obsidian Void (Page Background) |
| `--color-squid-ink` | `#0B0F19` | Primary Card & Surface Enclosure |
| `--color-card-subtle` | `#111827` | Secondary Nested Container / Table Rows |
| `--color-border-hairline` | `rgba(255, 255, 255, 0.08)` | Concentric Machined Border Hairline |
| `--color-border-glow` | `rgba(147, 51, 234, 0.35)` | Active Element Neon Rim Diffuse Glow |

### Semantic Accent Colors
| Accent Role | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Cyber Purple | `#9333EA` / `#A855F7` | Hero CTAs, active track cards, primary brand emblems |
| **Secondary Brand** | Deep Indigo | `#4F46E5` / `#6366F1` | Gradient flow, secondary actions, audio visualizer |
| **Verified / Success** | Telemetry Emerald | `#10B981` / `#34D399` | Meetup verified badges, passing checkpoint indicators |
| **Warning / Evaluation** | Alert Amber | `#F59E0B` | In-progress checkpoint audits, evaluation scheduled |
| **Critical / Danger** | Laser Rose | `#F43F5E` | 10 PM night lock-in alert, rate limit rejections |
| **Information / Cloud** | Sky Cyan | `#0284C7` / `#38BDF8` | Sathyabama bus fleet, AWS Bedrock indicators |

---

## 3. Typography Hierarchy

The typography stack utilizes three complementary typefaces loaded via Next.js Google Fonts with zero layout shift (`display: swap`):

```css
--font-outfit: 'Outfit', sans-serif;         /* Display & Primary Headings */
--font-inter: 'Inter', sans-serif;           /* Interface, Forms & Body Text */
--font-mono: 'JetBrains Mono', monospace;    /* Telemetry, Code, Timers & Z-Scores */
```

### Typographic Scale & Ratios
| Scale | Font Family | Size / Line Height | Tracking | Weight | Applied To |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Outfit | `3.75rem` (60px) / `1.05` | `-0.035em` | Black (900) | Main Hero Title |
| **Section Title**| Outfit | `2.5rem` (40px) / `1.15` | `-0.025em` | Black (900) | Major Section Headings |
| **Card Heading** | Outfit | `1.25rem` (20px) / `1.3` | `-0.015em` | Bold (700) | Track Names, Modal Headers |
| **Body Primary** | Inter | `1rem` (16px) / `1.6` | Normal | Regular (400) | Paragraphs, Explanations |
| **Body Small**   | Inter | `0.875rem` (14px) / `1.5` | Normal | Medium (500) | Descriptions, Form Labels |
| **Telemetry HUD**| JetBrains Mono | `0.75rem` (12px) / `1.4` | `+0.05em` | Bold (700) | Timers, Z-Scores, Roster Codes |

---

## 4. Hardware Enclosure Patterns

### A. Concentric Double-Bezel (Doppelrand) Enclosure
```html
<div class="double-bezel">
  <div class="double-bezel-inner">
    <!-- Component Content -->
  </div>
</div>
```
- **Outer Frame (`.double-bezel`):** `p-1.5` border casing with subtle outer gradient, outer diffuse glow, and `rounded-[1.75rem]`.
- **Inner Core (`.double-bezel-inner`):** Mathematically calculated inner radius `rounded-[calc(1.75rem-0.375rem)]` featuring specular inset highlight (`shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]`) and backdrop blur.

### B. Island Button with Autonomous Icon Capsule
```html
<button class="island-btn group">
  <span>Action Label</span>
  <span class="island-btn-icon">→</span>
</button>
```
- **Press Physics:** Emil Kowalski spring transition `:active:scale-[0.97]` with 75ms responsive snap.
- **Trailing Icon Capsule:** Circular badge (`w-8 h-8 rounded-full bg-white/20`) that translates diagonally (`translate-x-1 -translate-y-[0.5px]`) and scales up on hover, creating kinetic tension.

### C. HUD Targeting Reticle & Laser Sweep
- **Reticle Circle (`.reticle-frame`):** Concentric targeting circle with crosshair quadrant ticks.
- **Laser Scan Beam (`.laser-scan-beam`):** Horizontal gradient line sweeping across the astrolabe via keyframe `laserSweep` (3.5s infinite linear loop).

---

## 5. Sensory Feedback Tokens

### A. Web Vibration Haptic Profiles (`src/lib/haptics.ts`)
| Profile | Pattern | Timing | Usage Scenario |
| :--- | :--- | :---: | :--- |
| `selection()` | Single Tick | `8ms` | Segmented tab switcher, Day 1/2/3 toggle |
| `light()` | Soft Tap | `15ms` | Hovering interactive element or preview card |
| `medium()` | Crisp Tap | `28ms` | Standard button clicks, clipboard copy |
| `heavy()` | Mechanical Punch | `48ms` | Primary CTA press, modal submit |
| `success()` | Dual Rhythm | `[16, 50, 32]ms` | Verified RSVP check, pass generation |
| `error()` | Warning Buzz | `[35, 45, 35, 45, 60]ms` | Validation error, rate limit alert |
| `celebration()`| Pulse Cascade | `[20, 40, 20, 40, 35, 60, 50]ms` | Confetti milestone trigger |

### B. Pure Web Audio Oscillator Synthesizer (`src/lib/audio.ts`)
| Acoustic Event | Oscillator Type | Frequencies | Envelope Decay |
| :--- | :--- | :--- | :--- |
| **Click Snap** | Sine Wave | `800Hz` → `1200Hz` | `35ms` exponential ramp |
| **Selection Tick** | Triangle Wave | `1046Hz` (C6) | `20ms` micro-decay |
| **Chord Sweep** | Harmonic Triad | `523Hz, 659Hz, 784Hz` (C-E-G) | `280ms` soft ramp |
| **Error Chirp** | Sawtooth Wave | `320Hz` → `160Hz` | `150ms` descending alert |

---

## 6. Accessibility & Reduced Motion Standards

1. **WCAG 2.2 AA Contrast Compliance:** All foreground text elements maintain a minimum contrast ratio of `4.5:1` against dark surfaces (`7:1` on primary buttons).
2. **Reduced Motion Adaptation:** `@media (prefers-reduced-motion: reduce)` automatically:
   - Disables laser sweep keyframes.
   - Deactivates magnetic cursor spring follow.
   - Replaces transform scales with instant opacity changes.
3. **Keyboard Navigation:** High-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2`) are enforced on every interactive control.
