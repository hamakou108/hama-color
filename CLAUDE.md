# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

Use English for all project artifacts including:

- Code comments
- Git commit messages
- Pull request titles and descriptions
- Documentation

## Commit Convention

This project uses [Release Please](https://github.com/googleapis/release-please) for automated releases. Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) so that Release Please can correctly generate changelogs and determine version bumps.

### Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Types and version impact

| Type       | Release section          | Version bump                |
| ---------- | ------------------------ | --------------------------- |
| `feat`     | Features                 | minor (patch while < 1.0.0) |
| `fix`      | Bug Fixes                | patch                       |
| `docs`     | Documentation            | — (no release)              |
| `chore`    | Miscellaneous Chores     | — (no release)              |
| `build`    | —                        | — (no release)              |
| `ci`       | —                        | — (no release)              |
| `refactor` | —                        | — (no release)              |
| `test`     | —                        | — (no release)              |
| `style`    | —                        | — (no release)              |
| `perf`     | Performance Improvements | — (no release)              |

### Reverting commits

Do not use `revert` as a standalone type. Instead, use the original commit's type so that Release Please applies the correct version bump. Add "revert" as a description prefix.

```
# Good — preserves the original type, no unintended version bump
chore: revert "change Renovate schedule to first day of month"

# Good — Release Please correctly treats this as a patch bump
fix: revert "allow empty URL patterns"

# Bad — Release Please treats `revert` as a patch bump regardless of the original type
revert: change Renovate schedule to first day of month
```

### Breaking changes

Append `!` after the type/scope or add a `BREAKING CHANGE:` footer to trigger a major version bump (minor while < 1.0.0). Example:

```
feat!: remove support for Manifest V2
```

## Commands

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build extension (TypeScript compile + Vite build)
- `pnpm preview` - Preview built extension

### Testing and Quality

- `pnpm test` - Run Vitest tests
- `pnpm lint` - ESLint with max 0 warnings
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm style-lint` - StyleLint for SCSS files
- `pnpm style-lint:fix` - Auto-fix StyleLint issues
- `pnpm format` - Format with Prettier
- `pnpm format:check` - Check Prettier formatting

## Architecture

HamaColor is a Chrome extension that adds colored borders to web pages based on URL pattern matching.

### Core Components

**Background Service Worker** (`src/background.ts`)

- Listens to tab activation/updates
- Delegates to `utils/tab.ts` for tab update logic

**Content Script** (`src/content.ts`)

- Content script injected into all pages via manifest `content_scripts`
- Listens for messages from background/popup
- Creates/removes colored border overlays (fixed positioning, z-index 2147483647, 16px wide, 0.2 opacity)

**Popup Interface** (`src/popup.ts`)

- Toggle switch for enabling/disabling borders
- Textarea for rule configuration
- Syncs with Chrome storage API

**Tab Management** (`src/utils/tab.ts`)

- Orchestrates rule matching and messaging to content script
- Shared by both background and popup entrypoints

**Rule System** (`src/utils/rule.ts`)

- Parses rule strings in format: `pattern,color` (one per line)
- Escapes special regex characters in patterns
- Matches URL strings against patterns using `.search()`

**Storage** (`src/utils/storage.ts`)

- Type-safe wrapper around `chrome.storage.sync`

### Data Flow

1. User configures rules in popup → Chrome storage
2. Background script detects tab changes → reads storage
3. Rule engine matches current URL → determines effect
4. Background/popup sends message to content script → applies/removes borders

### Build System

- Vite with @crxjs/vite-plugin for Chrome extension development
- TypeScript compilation with strict checking
- SCSS processing for popup styles
- Manifest V3 configuration in `vite.config.ts`

### Design Decisions

**Extension API wrappers and layering**: Currently, `utils/tab.ts` combines extension API calls (tab query, message sending) with orchestration logic (rule matching). This is intentional — at the current project scale, separating a thin API adapter layer from an orchestration layer would be over-engineering. If the project grows to need features like bulk tab updates or additional messaging patterns, consider splitting into:

- Thin API adapters (`utils/tab.ts`, `utils/storage.ts`) that only wrap `chrome.*` calls
- An orchestration layer (e.g. `services/`) that composes adapters with domain logic
