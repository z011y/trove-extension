import { useState, useContext } from 'react';
import { useLocation } from 'wouter';
import {
  Copy,
  ArrowSquareOut,
  Pencil,
  Trash,
  PlusCircle,
} from '@phosphor-icons/react';
import { ProductsContext } from '../context/products';
import { ProductImage } from '../components/ProductImage';
import { ButtonMenu } from '../components/ButtonMenu';
import { AddToCollectionModal } from '../components/AddToCollectionModal';

export function ProductDetails({ id }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products } = useContext(ProductsContext);
  const [currentProduct] = useState(
    products.find((product) => product.id === Number(id))
  );
  const [location, setLocation] = useLocation();

  async function deleteProduct() {
    setIsDeleteLoading(true);
    await fetch(`http://10.0.0.139:3001/delete-product?productId=${id}`, {
      method: 'POST',
    });
    setIsDeleteLoading(false);
    history.back();
  }

  return (
    <>
      <div id="content" className="p-4 stack">
        <div className="split gap-4">
          <div className="bg-violet center border rounded-3xl px-2 h-6 w-fit">
            <p>{currentProduct.brand}</p>
          </div>
          <ButtonMenu
            product={currentProduct}
            actions={[
              {
                name: 'ADD TO COLLECTION',
                icon: <PlusCircle size="18" weight="duotone" />,
                method: () => setIsModalOpen(true),
              },
              {
                name: 'EDIT',
                icon: <Pencil size="18" weight="duotone" />,
                method: () => setLocation(`/edit-product/${currentProduct.id}`),
              },
              {
                name: 'DELETE',
                icon: <Trash size="18" weight="duotone" />,
                method: deleteProduct,
                warn: true,
              },
            ]}
          />
        </div>
        <h2 className="trunc w-full">{currentProduct.name}</h2>
        <div className="flow overflow-scroll -mx-4 pl-4 pt-2 w-screen gap-4">
          {currentProduct?.image_urls.map((url, i) => (
            <ProductImage url={url} width="312px" height="312px" />
          ))}
        </div>
        <h3>{`$${Number(currentProduct.price).toFixed(2)}`}</h3>
        <div className="flow gap-2">
          <a
            className="w-full no-underline"
            href={currentProduct.url}
            target="_blank"
          >
            <button className="w-full center gap-1">
              <ArrowSquareOut size={18} weight="duotone" />
              VIEW PRODUCT
            </button>
          </a>
          <Copy
            className="clickable"
            size="24"
            weight="duotone"
            onClick={() => navigator.clipboard.writeText(currentProduct.url)}
          />
        </div>

        <p>{currentProduct.description}</p>
        <AddToCollectionModal
          productId={currentProduct.id}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Add to collection"
        />
      </div>
    </>
  );
}
