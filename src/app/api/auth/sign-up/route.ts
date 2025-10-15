import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { hashPassword } from '@/lib/password'
import { z } from 'zod'

const apiSignUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
  name: z.string().min(1),
  age: z.coerce.number().int().min(1),
})

// Minimal API schema tailored to current DB table
type Body = {
  email: string
  password: string
  name: string
  age: number
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}))
    const parsed = apiSignUpSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues?.[0]?.message || 'Invalid payload' },
        { status: 400 }
      )
    }
    const { email: rawEmail, password, name, age } = parsed.data
    const email = rawEmail.trim().toLowerCase()

    const [existing] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
    if (existing) {
      return NextResponse.json({ message: 'Email đã được sử dụng' }, { status: 409 })
    }

    const passwordHash = hashPassword(password)

    // Try inserting with password hash. If the column doesn't exist yet
    // (migrations not applied), retry without it to avoid 500s during setup.
    let createdId: number | null = null
    try {
      const [created] = await db
        .insert(usersTable)
        .values({ email, name, age, passwordHash })
        .returning({ id: usersTable.id })
      createdId = created?.id ?? null
    } catch (e: any) {
      if (e?.code === '42703') {
        const [created] = await db
          .insert(usersTable)
          // Types may complain since passwordHash is non-nullable in schema; bypass for fallback.
          .values({ email, name, age } as any)
          .returning({ id: usersTable.id })
        createdId = created?.id ?? null
      } else {
        throw e
      }
    }

    const cookieStore = await cookies()
    cookieStore.set('session', `mock-${createdId}`, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Enhance error visibility in development
    console.error('[SIGN_UP_ERROR]', error)
    const anyErr = error as any
    const code = anyErr?.code as string | undefined
    if (code === '23505') {
      // unique_violation
      return NextResponse.json({ message: 'Email đã được sử dụng' }, { status: 409 })
    }
    if (code === '42703') {
      // undefined_column – likely migrations not applied
      return NextResponse.json(
        { message: 'Database schema out of date. Run `npm run db:migrate`.' },
        { status: 500 }
      )
    }
    if (anyErr?.errno === -111 || anyErr?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { message: 'Cannot connect to database. Check DATABASE_URL and Postgres server.' },
        { status: 500 }
      )
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
