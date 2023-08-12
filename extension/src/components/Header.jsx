import { Link } from 'wouter';
import { UserCircle } from '@phosphor-icons/react';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <div className="fixed w-full" style={{ zIndex: '9' }}>
      <div
        className="split w-full border-b px h-3 bg-violet"
        style={{
          zIndex: 10,
          backgroundColor: 'rgba(245, 242, 255, 0.8)',
          backdropFilter: 'blur(1rem)',
        }}
      >
        <Link href="/">
          <div
            className="clickable"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img className="h-1" src="trove.png" alt="logo" />
            <h1 style={{ marginTop: '3px', letterSpacing: '-1.5px' }}>Trove</h1>
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
