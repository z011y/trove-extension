import { TrashSimple, ArrowClockwise } from '@phosphor-icons/react';
import { ActionButton } from './ActionButton';

export function DeleteButton({ action, isLoading }) {
  return (
    <div
      className="clickable center border-red"
      style={{
        borderRadius: '6px',
        minWidth: '32px',
        height: '32px',
        backgroundColor: '#FFEFEF',
        color: '#381316',
      }}
      onClick={action}
    >
      {isLoading ? (
        <ArrowClockwise className="rotate" size="18" />
      ) : (
        <TrashSimple size="16" weight="duotone" />
      )}
    </div>
  );
}
