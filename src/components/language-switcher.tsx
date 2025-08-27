'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages } from 'lucide-react'

const languageNames = {
  en: 'English',
  bn: 'বাংলা',
  vn: 'Tiếng Việt',
  fr: 'Français',
  es: 'Español',
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => switchLanguage(locale)}>
            {languageNames[locale as keyof typeof languageNames]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
