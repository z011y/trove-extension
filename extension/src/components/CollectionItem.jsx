import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { Copy, Pencil, Trash, PlusCircle } from '@phosphor-icons/react';
import { ItemsContext } from '../App';
import { MenuButton } from './MenuButton';
import { ProductImage } from './ProductImage';
import { AddToCollectionModal } from './AddToCollectionModal';

export function CollectionItem({ item }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { getItems } = useContext(ItemsContext);

  async function deleteItem() {
    setIsDeleteLoading(true);
    await fetch(`http://localhost:8000/delete-item/${item.id}`, {
      method: 'POST',
    });
    setIsDeleteLoading(false);
    getItems();
  }

  return (
    <div
      className="space-between border-b p clickable hoverable"
      style={{ gap: '8px' }}
    >
      <Link href={`/item/${item.id}`}>
        <div
          className="flow"
          style={{ height: '64px', gap: '8px', overflow: 'hidden' }}
        >
          <ProductImage url={item?.image_urls[0]} height="64px" width="64px" />
          <h3
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {item.name}
          </h3>
        </div>
      </Link>
      <div className="flow">
        <div
          className="bg-violet center border"
          style={{
            borderRadius: '24px',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            height: '24px',
            width: 'fit-content',
          }}
        >
          <p>{`$${Number(item.price).toFixed(2)}`}</p>
        </div>
        <MenuButton
          actions={[
            {
              name: 'ADD TO COLLECTION',
              icon: <PlusCircle size="18" weight="duotone" />,
              method: () => setIsModalOpen(true),
            },
            {
              name: 'COPY LINK',
              icon: <Copy size="18" weight="duotone" />,
              method: () => navigator.clipboard.writeText(item.url),
            },
            {
              name: 'EDIT',
              icon: <Pencil size="18" weight="duotone" />,
              method: () => setLocation(`/edit-item/${item.id}`),
            },
            {
              name: 'DELETE',
              icon: <Trash size="18" weight="duotone" />,
              method: deleteItem,
              warn: true,
            },
          ]}
        />
      </div>
      <AddToCollectionModal
        itemId={item.id}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Choose Collection"
      />
    </div>
  );
}
