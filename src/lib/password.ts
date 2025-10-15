import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto'

// Format: pbkdf2$<iterations>$<salt_base64>$<hash_base64>
const ITERATIONS = 120000
const KEYLEN = 32
const DIGEST = 'sha256'

export function hashPassword(plain: string) {
  const salt = randomBytes(16)
  const hash = pbkdf2Sync(plain, salt, ITERATIONS, KEYLEN, DIGEST)
  return `pbkdf2$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`
}

export function verifyPassword(plain: string, stored: string) {
  try {
    const [scheme, iterStr, saltB64, hashB64] = stored.split('$')
    if (scheme !== 'pbkdf2') return false
    const iterations = parseInt(iterStr, 10)
    if (!iterations || !saltB64 || !hashB64) return false
    const salt = Buffer.from(saltB64, 'base64')
    const expected = Buffer.from(hashB64, 'base64')
    const actual = pbkdf2Sync(plain, salt, iterations, expected.length, DIGEST)
    return timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

