import { ArrowClockwise } from '@phosphor-icons/react';

export function ButtonAsync({ text, icon, action, isLoading }) {
  return (
    <button type="submit" className="center gap-1" onClick={action}>
      {isLoading ? <ArrowClockwise className="rotate" size="18" /> : icon}
      {text}
    </button>
  );
}
