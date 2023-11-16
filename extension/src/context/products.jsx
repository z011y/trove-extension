import { useState, createContext } from 'react';

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    // const cache = localStorage.getItem('products');
    // console.log(cache);
    // if (cache) setProducts(cache);
    const res = await fetch('http://10.0.0.139:3001/get-products');
    const data = await res.json();
    // localStorage.setItem('products', data);
    setProducts(data);
  }

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
