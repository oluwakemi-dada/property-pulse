import NextAuth from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb";
import authConfig from "./auth.config"

export const authOptions = {
  ...authConfig,
  adapter: MongoDBAdapter(client),
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
      };

      return token
    },
    async session({ session, token }: any) {
      if (!session.user) return session;

      session.user.id = token.id; // user.id comes from the adapter
    
      return session;
    },
  },

}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
