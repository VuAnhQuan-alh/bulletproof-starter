'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { API_ROUTES } from '@/utils/constants'
import { basicSignUpSchema, type BasicSignUpInput } from '@/validations/auth'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export function SignUpForm() {
  const router = useRouter()
  const { toast } = useToast()
  const t = useTranslations('authPages.signUp')
  const form = useForm<BasicSignUpInput>({
    resolver: zodResolver(basicSignUpSchema),
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const onSubmit = async (values: BasicSignUpInput) => {
    try {
      const res = await fetch(API_ROUTES.AUTH.SIGN_UP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name,
          age: values.age,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Sign up failed')
      }
      toast({ description: t('submit') + ' thành công' })
      router.push('/sign-in')
    } catch (e) {
      toast({ description: e instanceof Error ? e.message : 'Something went wrong' })
    }
  }

  const fillRandom = () => {
    const rand = Math.random().toString(36).slice(2, 8)
    const name = `User ${rand}`
    const age = Math.floor(18 + Math.random() * 40)
    const email = `${rand}@example.com`
    const password = `Aa1!${Math.random().toString(36).slice(2, 10)}!9Z`
    form.setValue('name', name, { shouldDirty: true, shouldValidate: true })
    form.setValue('age', age, { shouldDirty: true, shouldValidate: true })
    form.setValue('email', email, { shouldDirty: true, shouldValidate: true })
    form.setValue('password', password, { shouldDirty: true, shouldValidate: true })
    form.setValue('confirmPassword', password, { shouldDirty: true, shouldValidate: true })
    form.setValue('terms', true, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('age')}</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('terms')}</FormLabel>
                  <FormMessage />
                </div>
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

          <Link
            href="/sign-in"
            className="block text-center text-sm text-muted-foreground underline"
          >
            {t('loginLink')}
          </Link>
        </form>
      </Form>
    </div>
  )
}
