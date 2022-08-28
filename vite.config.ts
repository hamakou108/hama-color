import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  "manifest_version": 3,
  "name": "HamaColor",
  "description": "Change screen edge color by URL",
  "version": "0.1.1",
  "permissions": ["storage", "activeTab", "scripting"],
  "host_permissions": ["*://*/*"],
  "background": {
    "service_worker": "src/background.ts"
  },
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "icon_16.png",
      "32": "icon_32.png",
      "48": "icon_48.png",
      "128": "icon_128.png"
    }
  },
  "icons": {
    "16": "icon_16.png",
    "32": "icon_32.png",
    "48": "icon_48.png",
    "128": "icon_128.png"
  }
});

export default defineConfig({
  esbuild: {
    include: /\.(tsx?|jsx?)$/
  },
  plugins: [crx({ manifest })],
})