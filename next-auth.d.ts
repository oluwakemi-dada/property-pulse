import { DefaultProfile, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  }

  interface Profile extends DefaultProfile {
    picture?: string;
  }
}
