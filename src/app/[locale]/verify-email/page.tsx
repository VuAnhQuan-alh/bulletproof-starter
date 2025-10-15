import { getTranslations } from 'next-intl/server'

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const t = await getTranslations('authPages.verify')
  const { token } = await searchParams
  // In a complete flow we would call /api/auth/verify-email
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-16 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mb-8 text-muted-foreground">{token ? t('processing') : t('invalid')}</p>
        </div>
        <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {token ? 'In development, the token prints in API logs.' : 'Please check your link again.'}
        </div>
      </div>
    </div>
  )
}
