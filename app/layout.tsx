import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { Toaster } from 'sonner';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <html className="h-full">
        <body className="flex min-h-screen flex-col">
          <Navbar />
          <main className="mb-36 flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
