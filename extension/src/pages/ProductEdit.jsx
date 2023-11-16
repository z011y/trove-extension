import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import { ProductsContext } from '../context/products';
import { ProductImage } from '../components/ProductImage';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { ButtonAsync } from '../components/ButtonAsync';

export function ProductEdit({ id }) {
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { products } = useContext(ProductsContext);
  const [currentProduct, setCurrentProduct] = useState(
    products.find((product) => product.id === Number(id))
  );
  const [location, setLocation] = useLocation();

  async function updateProduct(e) {
    e.preventDefault();
    setIsEditLoading(true);
    const body = JSON.stringify({
      name: currentProduct?.name,
      image_urls: currentProduct?.image_urls,
      price: Number(currentProduct?.price),
      url: currentProduct?.url,
      brand: currentProduct?.brand,
      description: currentProduct?.description,
      is_available: currentProduct?.is_available,
    });
    await fetch('http://10.0.0.139:3001/edit-product', {
      method: 'POST',
      body,
    });
    setIsEditLoading(false);
    setLocation(`/product/${currentProduct.id}`);
  }

  return (
    <>
      <div id="content" className="p-4 stack pb-16">
        <form className="stack" onSubmit={updateProduct}>
          <Input
            id="product-name-input"
            type="text"
            defaultValue={currentProduct.name}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
            label="NAME"
          />
          <div className="flow overflow-scroll -mx-4 pl-4 pt-2 w-screen gap-4">
            {currentProduct?.image_urls.map((url, i) => (
              <ProductImage
                url={url}
                width="312px"
                height="312px"
                isRemoveable={true}
                removeMethod={() =>
                  setCurrentProduct({
                    ...currentProduct,
                    image_urls: currentProduct.image_urls.filter(
                      (_, imageIndex) => i !== imageIndex
                    ),
                  })
                }
              />
            ))}
          </div>
          <Input
            id="product-price-input"
            type="number"
            defaultValue={currentProduct.price}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
            label="PRICE"
          />
          <Textarea
            id="product-description-input"
            defaultValue={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                description: e.target.value,
              })
            }
            label="DESCRIPTION"
          />
          <div className="flow w-full fixed bottom-4 left-0 p-4 gap-2 justify-end">
            <Link href={`/product/${currentProduct.id}`}>
              <button
                className="center gap-2"
                style={{ background: '#f5f2ff' }}
              >
                <XCircle size="18" weight="duotone" />
                CANCEL
              </button>
            </Link>
            <ButtonAsync
              text="Apply Changes"
              icon={<CheckCircle size="18" weight="duotone" />}
              isLoading={isEditLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
}
