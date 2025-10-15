import { getTranslations } from 'next-intl/server'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const t = await getTranslations('authPages.reset')
  const { token } = await searchParams
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-16 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('subtitle')}</p>
        </div>
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="mx-auto w-full max-w-md rounded-xl border border-red-200/60 bg-white p-6 text-red-600 shadow-sm dark:border-red-900/60 dark:bg-slate-900">
            Invalid or missing token.
          </div>
        )}
      </div>
    </div>
  )
}
