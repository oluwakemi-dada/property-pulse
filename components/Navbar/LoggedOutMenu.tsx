import { ClientSafeProvider } from 'next-auth/react';
import AuthButton from '../Button/AuthButton';

type LoggedOutMenuProps = {
  providers: Record<string, ClientSafeProvider> | null;
};

const LoggedOutMenu = ({ providers }: LoggedOutMenuProps) => {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex items-center">
        {providers &&
          Object.values(providers).map((provider) => (
            <AuthButton key={provider.id} provider={provider} />
          ))}
      </div>
    </div>
  );
};

export default LoggedOutMenu;
