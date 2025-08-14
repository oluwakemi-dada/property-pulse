'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContextType = {
  unreadMessageCount: number;
  setUnreadMessageCount: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const fetchUnreadCount = async () => {
        try {
          const res = await getUnreadMessageCount();
          if (res?.count) setUnreadMessageCount(res.count);
        } catch (error) {
          console.error('Failed to fetch unread messages:', error);
        }
      };

      fetchUnreadCount();
    }
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadMessageCount,
        setUnreadMessageCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('Context was used outside provider');
  }

  return context;
};
