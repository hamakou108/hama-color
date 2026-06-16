import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'HamaColor',
    description: 'Change screen edge color by URL',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['*://*/*'],
  },
})
