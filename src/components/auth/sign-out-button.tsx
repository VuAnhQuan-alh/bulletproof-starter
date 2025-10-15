'use client'

import { Button } from '@/components/ui/button'
import { API_ROUTES } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export function SignOutButton({ children = 'Đăng xuất' }: { children?: ReactNode }) {
  const router = useRouter()
  const handle = async () => {
    await fetch(API_ROUTES.AUTH.SIGN_OUT, { method: 'POST' })
    router.refresh()
  }
  return (
    <Button variant="outline" size="sm" onClick={handle}>
      {children}
    </Button>
  )
}
