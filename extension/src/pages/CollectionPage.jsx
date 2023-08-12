import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { Pencil, Trash, ArrowLeft } from '@phosphor-icons/react';
import { CollectionItem } from '../components/CollectionItem';
import { ItemsContext, CollectionsContext } from '../App';
import { ActionBar } from '../components/ActionBar';
import { DeleteButton } from '../components/DeleteButton';
import { EditButton } from '../components/EditButton';
import { MenuButton } from '../components/MenuButton';
import { Input } from '../components/Input';

export function CollectionPage({ id }) {
  const [collectionItems, setCollectionItems] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const { items, getItems } = useContext(ItemsContext);
  const { collections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();

  const [currentCollection, setCurrentCollection] = useState(
    collections.find((collection) => collection.id === Number(id))
  );

  async function getItemsForCollection() {
    const res = await fetch(
      `http://localhost:8000/get-collection-item-ids/${id}`
    );
    const itemIds = await res.json();
    setCollectionItems(items.filter((item) => itemIds.includes(item.id)));
  }

  async function deleteCollection() {
    setIsDeleteLoading(true);
    await fetch(`http://localhost:8000/delete-collection/${id}`, {
      method: 'POST',
    });
    setIsDeleteLoading(false);
    setLocation('/collections');
  }

  function calculateTotal() {
    return collectionItems.reduce(
      (total, item) => Number(item.price) + total,
      0
    );
  }

  useEffect(() => {
    getItemsForCollection();
  }, [items]);

  return (
    <>
      <div className="space-between p">
        <div className="flow">
          <h2>{currentCollection.name}</h2>
        </div>
        <div className="flow">
          <h3>{`$${calculateTotal().toFixed(2)}`}</h3>
          <MenuButton
            actions={[
              {
                name: 'EDIT',
                icon: <Pencil size="18" weight="duotone" />,
                method: () =>
                  setLocation(`/edit-collection/${currentCollection.id}`),
              },
              {
                name: 'DELETE',
                icon: <Trash size="18" weight="duotone" />,
                method: deleteCollection,
                warn: true,
              },
            ]}
          />
        </div>
      </div>
      {collectionItems.map((item) => {
        return <CollectionItem item={item} />;
      })}
    </>
  );
}
