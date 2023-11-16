import { Link, useRoute } from 'wouter';

export function NavLink({ name, href, icon }) {
  const [isActive] = useRoute(href);

  return (
    <Link href={href}>
      <div
        className={`clickable flow rounded-[32px] py-1 px-2 h-8 whitespace-nowrap ${
          isActive
            ? 'bg-gradient border-bold'
            : 'bg-violet border border-hoverable'
        }`}
      >
        {icon}
        {name}
      </div>
    </Link>
  );
}
