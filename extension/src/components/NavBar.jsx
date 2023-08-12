import { useContext } from 'react';
import { ArrowLeft, Storefront, Coins, Keyhole } from '@phosphor-icons/react';
import { NavLink } from './NavLink';
import { CurrentItemContext } from '../App';

export function NavBar() {
  const { currentItem } = useContext(CurrentItemContext);

  return (
    <nav
      className="flow w-full border-b"
      style={{
        backgroundColor: 'white',
        padding: '0.5rem 1rem 0.5rem 1rem',
        overflow: 'scroll',
      }}
    >
      <div
        className="bg-violet clickable center border border-hoverable"
        style={{
          borderRadius: '32px',
          minWidth: '32px',
          height: '32px',
        }}
        onClick={() => history.back()}
      >
        <ArrowLeft size="16" weight="duotone" />
      </div>
      <NavLink
        name={currentItem.brand}
        href="/"
        icon={<Storefront size="16" weight="duotone" />}
      />
      <NavLink
        name="My Trove"
        href="/all-items"
        icon={<Keyhole size="16" weight="duotone" />}
      />
      <NavLink
        name="Collections"
        href="/collections"
        icon={<Coins size="16" weight="duotone" />}
      />
    </nav>
  );
}
