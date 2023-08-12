import { useState, useContext } from 'react';
import { useLocation } from 'wouter';
import {
  Copy,
  ArrowSquareOut,
  Pencil,
  Trash,
  PlusCircle,
} from '@phosphor-icons/react';
import { ItemsContext } from '../App';
import { ProductImage } from '../components/ProductImage';
import { MenuButton } from '../components/MenuButton';
import { AddToCollectionModal } from '../components/AddToCollectionModal';

export function ItemPage({ id }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useContext(ItemsContext);
  const [currentItem, setCurrentItem] = useState(
    items.find((item) => item.id === Number(id))
  );
  const [location, setLocation] = useLocation();

  async function deleteItem() {
    setIsDeleteLoading(true);
    await fetch(`http://localhost:8000/delete-item/${currentItem.id}`, {
      method: 'POST',
    });
    setIsDeleteLoading(false);
    history.back();
  }

  return (
    <>
      <div id="content" className="p stack">
        <div className="split" style={{ gap: '1rem' }}>
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
            <p>{currentItem.brand}</p>
          </div>
          <MenuButton
            item={currentItem}
            actions={[
              {
                name: 'ADD TO COLLECTION',
                icon: <PlusCircle size="18" weight="duotone" />,
                method: () => setIsModalOpen(true),
              },
              {
                name: 'EDIT',
                icon: <Pencil size="18" weight="duotone" />,
                method: () => setLocation(`/edit-item/${currentItem.id}`),
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
        <h2 className="trunc w-full">{currentItem.name}</h2>
        <div
          className="flow"
          style={{
            overflow: 'scroll',
            marginRight: '-1rem',
            marginLeft: '-1rem',
            paddingLeft: '1rem',
            paddingTop: '8px',
            width: '100vw',
            gap: '1rem',
          }}
        >
          {currentItem?.image_urls.map((url, i) => (
            <ProductImage url={url} width="312px" height="312px" />
          ))}
        </div>

        <h3>{`$${Number(currentItem.price).toFixed(2)}`}</h3>

        <div className="flow" style={{ gap: '0.5rem' }}>
          <a
            className="w-full"
            style={{ textDecoration: 'none' }}
            href={currentItem.url}
            target="_blank"
          >
            <button className="w-full center" style={{ gap: '4px' }}>
              <ArrowSquareOut size={18} weight="duotone" />
              VIEW PRODUCT
            </button>
          </a>
          <Copy
            className="clickable"
            size="24"
            weight="duotone"
            onClick={() => navigator.clipboard.writeText(currentItem.url)}
          />
        </div>

        <p>{currentItem.description}</p>
        <AddToCollectionModal
          itemId={currentItem.id}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Add to collection"
        />
      </div>
    </>
  );
}
