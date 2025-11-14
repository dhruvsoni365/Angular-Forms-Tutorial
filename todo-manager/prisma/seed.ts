import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword1 = await bcrypt.hash('passwordTest1', 10)
  const hashedPassword2 = await bcrypt.hash('passwordTest2', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'testuser1@example.com' },
    update: {},
    create: {
      email: 'testuser1@example.com',
      password: hashedPassword1,
      tier: 'free',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'testuser2@example.com' },
    update: {},
    create: {
      email: 'testuser2@example.com',
      password: hashedPassword2,
      tier: 'pro',
    },
  })

  console.log('Seeded users:', { user1, user2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
