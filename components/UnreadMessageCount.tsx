'use client';
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = () => {
  const { unreadMessageCount } = useGlobalContext();

  return (
    <span className="absolute top-2.5 right-3 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs leading-none font-bold text-white">
      {unreadMessageCount}
    </span>
  );
};
export default UnreadMessageCount;
