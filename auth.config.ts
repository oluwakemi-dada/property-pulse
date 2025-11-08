import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  callbacks: {
    authorized({ auth }) {
      // Check if user session exists
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;

