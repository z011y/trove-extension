import { useEffect, useContext } from 'react';
import { ProductsContext } from '../context/products';
import { ListItemProduct } from '../components/ListItemProduct';

export function YourTrove() {
  const { products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product) => {
        return <ListItemProduct product={product} />;
      })}
    </>
  );
}
