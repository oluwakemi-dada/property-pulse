import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise), 
  ...authConfig, // spread the minimal config (including authorized callback)
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
  callbacks: {
    ...authConfig.callbacks,

    async session({ session, user }) {
      if (!session.user) return session;

      session.user.id = user.id; // user.id comes from the adapter
    
      return session;
    },
  },
});
