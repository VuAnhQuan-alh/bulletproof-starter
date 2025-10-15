import { createHmac } from 'crypto'

const SECRET = process.env.AUTH_SECRET || 'dev-secret'

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function signToken(payload: Record<string, any>, expiresInSeconds: number) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
  const body = { ...payload, exp }
  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(body))
  const data = `${headerB64}.${payloadB64}`
  const sig = createHmac('sha256', SECRET).update(data).digest()
  const sigB64 = base64url(sig)
  return `${data}.${sigB64}`
}

export function verifyToken(token: string): { valid: boolean; payload?: any } {
  try {
    const [headerB64, payloadB64, sigB64] = token.split('.')
    if (!headerB64 || !payloadB64 || !sigB64) return { valid: false }
    const data = `${headerB64}.${payloadB64}`
    const expected = base64url(createHmac('sha256', SECRET).update(data).digest())
    if (expected !== sigB64) return { valid: false }
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'))
    if (!payload || typeof payload.exp !== 'number') return { valid: false }
    if (payload.exp < Math.floor(Date.now() / 1000)) return { valid: false }
    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}
