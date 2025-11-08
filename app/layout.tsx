import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import '@/assets/styles/globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/photoswipe.css';
import SessionLayout from '@/components/SessionLayout';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const MainLayout = async ({ children }: { children: ReactNode }) => {
  return (

    <html className="h-full">
      <body className="flex min-h-screen flex-col">
        <SessionLayout>
          <GlobalProvider>
            <Navbar />
            <main className="mb-36 flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </GlobalProvider>
        </SessionLayout>
      </body>
    </html>
  );
};

export default MainLayout;
