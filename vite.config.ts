import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSeoHeadHtml } from './src/data/seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-seo',
      transformIndexHtml(html) {
        return html.replace('%SEO_HEAD%', buildSeoHeadHtml())
      },
    },
  ],
})
