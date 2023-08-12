import { useState, useEffect, useContext } from 'react';
import { ProductImage } from './ProductImage';
import { ItemsContext } from '../App';

export function Collection({ collection }) {
  const [collectionItems, setCollectionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { items, getItems } = useContext(ItemsContext);

  async function getItemsForCollection() {
    const res = await fetch(
      `http://localhost:8000/get-collection-item-ids/${collection.id}`
    );
    const itemIds = await res.json();
    setCollectionItems(items.filter((item) => itemIds.includes(item.id)));
    setIsLoading(false);
  }

  function calculateTotal() {
    return collectionItems.reduce(
      (total, item) => Number(item.price) + total,
      0
    );
  }

  useEffect(() => {
    getItems().then(() => {
      getItemsForCollection();
    });
  }, []);

  return (
    <div
      className="p border-b clickable hoverable"
      style={{ minHeight: '127.5px' }}
    >
      <div className="space-between pb">
        <div className="flow">
          <h3 style={{ textOverflow: 'ellipsis' }}>{collection.name}</h3>
        </div>
        <h4>{`$${calculateTotal().toFixed(2)}`}</h4>
      </div>
      {isLoading ? (
        <div className="flow">
          <div
            className="shimmer"
            style={{ minWidth: '64px', height: '64px', borderRadius: '12px' }}
          ></div>
          <div
            className="shimmer"
            style={{ minWidth: '64px', height: '64px', borderRadius: '12px' }}
          ></div>
          <div
            className="shimmer"
            style={{ minWidth: '64px', height: '64px', borderRadius: '12px' }}
          ></div>
          <div
            className="shimmer"
            style={{ minWidth: '64px', height: '64px', borderRadius: '12px' }}
          ></div>
          <div
            className="shimmer"
            style={{ minWidth: '64px', height: '64px', borderRadius: '12px' }}
          ></div>
        </div>
      ) : collectionItems.length > 0 ? (
        <div className="flow">
          {collectionItems.map((item) => {
            return (
              <ProductImage
                url={item.image_urls[0]}
                width="64px"
                height="64px"
              />
            );
          })}
        </div>
      ) : (
        <p style={{ opacity: '0.5' }}>No products in collection</p>
      )}
    </div>
  );
}
