'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

const SessionLayout = ({children}: {children: ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
 
export default SessionLayout;