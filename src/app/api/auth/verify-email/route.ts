import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/token'

// Note: DB schema doesn't have an emailVerified column yet.
// This route just validates token shape for now.
export async function POST(req: Request) {
  try {
    const { token } = (await req.json().catch(() => ({}))) as { token?: string }
    if (!token) return NextResponse.json({ message: 'Thiếu token' }, { status: 400 })
    const res = verifyToken(token)
    if (!res.valid) return NextResponse.json({ message: 'Token không hợp lệ' }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[VERIFY_EMAIL_ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

