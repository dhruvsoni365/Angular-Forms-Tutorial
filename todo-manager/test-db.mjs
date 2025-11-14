import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Testing database connection...')
  
  const users = await prisma.user.findMany()
  console.log('Users in database:', users.length)
  
  const user = await prisma.user.findUnique({
    where: { email: 'testuser1@example.com' }
  })
  
  console.log('Found user:', user ? 'YES' : 'NO')
  if (user) {
    console.log('User details:', {
      email: user.email,
      tier: user.tier,
      hasPassword: !!user.password
    })
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
