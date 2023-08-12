import { ArrowLeft } from '@phosphor-icons/react';
import { ActionButton } from './ActionButton';

export function ActionBar({ hasBackButton, children }) {
  return (
    <div
      className="border-b split"
      style={{
        padding: '0.5rem 1rem 0.5rem 1rem',
      }}
    >
      <div>
        {hasBackButton ? (
          <ActionButton
            icon={<ArrowLeft size="16" weight="duotone" />}
            action={() => history.back()}
          />
        ) : null}
      </div>
      <div className="flow">{children}</div>
    </div>
  );
}
