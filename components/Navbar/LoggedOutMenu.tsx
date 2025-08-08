import { FaGoogle } from 'react-icons/fa';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

type LoggedOutMenuProps = {
  providers: Record<string, ClientSafeProvider> | null;
};

const providerIcons: Record<string, ReactNode> = {
  google: <FaGoogle className="mr-2 text-white" />,
};

const LoggedOutMenu = ({ providers }: LoggedOutMenuProps) => {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex items-center">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white"
            >
              {providerIcons[provider.id]}
              <span>Login or Register</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default LoggedOutMenu;
