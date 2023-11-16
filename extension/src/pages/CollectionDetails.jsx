import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'wouter';
import { Pencil, Trash } from '@phosphor-icons/react';
import { ListItemProduct } from '../components/ListItemProduct';
import { ProductsContext } from '../context/products';
import { CollectionsContext } from '../context/collections';
import { ButtonMenu } from '../components/ButtonMenu';

export function CollectionDetails({ id }) {
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { products } = useContext(ProductsContext);
  const { collections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();
  const [currentCollection] = useState(
    collections.find((collection) => collection.id === Number(id))
  );

  async function getProductsForCollection() {
    const res = await fetch(
      `http://10.0.0.139:3001/get-products-for-collection/${id}`
    );
    const data = res.json();
    setCollectionProducts(data);
  }

  async function deleteCollection() {
    setIsDeleteLoading(true);
    await fetch(`http://10.0.0.139:3001/delete-collection?collectionId=${id}`, {
      method: 'POST',
    });
    setIsDeleteLoading(false);
    setLocation('/collections');
  }

  function calculateTotal() {
    return collectionProducts.reduce(
      (total, product) => Number(product.price) + total,
      0
    );
  }

  useEffect(() => {
    getProductsForCollection();
  }, [products]);

  return (
    <>
      <div className="space-between p-4">
        <div className="flow">
          <h2>{currentCollection.name}</h2>
        </div>
        <div className="flow">
          <h3>{`$${calculateTotal().toFixed(2)}`}</h3>
          <ButtonMenu
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
      {collectionProducts.map((product) => {
        return <ListItemProduct product={product} />;
      })}
    </>
  );
}
