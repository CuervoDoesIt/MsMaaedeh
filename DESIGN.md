# Design Guidelines - MsMaaedeh Portfolio

## Overview

This document outlines the design system, UI/UX guidelines, and wireframes for the Ms. Maaedeh sushi chef portfolio website.

## Design Philosophy

### Core Principles
- **Elegance**: Reflects the precision and artistry of sushi
- **Minimalism**: Clean, focused layouts that highlight content
- **Responsiveness**: Seamless experience across all devices
- **Artistic**: Incorporates visual elements that celebrate Japanese culinary art

## Color Palette

### Primary Colors
- **Red 500-600**: `#EF4444` to `#DC2626` - Main brand color, represents passion and energy
- **Gray 900**: `#111827` - Primary text and navigation
- **White**: `#FFFFFF` - Backgrounds and contrast

### Secondary Colors
- **Blue 400-600**: For workshops section accents
- **Green 400-600**: For catering section accents
- **Gray 50-200**: Backgrounds and subtle elements

### Usage Guidelines
- Red is the primary accent color used for CTAs and important elements
- Maintain high contrast ratios for accessibility (WCAG AA minimum)
- Use gradients sparingly for hero sections and special highlights

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

### Type Scale
- **Hero Headings**: 3rem - 5rem (48px - 80px)
- **Page Headings (h1)**: 2.5rem - 3rem (40px - 48px)
- **Section Headings (h2)**: 1.875rem - 2.25rem (30px - 36px)
- **Subsection Headings (h3)**: 1.25rem - 1.5rem (20px - 24px)
- **Body Text**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Font Weights
- **Bold (700)**: Headings, CTAs, emphasis
- **Semibold (600)**: Navigation, subheadings
- **Medium (500)**: Button text, labels
- **Regular (400)**: Body text

## Layout & Grid

### Breakpoints
```
Mobile: < 640px
Tablet: 640px - 768px
Desktop Small: 768px - 1024px
Desktop Large: > 1024px
Max Width: 1280px (7xl)
```

### Spacing System
Based on Tailwind's spacing scale (4px increments):
- **Micro**: 0.5rem (8px)
- **Small**: 1rem (16px)
- **Medium**: 1.5rem - 2rem (24px - 32px)
- **Large**: 3rem - 4rem (48px - 64px)
- **XLarge**: 5rem+ (80px+)

### Container
- Max-width: 1280px (7xl)
- Padding: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)

## Components

### Navigation
- **Position**: Sticky top
- **Background**: Dark (gray-900)
- **Height**: 64px (4rem)
- **Logo**: Sushi emoji (鮨) + brand name
- **Mobile**: Hamburger menu with slide-out navigation
- **Desktop**: Horizontal menu with hover states

### Footer
- **Background**: Dark (gray-900)
- **Layout**: 4-column grid (mobile stacks)
- **Sections**: Brand, Explore, About, Connect
- **Social Icons**: Instagram, Facebook with hover states

### Buttons
**Primary (Red)**
```
- Background: red-600
- Hover: red-700
- Text: white
- Padding: 0.75rem 2rem
- Border-radius: 0.5rem
- Font-weight: 600
```

**Secondary (Outline)**
```
- Border: 2px white
- Hover: white background
- Text: white (hover: gray-900)
- Same padding and radius as primary
```

### Cards
```
- Background: white
- Shadow: shadow-lg
- Border-radius: 0.5rem
- Padding: 1.5rem - 2rem
- Hover: scale-105 transform
- Transition: all 0.3s
```

## Page Wireframes

### Home Page

```
┌─────────────────────────────────┐
│        Navigation               │
├─────────────────────────────────┤
│                                 │
│         Hero Section            │
│    (Full viewport height)       │
│   - Large heading               │
│   - Subtitle                    │
│   - CTA buttons                 │
│                                 │
├─────────────────────────────────┤
│     About Preview Section       │
│   [Image]  [Text Content]       │
├─────────────────────────────────┤
│      Services Grid (3 cols)     │
│  [Gallery] [Workshops] [Catering]│
├─────────────────────────────────┤
│         CTA Section             │
│    (Full width, colored bg)     │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

### Gallery Page

```
┌─────────────────────────────────┐
│        Navigation               │
├─────────────────────────────────┤
│         Page Header             │
│    (Title + Description)        │
├─────────────────────────────────┤
│     Category Filter Tabs        │
│  [All] [Nigiri] [Maki] [etc]    │
├─────────────────────────────────┤
│                                 │
│     Gallery Grid (3 cols)       │
│   [Item] [Item] [Item]          │
│   [Item] [Item] [Item]          │
│   [Item] [Item] [Item]          │
│                                 │
├─────────────────────────────────┤
│     Featured Carousel           │
│  (Large, with arrow controls)   │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

### Workshops Page

```
┌─────────────────────────────────┐
│        Navigation               │
├─────────────────────────────────┤
│         Page Header             │
├─────────────────────────────────┤
│    Workshop Cards Grid (2 cols) │
│  [Workshop 1]  [Workshop 2]     │
│  [Workshop 3]  [Workshop 4]     │
├─────────────────────────────────┤
│   What to Expect Section        │
│     (3 icon + text blocks)      │
├─────────────────────────────────┤
│         CTA Section             │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

### Contact Page

```
┌─────────────────────────────────┐
│        Navigation               │
├─────────────────────────────────┤
│         Page Header             │
├─────────────────────────────────┤
│                                 │
│  [Contact Form]  [Info Cards]   │
│   (2 columns)                   │
│                                 │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

## Animations

### Implemented
- **Fade In**: Page transitions (0.5s ease-in)
- **Scale on Hover**: Cards and buttons (scale-105)
- **Color Transitions**: All interactive elements (0.2-0.3s)

### Future Enhancements
- Parallax scrolling on hero sections
- Image gallery lightbox with transitions
- Carousel animations with smooth slides
- Loading skeleton screens
- Scroll-triggered animations

## Accessibility

### Standards
- WCAG 2.1 Level AA compliance
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators on all interactive elements

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Tested with accessibility tools

## Responsive Behavior

### Mobile First Approach
1. Design for mobile first (320px+)
2. Enhance for tablet (640px+)
3. Optimize for desktop (1024px+)

### Key Adaptations
- **Navigation**: Hamburger menu → horizontal menu
- **Grids**: 1 column → 2 columns → 3-4 columns
- **Typography**: Smaller sizes → larger sizes
- **Spacing**: Tighter → more generous
- **Images**: Stack → side-by-side

## Asset Guidelines

### Images
- **Format**: WebP with JPEG/PNG fallbacks
- **Optimization**: Compress to < 200KB per image
- **Dimensions**: Multiple sizes for responsive images
- **Alt Text**: Descriptive, concise alternative text

### Icons
- **Source**: Heroicons (inline SVG)
- **Size**: Consistent sizing (1rem, 1.5rem, 2rem)
- **Color**: Inherit from parent or theme colors

### Emojis
- Currently using emojis as placeholders
- Replace with professional food photography
- Maintain aspect ratios and consistency

## Future Design Enhancements

1. **Real Photography**
   - Professional sushi photography
   - Workshop action shots
   - Event catering examples

2. **Interactive Elements**
   - Working carousel with touch/swipe support
   - Image lightbox/modal viewer
   - Animated transitions between pages

3. **Enhanced Animations**
   - Page load animations
   - Scroll-based reveal effects
   - Micro-interactions on buttons/cards

4. **Brand Refinement**
   - Custom logo design
   - Brand pattern/texture elements
   - Unique iconography set

---

*This design system is a living document and will evolve as the project grows.*
