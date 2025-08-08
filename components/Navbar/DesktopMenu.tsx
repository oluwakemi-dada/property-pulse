import { Session } from 'next-auth';
import Link from 'next/link';

type DesktopMenuProps = {
  pathname: string;
  isLoggedIn: Session | null;
};

const DesktopMenu = ({ pathname, isLoggedIn }: DesktopMenuProps) => {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        <Link
          href="/"
          className={`${pathname === '/' ? 'bg-black' : ''} rounded-md px-3 py-2 text-white hover:bg-gray-900 hover:text-white`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`${pathname === '/properties' ? 'bg-black' : ''} rounded-md px-3 py-2 text-white hover:bg-gray-900 hover:text-white`}
        >
          Properties
        </Link>
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={`${pathname === '/properties/add' ? 'bg-black' : ''} rounded-md px-3 py-2 text-white hover:bg-gray-900 hover:text-white`}
          >
            Add Property
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
