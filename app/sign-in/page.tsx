
import AuthButton from '@/components/Button/AuthButton';
import { redirect } from 'next/navigation';
import { auth, authOptions } from "@/auth";

const SigninPage = async () => {
  const session = await auth();

  if (session?.user) redirect("/");

  // Fetch providers on the server
  const providers = authOptions.providers ?? [];

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

