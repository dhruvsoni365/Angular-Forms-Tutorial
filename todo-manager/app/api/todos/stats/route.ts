import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [total, completed, pending, highPriority] = await Promise.all([
      prisma.todo.count({
        where: { userId: session.user.id },
      }),
      prisma.todo.count({
        where: { userId: session.user.id, completed: true },
      }),
      prisma.todo.count({
        where: { userId: session.user.id, completed: false },
      }),
      prisma.todo.count({
        where: { userId: session.user.id, priority: 'high', completed: false },
      }),
    ])

    return NextResponse.json({
      total,
      completed,
      pending,
      highPriority,
      tier: session.user.tier,
      limit: session.user.tier === 'free' ? 20 : null,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
