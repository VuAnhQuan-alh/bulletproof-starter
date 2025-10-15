import { getTranslations } from 'next-intl/server'

export default async function TermsPage() {
  const t = await getTranslations('pages.terms')
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-16 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('description')}</p>
        </div>
      </div>
    </div>
  )
}

