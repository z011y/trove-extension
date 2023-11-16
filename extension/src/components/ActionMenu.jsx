import { useRef, useEffect } from 'react';

export function ActionMenu({ setIsVisible, parentRef, actions }) {
  const menuRef = useRef(null);

  function handleClickOutside(e) {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !parentRef.current.contains(e.target)
    ) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="border shadow absolute right-6 top-6 z-[9] flex flex-col gap-4 bg-white p-4 rounded-2xl"
    >
      {actions.map((action) => {
        return (
          <div
            className={`flow clickable text-hoverable gap-2 whitespace-nowrap ${action.warn ? 'text-warn' : ''
              }`}
            onClick={action.method}
          >
            {action.icon}
            <p>{action.name}</p>
          </div>
        );
      })}
    </div>
  );
}
