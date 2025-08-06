import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main className='mb-36'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
