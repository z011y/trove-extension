import { useState, useEffect, useContext } from 'react';
import { CollectionItem } from '../components/CollectionItem';
import { ItemsContext } from '../App';
import { ActionBar } from '../components/ActionBar';
import { EditButton } from '../components/EditButton';

export function Trove() {
  const [isEditActive, setIsEditActive] = useState(false);
  const { items, getItems } = useContext(ItemsContext);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      {items.map((item) => {
        return <CollectionItem item={item} />;
      })}
    </>
  );
}
