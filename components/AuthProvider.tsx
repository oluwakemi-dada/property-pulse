'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  // @ts-expect-error - Passing session from server to client provider
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
