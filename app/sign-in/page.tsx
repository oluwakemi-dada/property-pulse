'use client'
import AuthButton from '@/components/Button/AuthButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SigninPage =  () => {
  const {data: session, status} =  useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && session) {
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  const providers = [
    { id: 'google', name: 'Google' },
  ];

  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">
        Please sign in to continue
      </h2>
      {providers &&
        Object.values(providers).map((provider) => (
          <AuthButton key={provider.id} provider={provider} />
        ))}
    </div>
  );
};

export default SigninPage



