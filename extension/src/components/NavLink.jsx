import { Link, useRoute } from 'wouter';

export function NavLink({ name, href, icon }) {
  const [isActive] = useRoute(href);

  return (
    <Link href={href}>
      <div
        className={`${
          isActive
            ? 'bg-gradient border-bold'
            : 'bg-violet border border-hoverable'
        } clickable flow`}
        style={{
          borderRadius: '32px',
          padding: '4px 8px 4px 8px',
          height: '32px',
          whiteSpace: 'nowrap',
        }}
      >
        {icon}
        {name}
      </div>
    </Link>
  );
}
