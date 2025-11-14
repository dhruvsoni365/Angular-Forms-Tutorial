import 'next-auth'

declare module 'next-auth' {
  interface User {
    tier?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      tier: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    tier: string
  }
}
