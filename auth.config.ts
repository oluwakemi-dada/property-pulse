import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
 
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: { 
    strategy: "jwt" as const
  }, 
} satisfies NextAuthConfig