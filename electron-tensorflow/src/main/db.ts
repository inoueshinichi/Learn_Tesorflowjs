import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addUser(name: string, email: string) {
  const user = await prisma.user.create({
    data: { name, email },
  })
  return user
}

export async function getUsers() {
  return await prisma.user.findMany()
}