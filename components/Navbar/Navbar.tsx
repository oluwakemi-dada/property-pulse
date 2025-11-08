'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';
import MobileMenuButton from './MobileMenuButton';
import { useSession, getProviders } from 'next-auth/react';

type AuthProvider = {
  id: string;
  name?: string;
};

const Navbar = () => {
  const { data: session } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [providers, setProviders] = useState<Record<
    string,
    AuthProvider
  > | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    const setAuthProviders = async () => {
      const res = await getProviders();
      if (isMounted && res) setProviders(res);
    };

    setAuthProviders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="border-b border-blue-500 bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <MobileMenuButton handleToggleMobileMenu={handleToggleMobileMenu} />

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Logo />
            <DesktopMenu pathname={pathname} isLoggedIn={session} />
          </div>

          {!session && <LoggedOutMenu providers={providers} />}
          {session && <LoggedInMenu />}
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          pathname={pathname}
          isLoggedIn={session}
          providers={providers}
        />
      )}
    </nav>
  );
};

export default Navbar;
