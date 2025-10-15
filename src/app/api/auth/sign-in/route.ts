import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { signInSchema } from '@/validations/auth'

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}))
    const parsed = signInSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues?.[0]?.message || 'Invalid payload' },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    // NOTE: Current schema doesn't include password hashing field.
    // For now, we only check if the user exists by email.
    const [user] = await db
      .select({ id: usersTable.id, email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)

    if (!user) {
      return NextResponse.json({ message: 'Tài khoản không tồn tại' }, { status: 401 })
    }

    // Set a simple demo session cookie (placeholder). Replace with proper session management.
    const cookieStore = await cookies()
    cookieStore.set('session', `mock-${user.id}`, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[SIGN_IN_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
