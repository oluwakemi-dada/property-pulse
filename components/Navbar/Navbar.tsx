'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';
import MobileMenuButton from './MobileMenuButton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();

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
            <DesktopMenu pathname={pathname} isLoggedIn={isLoggedIn} />
          </div>

          {!isLoggedIn && <LoggedOutMenu />}
          {isLoggedIn && <LoggedInMenu />}
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu pathname={pathname} isLoggedIn={isLoggedIn} />
      )}
    </nav>
  );
};

export default Navbar;
