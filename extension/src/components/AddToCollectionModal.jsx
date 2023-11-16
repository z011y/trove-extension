import { useState, useEffect, useContext } from 'react';
import { ArrowClockwise, XCircle } from '@phosphor-icons/react';
import { ListItemCollection } from './ListItemCollection';
import { CollectionsContext } from '../context/collections';

export function AddToCollectionModal({ productId, isOpen, setIsOpen, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const { collections } = useContext(CollectionsContext);

  async function addToCollection(collectionId) {
    setIsLoading(true);
    await fetch('http://10.0.0.139:3001/add-to-collection', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        collectionId,
      }),
    });
    setIsLoading(false);
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="border w-full fixed z-10 bottom-0 left-0 h-[66vh] rounded-t-2xl bg-white shadow-xl">
        <div className="border-b space-between p-4 h-12">
          <h3>{title}</h3>
          {isLoading ? (
            <ArrowClockwise className="rotate" size="24" />
          ) : (
            <XCircle
              className="clickable"
              size="24"
              weight="duotone"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
        <div className="overflow-y-scroll overscroll-contain h-full pb-12">
          {collections.map((collection) => {
            return (
              <div onClick={() => addToCollection(collection.id)}>
                <ListItemCollection collection={collection} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
