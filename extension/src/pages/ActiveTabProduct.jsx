import { useState, useContext } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { ActiveTabProductContext } from '../context/activeTabProduct';
import { CollectionsContext } from '../context/collections';
import { ProductsContext } from '../context/products';
import { SessionContext } from '../context/session';
import { ProductImage } from '../components/ProductImage';
import { ButtonAsync } from '../components/ButtonAsync';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

export function ActiveTabProduct() {
  const [collectionId, setCollectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { activeTabProduct, setActiveTabProduct } = useContext(
    ActiveTabProductContext
  );
  const { collections } = useContext(CollectionsContext);
  const { getProducts } = useContext(ProductsContext);
  const { session } = useContext(SessionContext);

  async function addProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('http://10.0.0.139:3001/add-product', {
      method: 'POST',
      body: JSON.stringify({
        product: {
          name: activeTabProduct?.name,
          image_urls: activeTabProduct?.imageUrls,
          price: Number(activeTabProduct?.price),
          url: activeTabProduct?.url,
          brand: activeTabProduct?.brand,
          description: activeTabProduct?.description,
          is_available: activeTabProduct?.isAvailable,
        },
        userId: session.user.id,
      }),
    });
    const data = res.json();
    if (collectionId) {
      await fetch('http://10.0.0.139:3001/add-to-collection', {
        method: 'POST',
        body: JSON.stringify({
          collectionId,
          productId: data.id,
        }),
      });
    }
    getProducts();
    setIsLoading(false);
  }

  return (
    <div id="content" className="stack p-4 pb-16">
      <form className="stack" onSubmit={addProduct}>
        <Input
          id="product-name-input"
          type="text"
          defaultValue={activeTabProduct?.name ?? 'Product Name'}
          onChange={(e) =>
            setActiveTabProduct({ ...activeTabProduct, name: e.target.value })
          }
          label="NAME"
        />
        {activeTabProduct?.imageUrls ? (
          <div className="flow w-screen overflow-scroll gap-4 -mx-4 pl-4 pt-2">
            {activeTabProduct?.imageUrls.map((url, i) => (
              <ProductImage
                url={url}
                width="312px"
                height="312px"
                isRemoveable={true}
                removeMethod={() =>
                  setActiveTabProduct({
                    ...activeTabProduct,
                    imageUrls: activeTabProduct?.imageUrls.filter(
                      (_, imageIndex) => i !== imageIndex
                    ),
                  })
                }
              />
            ))}
          </div>
        ) : (
          <ProductImage width="312px" height="312px" />
        )}
        <Input
          id="product-price-input"
          type="number"
          defaultValue={activeTabProduct?.price ?? '--.--'}
          onChange={(e) =>
            setActiveTabProduct({ ...activeTabProduct, price: e.target.value })
          }
          label="PRICE"
        />
        <Textarea
          id="product-description-textarea"
          onChange={(e) =>
            setActiveTabProduct({
              ...activeTabProduct,
              description: e.target.value,
            })
          }
          defaultValue={activeTabProduct?.description ?? 'Product description'}
          label="DESCRIPTION"
        />
        <div className="flow fixed bottom-0 left-0 bg-white w-full h-fit border-t border-[#e4defc] p-4">
          <select
            name="collections"
            id="collection-select"
            className="w-full"
            onChange={(e) => setCollectionId(e.target.value)}
          >
            <option value="">My Trove</option>
            {collections.map((collection) => {
              return <option value={collection.id}>{collection.name}</option>;
            })}
          </select>
          <ButtonAsync
            text="add"
            icon={<PlusCircle size="18" weight="duotone" />}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
