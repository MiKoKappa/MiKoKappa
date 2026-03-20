# AGENTS.md - Tkaczyk Blog Developer Guide

## Project Overview

This is an Astro blog with React, TypeScript, and Tailwind CSS. The project uses:
- **Framework**: Astro 4.x with React integration
- **Styling**: Tailwind CSS 3.x with custom fonts (Chakra Petch, Questrial)
- **Language**: TypeScript (strict mode)
- **Animations**: GSAP
- **State**: Nanostores for React state management
- **Content**: Astro Content Collections with MDX support

---

## Commands

### Development
```bash
npm run dev        # Start dev server at localhost:4321
npm run start     # Alias for astro dev
```

### Build & Production
```bash
npm run build     # Run astro check + astro build
npm run preview   # Preview production build locally
```

### Type Checking
```bash
npx astro check   # Type-check Astro, TSX, and TS files
```

### Running Astro
```bash
npm run astro <cmd>  # Run astro CLI commands
```

### No Test Framework
This project does not have a test framework configured.

---

## Code Style Guidelines

### General
- Use **2 spaces** for indentation (no tabs)
- Use **double quotes** for all strings and imports
- Use **semicolons** at the end of statements
- Use **trailing commas** in multi-line objects/arrays

### TypeScript
- **Strict mode** is enabled - all types must be explicit
- Enable `strictNullChecks` in tsconfig (already set)
- Use proper TypeScript types, avoid `any`
- Use type inference where obvious, explicit types for function parameters and return types
- Use `import type` for type-only imports

### Imports
```typescript
// Good
import { useState, useRef, useEffect } from "react";
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';

// Order: React imports → external libs → internal components → types
```

### Components

#### Astro Components (.astro)
- Use frontmatter `---` fences at the top
- Define `type Props` for component interfaces
- Use `Astro.props` to destructure props
- Place CSS classes inline on elements (Tailwind)

#### React Components (.tsx)
- Use functional components with arrow functions or `function` keyword
- Use `useState`, `useRef`, `useEffect` hooks appropriately
- Use `ref` callbacks for refs arrays: `ref={(el) => (itemsRef.current[i] = el)}`
- Memoize expensive computations with `useMemo`/`useCallback` if needed

### Naming Conventions
- **Components**: PascalCase (`Header.astro`, `Menu.tsx`)
- **Files**: kebab-case for non-component files
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **Variables/camelCase**: camelCase
- **CSS Classes**: Tailwind utility classes (kebab-case)

### Tailwind CSS
- Use utility classes directly in HTML/JSX
- Custom colors defined in `tailwind.config.mjs`:
  - `custom-light`: #cdcac5
  - `custom-dark`: #383838
- Custom fonts:
  - `font-display`: Chakra Petch
  - `font-body`: Questrial

### Error Handling
- Use try/catch for async operations
- Handle null/undefined cases explicitly (strict null checks enabled)
- Use optional chaining (`?.`) and nullish coalescing (`??`) appropriately

### Content Collections
- Define schemas in `src/content/config.ts` using Zod
- Use `z.coerce.date()` for date fields
- Mark optional fields with `.optional()`

### File Organization
```
src/
├── components/    # Reusable UI components (.astro, .tsx)
├── content/       # Content collections and MDX content
├── layouts/       # Page layouts (.astro)
├── pages/         # File-based routing (.astro, .ts)
└── consts.ts      # Global constants
```

---

## VS Code Extensions

Recommended extensions (auto-installed via `.vscode/extensions.json`):
- **Astro**: `astro-build.astro-vscode` - Astro language support
- **MDX**: `unifiedjs.vscode-mdx` - MDX syntax highlighting

---

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration with MDX, sitemap, Tailwind, React |
| `tsconfig.json` | TypeScript config (extends `astro/tsconfigs/strict`) |
| `tailwind.config.mjs` | Tailwind theme with custom fonts and colors |
| `package.json` | Dependencies and npm scripts |

---

## Key Dependencies

- `astro`: ^4.15.9 - Web framework
- `react` / `react-dom`: ^19.1.0 - React integration
- `tailwindcss`: ^3.4.13 - Utility-first CSS
- `typescript`: ^5.6.2 - TypeScript support
- `gsap`: ^3.13.0 - Animation library
- `nanostores`: ^1.0.1 - State management
- `@astrojs/mdx`: MDX content support
- `@astrojs/rss`: RSS feed generation

---

## Notes for Agents

- This is a personal blog project - prioritize simplicity and maintainability
- No authentication or database - content is static MDX files
- The site uses a dark theme with custom styling
- Build output goes to `dist/` folder
- Run `astro check` before committing to catch type errors
