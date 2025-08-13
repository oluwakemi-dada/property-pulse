'use client';

import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children: ReactNode;
  pendingLabel: string;
  extraClassNames?: string;
};

const SubmitButton = ({
  children,
  pendingLabel,
  extraClassNames = '',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed ${extraClassNames}`}
      type="submit"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
