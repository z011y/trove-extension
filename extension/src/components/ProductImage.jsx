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
        className="shimmer rounded-xl"
        style={{ minWidth: width, height: height }}
      ></div>
    );
  }

  return (
    <div
      className={`relative rounded-xl bg-center bg-cover bg-no-repeat ${
        isLoading ? 'hidden' : ''
      }`}
      style={{
        backgroundImage: `url(${url})`,
        minWidth: width,
        height: height,
      }}
    >
      {isRemoveable ? (
        <XCircle
          size="24"
          weight="duotone"
          className="clickable absolute -top-2 -right-2"
          onClick={removeMethod}
        />
      ) : null}
    </div>
  );
}
