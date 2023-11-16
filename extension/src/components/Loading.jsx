import { CircleNotch } from '@phosphor-icons/react';

export function Loading() {
  return (
    <div className="center w-full h-full">
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#b7d9f8" offset="0%" />
          <stop stopColor="#d7cff9" offset="50%" />
          <stop stopColor="#f9c6c6" offset="100%" />
        </linearGradient>
      </svg>
      <CircleNotch
        size="48"
        weight="bold"
        className="rotate fill-[url(#gradient)]"
      />
    </div>
  );
}
