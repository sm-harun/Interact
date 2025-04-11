import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
  darkMode: 'selector',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 15px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)',
      },
    }
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        preset: [
          {
            name: 'vintage',
            enhancements: true
          },
          {
            name: 'wintry',
            enhancements: true
          },
          {
            name: 'rocket',
            enhancements: true
          },
          {
            name: 'crimson',
            enhancements: true
          },
          {
            name: 'modern',
            enhancements: true
          },
          {
            name: 'hamlindigo',
            enhancements: true
          },
          {
            name: 'skeleton',
            enhancements: true
          },
          {
            name: 'sahara',
            enhancements: true
          },
          {
            name: 'gold-nouveau',
            enhancements: true
          },
          {
            name: 'seafoam',
            enhancements: true
          }
        ]
      }
    })
  ]
} satisfies Config;
