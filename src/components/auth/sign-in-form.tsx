'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'

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
import { signInSchema, type SignInInput } from '@/validations/auth'
import { Link } from '@/i18n/navigation'

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations('authPages.signIn')

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  })

  const fillRandom = () => {
    const randomStr = Math.random().toString(36).slice(2, 8)
    const email = `${randomStr}@example.com`
    // Strong password: 12 chars with upper, lower, number, special
    const password = `Aa1!${Math.random().toString(36).slice(2, 10)}!9Z`
    form.setValue('email', email, { shouldDirty: true, shouldValidate: true })
    form.setValue('password', password, { shouldDirty: true, shouldValidate: true })
  }

  const onSubmit = async (values: SignInInput) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.SIGN_IN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Đăng nhập thất bại')
      }

      toast({ description: t('submit') + ' thành công' })
      router.push('/' as any)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra'
      toast({ description: message })
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button type="button" variant="outline" onClick={fillRandom} disabled={form.formState.isSubmitting}>
              Điền ngẫu nhiên
            </Button>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '…' : t('submit')}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/forgot-password" className="underline">
              Quên mật khẩu?
            </Link>{' '}
            ·{' '}
            <Link href="/sign-up" className="underline">
              Đăng ký
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}
