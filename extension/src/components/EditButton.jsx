import { PencilSimple, CheckFat } from '@phosphor-icons/react';
import { ActionButton } from './ActionButton';

export function EditButton({ isEditActive, setIsEditActive }) {
  return (
    <ActionButton
      icon={
        isEditActive ? (
          <CheckFat size="16" weight="duotone" />
        ) : (
          <PencilSimple size="16" weight="duotone" />
        )
      }
      action={() => setIsEditActive(!isEditActive)}
    />
  );
}
