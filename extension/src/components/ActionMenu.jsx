import { useRef, useEffect, useContext } from 'react';
import { PencilSimple, Trash, PlusCircle, Copy } from '@phosphor-icons/react';
import { ItemsContext } from '../App';

export function ActionMenu({ setIsVisible, parentRef, actions }) {
  const { getItems } = useContext(ItemsContext);
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

  async function deleteItem() {
    await fetch(`http://localhost:8000/delete-item/${item.id}`, {
      method: 'POST',
    });
    getItems();
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
      className="border shadow"
      style={{
        position: 'absolute',
        right: '24px',
        top: '24px',
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '16px',
      }}
    >
      {actions.map((action) => {
        return (
          <div
            className={`flow clickable text-hoverable ${
              action.warn ? 'text-warn' : ''
            }`}
            style={{ gap: '0.5rem', whiteSpace: 'nowrap' }}
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
