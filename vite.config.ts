import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' with { type: 'json' }

const manifest = defineManifest({
  manifest_version: 3,
  name: 'HamaColor',
  description: 'Change screen edge color by URL',
  version: pkg.version,
  permissions: ['storage'],
  // Lets the background and popup read the active tab's URL through
  // chrome.tabs.query. The content script matches below do not grant this.
  host_permissions: ['*://*/*'],
  background: {
    service_worker: 'src/background.ts',
  },
  content_scripts: [
    {
      matches: ['*://*/*'],
      js: ['src/content.ts'],
    },
  ],
  action: {
    default_popup: 'index.html',
    default_icon: {
      '16': 'icon_16.png',
      '32': 'icon_32.png',
      '48': 'icon_48.png',
      '128': 'icon_128.png',
    },
  },
  icons: {
    '16': 'icon_16.png',
    '32': 'icon_32.png',
    '48': 'icon_48.png',
    '128': 'icon_128.png',
  },
})

export default defineConfig({
  plugins: [crx({ manifest })],
})
