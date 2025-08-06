import Link from 'next/link';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { useState } from 'react';

const ProfileMenu = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleToggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative ml-3">
      {/* Profile dropdown button */}
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={handleToggleProfileMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <Image className="h-8 w-8 rounded-full" src={profileDefault} alt="" />
        </button>
      </div>

      {/* Profile dropdown */}
      {isProfileMenuOpen && (
        <div
          id="user-menu"
          className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 origin-top-right cursor-pointer rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </Link>
          <Link
            href="/properties/saved"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Saved Properties
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
