import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { Copy, Pencil, Trash, PlusCircle } from '@phosphor-icons/react';
import { ProductsContext } from '../context/products';
import { ButtonMenu } from './ButtonMenu';
import { ProductImage } from './ProductImage';
import { AddToCollectionModal } from './AddToCollectionModal';

export function ListItemProduct({ product }) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { getProducts } = useContext(ProductsContext);

  async function deleteProduct() {
    setIsDeleteLoading(true);
    await fetch(
      `http://10.0.0.139:3001/delete-product?productId=${product.id}`,
      { method: 'POST' }
    );
    setIsDeleteLoading(false);
    getProducts();
  }

  return (
    <div className="space-between border-b p-4 clickable hoverable gap-2">
      <Link href={`/product/${product.id}`}>
        <div className="flow h-16 gap-2 overflow-hidden">
          <ProductImage
            url={product?.image_urls[0]}
            height="64px"
            width="64px"
          />
          <h3 className="text-ellipsis whitespace-nowrap overflow-hidden">
            {product.name}
          </h3>
        </div>
      </Link>
      <div className="flow">
        <div className="bg-violet center border rounded-3xl px-2 h-6 w-fit">
          <p>{`$${Number(product.price).toFixed(2)}`}</p>
        </div>
        <ButtonMenu
          actions={[
            {
              name: 'ADD TO COLLECTION',
              icon: <PlusCircle size="18" weight="duotone" />,
              method: () => setIsModalOpen(true),
            },
            {
              name: 'COPY LINK',
              icon: <Copy size="18" weight="duotone" />,
              method: () => navigator.clipboard.writeText(product.url),
            },
            {
              name: 'EDIT',
              icon: <Pencil size="18" weight="duotone" />,
              method: () => setLocation(`/edit-product/${product.id}`),
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
      <AddToCollectionModal
        productId={product.id}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Choose Collection"
      />
    </div>
  );
}
