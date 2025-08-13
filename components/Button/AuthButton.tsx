import { ClientSafeProvider, signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { FaGoogle } from 'react-icons/fa';

type AuthButtonProps = {
  provider: Record<string, ClientSafeProvider> | null;
};

const providerIcons: Record<string, ReactNode> = {
  google: <FaGoogle className="mr-2 text-white" />,
};

const AuthButton = ({ provider }: AuthButtonProps) => {
  return (
    <button
      key={provider?.id}
      onClick={() => signIn(provider?.id)}
      className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white"
    >
      {providerIcons[provider?.id]}
      <span>Login or Register</span>
    </button>
  );
};

export default AuthButton;
