import Link from 'next/link';
import logo from '@/assets/images/logo-white.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link className="flex flex-shrink-0 items-center" href="/">
      <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />

      <span className="ml-2 hidden text-2xl font-bold text-white md:block">
        PropertyPulse
      </span>
    </Link>
  );
};

export default Logo;
