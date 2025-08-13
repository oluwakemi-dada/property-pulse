import { Session } from 'next-auth';
import Link from 'next/link';
import { ClientSafeProvider } from 'next-auth/react';
import AuthButton from '../Button/AuthButton';

type MobileMenuProps = {
  pathname: string;
  isLoggedIn: Session | null;
  providers: Record<string, ClientSafeProvider> | null;
};

const MobileMenu = ({ pathname, isLoggedIn, providers }: MobileMenuProps) => {
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
        {!isLoggedIn &&
          providers &&
          Object.values(providers).map((provider) => (
            <AuthButton key={provider.id} provider={provider} />
          ))}
      </div>
    </div>
  );
};

export default MobileMenu;
