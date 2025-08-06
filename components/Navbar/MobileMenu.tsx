import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

type MobileMenuProps = {
  pathname: string;
  isLoggedIn: boolean;
};

const MobileMenu = ({ pathname, isLoggedIn }: MobileMenuProps) => {
  return (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        <Link
          href="/"
          className={`${pathname === '/' ? 'bg-black' : ''} block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`${pathname === '/properties' ? 'bg-black' : ''} block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
        >
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={`${pathname === '/properties/add' ? 'bg-black' : ''} block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
          >
            Add Property
          </Link>
        )}
        {!isLoggedIn && (
          <button className="my-4 flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
            <FaGoogle className="mr-2" />
            <span>Login or Register</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
