import { useState, useRef, useEffect } from 'react';
import {
  DotsThreeOutlineVertical,
  DotsThreeOutline,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react';
import { ActionMenu } from './ActionMenu';

export function MenuButton({ actions }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div
      className="clickable center"
      style={{
        position: 'relative',
        minWidth: '32px',
        height: '32px',
      }}
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
