import { NextResponse } from 'next/server'

export async function POST() {
  // Placeholder: no real session store, just acknowledge.
  return NextResponse.json({ success: true })
}

