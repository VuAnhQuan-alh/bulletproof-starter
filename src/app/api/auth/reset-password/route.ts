import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { resetPasswordSchema } from '@/validations/auth'
import { verifyToken } from '@/lib/token'
import { hashPassword } from '@/lib/password'

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}))
    const parsed = resetPasswordSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ message: 'Dữ liệu không hợp lệ' }, { status: 400 })
    }
    const { token, password } = parsed.data
    const res = verifyToken(token)
    if (!res.valid) {
      return NextResponse.json({ message: 'Token không hợp lệ hoặc hết hạn' }, { status: 400 })
    }
    const email = res.payload.email as string
    if (!email) return NextResponse.json({ message: 'Token không hợp lệ' }, { status: 400 })
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
    if (!user) return NextResponse.json({ message: 'Tài khoản không tồn tại' }, { status: 404 })
    const passwordHash = hashPassword(password)
    await db.update(usersTable).set({ passwordHash }).where(eq(usersTable.id, user.id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

