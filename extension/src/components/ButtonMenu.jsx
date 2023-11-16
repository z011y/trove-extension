import { useState, useRef } from 'react';
import { DotsThreeOutline } from '@phosphor-icons/react';
import { ActionMenu } from './ActionMenu';

export function ButtonMenu({ actions }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div
      className="clickable center relative min-w-[32px] h-8"
      onClick={() => setIsMenuVisible(!isMenuVisible)}
      ref={buttonRef}
    >
      <DotsThreeOutline size="18" weight="duotone" />
      {isMenuVisible ? (
        <ActionMenu
          setIsVisible={setIsMenuVisible}
          parentRef={buttonRef}
          actions={actions}
        />
      ) : null}
    </div>
  );
}
