import { useState, createContext } from 'react';

export const CollectionProductsContext = createContext(null);

export function CollectionProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  async function getProductsAndCollections() {
    const productsResponse = await fetch('http://10.0.0.139:3001/get-products');
    const productsData = await productsResponse.json();
    setProducts(productsData);

    const collectionsResponse = await fetch(
      'http://10.0.0.139:3001/get-collections'
    );
    const collectionsData = await collectionsResponse.json();
    const collectionsWithProducts = collectionsData.map((collection) => {
      const productsInCollection = productsData.filter((product) =>
        product.collection_product.some(
          (collectionProduct) =>
            collectionProduct.collection_id === collection.id
        )
      );
      return {
        ...collection,
        products: productsInCollection,
      };
    });
    setCollections(collectionsWithProducts);
  }

  return (
    <CollectionProductsContext.Provider
      value={{ products, collections, getProductsAndCollections }}
    >
      {children}
    </CollectionProductsContext.Provider>
  );
}
