import { ArrowClockwise } from '@phosphor-icons/react';

export function AsyncButton({ text, icon, action, isLoading }) {
  return (
    <button
      type="submit"
      className="center"
      onClick={action}
      style={{ gap: '4px' }}
    >
      {isLoading ? <ArrowClockwise className="rotate" size="18" /> : icon}
      {text}
    </button>
  );
}
