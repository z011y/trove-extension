import { useState, useEffect, useContext } from 'react';
import { ProductImage } from './ProductImage';
import { ProductsContext } from '../context/products';

export function ListItemCollection({ collection }) {
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getProducts } = useContext(ProductsContext);

  async function getProductsForCollection() {
    const res = await fetch(
      `http://10.0.0.139:3001/get-products-for-collection/${collection.id}`
    );
    const data = await res.json();
    setCollectionProducts(data);
    setIsLoading(false);
  }

  function calculateTotal() {
    return collectionProducts?.reduce(
      (total, product) => Number(product.price) + total,
      0
    );
  }

  useEffect(() => {
    getProducts().then(() => {
      getProductsForCollection();
    });
  }, []);

  return (
    <div className="p-4 border-b clickable hoverable min-h-[127.5px]">
      <div className="space-between pb">
        <div className="flow">
          <h3 className="text-ellipsis">{collection.name}</h3>
        </div>
        <h4>{`$${calculateTotal().toFixed(2)}`}</h4>
      </div>
      {isLoading ? (
        <div className="flow">
          <div className="shimmer min-w-[64px] h-16 rounded-2xl"></div>
          <div className="shimmer min-w-[64px] h-16 rounded-2xl"></div>
          <div className="shimmer min-w-[64px] h-16 rounded-2xl"></div>
          <div className="shimmer min-w-[64px] h-16 rounded-2xl"></div>
          <div className="shimmer min-w-[64px] h-16 rounded-2xl"></div>
        </div>
      ) : collectionProducts.length > 0 ? (
        <div className="flow">
          {collectionProducts.map((product) => {
            return (
              <ProductImage
                url={product.image_urls[0]}
                width="64px"
                height="64px"
              />
            );
          })}
        </div>
      ) : (
        <p className="opacity-50">No products in collection</p>
      )}
    </div>
  );
}
