'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { API_ROUTES } from '@/utils/constants'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/validations/auth'
import { useTranslations } from 'next-intl'

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const t = useTranslations('authPages.forgot')
  const [devToken, setDevToken] = useState<string | null>(null)
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: ForgotPasswordInput) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Không thể gửi yêu cầu')
      setDevToken(data?.token || null)
      toast({ description: 'If the email exists, a reset link has been sent.' })
    } catch (e) {
      toast({ description: e instanceof Error ? e.message : 'Something went wrong' })
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '…' : t('submit')}
          </Button>
        </form>
      </Form>
      {devToken && process.env.NODE_ENV !== 'production' && (
        <div className="mt-4 rounded-md border border-dashed p-3 text-xs text-muted-foreground">
          Dev token: {devToken}
        </div>
      )}
    </div>
  )
}
