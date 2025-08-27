import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'bn', 'vn', 'fr', 'es'],
  defaultLocale: 'vn',
})
