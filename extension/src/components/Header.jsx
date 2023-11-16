import { Link } from 'wouter';
import { UserCircle } from '@phosphor-icons/react';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-[9]">
      <div className="split w-full border-b px-4 h-12 bg-violet z-10 bg-white/80 backdrop-blur-lg">
        <Link href="/">
          <div className="clickable flex items-center">
            <img className="h-4" src="trove.png" alt="logo" />
            <h1 className="mt-[3px] tracking-[-1.5px]">Trove</h1>
          </div>
        </Link>
        <Link href="/account">
          <UserCircle size={24} weight="duotone" className="clickable" />
        </Link>
      </div>
      <NavBar />
    </div>
  );
}
