import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
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
    // Invoked on successful sign in
    async signIn({ profile }): Promise<boolean> {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile?.email });
      // 3. If not, create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile?.name?.slice(0, 20);

        if (!profile) return false;

        console.log(profile);

        await User.create({
          email: profile?.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Session cb function that modifies the session object
    async session({ session }) {
      if (!session.user) return session;

      // 1. Get user from database
      const user = await User.findOne({ email: session?.user?.email });
      // 2. Assign user if from the session
      session.user.id = user._id.toString();
      // 3. Return the session
      return session;
    },
  },
});
