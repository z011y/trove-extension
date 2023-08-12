import { useState, useEffect, useContext } from 'react';
import { ArrowClockwise, XCircle } from '@phosphor-icons/react';
import { Collection } from './Collection';
import { CollectionsContext } from '../App';

export function AddToCollectionModal({ itemId, isOpen, setIsOpen, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const { collections } = useContext(CollectionsContext);

  async function addToCollection(collectionId) {
    setIsLoading(true);
    const data = JSON.stringify({
      item_id: itemId,
      collection_id: collectionId,
    });
    await fetch('http://localhost:8000/add-to-collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
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
      <div
        className="border w-full"
        style={{
          position: 'fixed',
          zIndex: 10,
          bottom: 0,
          left: 0,
          height: '66vh',
          borderRadius: '1rem 1rem 0 0',
          backgroundColor: 'white',
          boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="border-b space-between p" style={{ height: '3rem' }}>
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
        <div
          style={{
            overflowY: 'scroll',
            overscrollBehavior: 'contain',
            height: '100%',
            paddingBottom: '48px',
          }}
        >
          {collections.map((collection) => {
            return (
              <div onClick={() => addToCollection(collection.id)}>
                <Collection collection={collection} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
