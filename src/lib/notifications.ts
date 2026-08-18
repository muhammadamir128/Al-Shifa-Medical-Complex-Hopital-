import { db } from "@/lib/db"

interface CreateNotificationInput {
  userId: string
  title: string
  message: string
  type?: string
  link?: string
}

export async function createNotification(input: CreateNotificationInput) {
  return db.notification.create({ data: input })
}

export async function createNotificationForRole(
  role: string,
  title: string,
  message: string,
  type?: string,
  link?: string,
) {
  const users = await db.user.findMany({ where: { role: role as any, isActive: true }, select: { id: true } })
  if (!users.length) return
  await db.notification.createMany({
    data: users.map((u) => ({ userId: u.id, title, message, type, link })),
  })
}
