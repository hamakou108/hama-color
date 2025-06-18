# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `yarn dev` - Start development server
- `yarn build` - Build extension (TypeScript compile + Vite build)
- `yarn preview` - Preview built extension

### Testing and Quality

- `yarn test` - Run Jest tests
- `yarn lint` - ESLint with max 0 warnings
- `yarn lint:fix` - Auto-fix ESLint issues
- `yarn style-lint` - StyleLint for SCSS files
- `yarn style-lint:fix` - Auto-fix StyleLint issues
- `yarn format` - Format with Prettier
- `yarn format:check` - Check Prettier formatting

## Architecture

HamaColor is a Chrome extension that adds colored borders to web pages based on URL pattern matching.

### Core Components

**Background Service Worker** (`src/background.ts`)

- Listens to tab activation/updates
- Initializes storage and triggers page updates
- Entry point for extension lifecycle

**Rule System** (`src/rule.ts`)

- Parses rule strings in format: `pattern,color` (one per line)
- Escapes special regex characters in patterns
- Matches URL strings against patterns using `.search()`

**Tab Management** (`src/tab.ts`)

- Coordinates between rules, DOM manipulation, and active tabs
- Executes content scripts on current tab
- Handles rule application logic

**DOM Manipulation** (`src/dom.ts`)

- Creates/removes colored border overlays
- Uses fixed positioning with high z-index (2147483647)
- Borders are 16px wide with 0.2 opacity

**Popup Interface** (`src/popup.ts`)

- Toggle switch for enabling/disabling borders
- Text input for rule configuration
- Real-time sync with Chrome storage API

### Data Flow

1. User configures rules in popup → Chrome storage
2. Background script detects tab changes → reads storage
3. Rule engine matches current URL → determines effect
4. Tab manager injects content script → applies/removes borders

### Build System

- Vite with @crxjs/vite-plugin for Chrome extension development
- TypeScript compilation with strict checking
- SCSS processing for popup styles
- Manifest V3 configuration in `vite.config.ts`
