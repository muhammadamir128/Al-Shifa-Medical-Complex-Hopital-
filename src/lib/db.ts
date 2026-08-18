import { PrismaClient } from '@prisma/client'
import path from 'path'
import { existsSync } from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const rawDbUrl = process.env.DATABASE_URL
if (rawDbUrl?.startsWith('file:')) {
  const filePath = rawDbUrl.replace('file:', '')
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath)
  const normalizedPath = resolvedPath.replace(/\\/g, '/')
  process.env.DATABASE_URL = `file:${normalizedPath}`

  if (!existsSync(resolvedPath)) {
    // Helpful warning for local dev if the file path is wrong
    // eslint-disable-next-line no-console
    console.warn(`[db] SQLite file not found at: ${resolvedPath}`)
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
