import { useContext } from 'react';
import { CurrentItemContext } from '../App';

export function EditableField({
  field,
  type,
  defaultText,
  isEditActive,
  children,
}) {
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);

  if (isEditActive) {
    return (
      <div className="space-between" style={{ width: '100%' }}>
        <input
          type={type}
          class="bg-violet"
          style={{ width: '100%' }}
          value={defaultText}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, [field]: e.target.value })
          }
        />
      </div>
    );
  }

  return (
    <div className="space-between" style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
}
