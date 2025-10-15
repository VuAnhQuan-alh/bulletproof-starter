import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { forgotPasswordSchema } from '@/validations/auth'
import { signToken } from '@/lib/token'

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}))
    const parsed = forgotPasswordSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ message: 'Email không hợp lệ' }, { status: 400 })
    }
    const { email } = parsed.data
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
    if (!user) {
      // Avoid user enumeration
      return NextResponse.json({ success: true })
    }
    const token = signToken({ email }, 60 * 30) // 30 mins
    if (process.env.NODE_ENV !== 'production') {
      console.log('[RESET_PASSWORD_TOKEN]', token)
      return NextResponse.json({ success: true, token })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

