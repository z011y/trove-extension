import { XCircle } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

export function ProductImage({
  url,
  height,
  width,
  isRemoveable = false,
  removeMethod,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
    };
    img.src = url;
  }, []);

  if (isLoading) {
    return (
      <div
        className="shimmer"
        style={{ minWidth: width, height: height, borderRadius: '12px' }}
      ></div>
    );
  }

  return (
    <div
      style={{
        display: isLoading ? 'none' : 'block',
        position: 'relative',
        minWidth: width,
        height: height,
        borderRadius: '12px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'norepeat',
      }}
    >
      {isRemoveable ? (
        <XCircle
          size="24"
          weight="duotone"
          className="clickable"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          }}
          onClick={removeMethod}
        />
      ) : null}
    </div>
  );
}
