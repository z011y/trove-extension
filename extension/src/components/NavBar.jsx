import { useContext } from 'react';
import { ArrowLeft, Storefront, Coins, Keyhole } from '@phosphor-icons/react';
import { NavLink } from './NavLink';
import { ActiveTabProductContext } from '../context/activeTabProduct';

export function NavBar() {
  const { activeTabProduct } = useContext(ActiveTabProductContext);

  return (
    <nav className="flow w-full border-b bg-white py-2 px-4 overflow-scroll">
      <div
        className="bg-violet clickable center border border-hoverable rounded-[32px] min-w-[32px] h-8"
        onClick={() => history.back()}
      >
        <ArrowLeft size="16" weight="duotone" />
      </div>
      <NavLink
        name={activeTabProduct?.brand ?? ''}
        href="/"
        icon={<Storefront size="16" weight="duotone" />}
      />
      <NavLink
        name="My Trove"
        href="/my-trove"
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
