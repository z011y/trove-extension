import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import { ItemsContext } from '../App';
import { ProductImage } from '../components/ProductImage';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { AsyncButton } from '../components/AsyncButton';

export function EditItem({ id }) {
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { items } = useContext(ItemsContext);
  const [currentItem, setCurrentItem] = useState(
    items.find((item) => item.id === Number(id))
  );
  const [location, setLocation] = useLocation();

  async function updateProduct(e) {
    e.preventDefault();
    setIsEditLoading(true);
    const data = JSON.stringify({
      name: currentItem?.name,
      image_urls: currentItem?.image_urls,
      price: Number(currentItem?.price),
      url: currentItem?.url,
      brand: currentItem?.brand,
      description: currentItem?.description,
      is_available: currentItem?.is_available,
    });
    await fetch(`http:localhost:8000/edit-item/${currentItem.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    setIsEditLoading(false);
    setLocation(`/item/${currentItem.id}`);
  }

  return (
    <>
      <div id="content" className="p stack" style={{ paddingBottom: '64px' }}>
        <form className="stack" onSubmit={updateProduct}>
          <Input
            id="product-name-input"
            type="text"
            defaultValue={currentItem.name}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, name: e.target.value })
            }
            label="NAME"
          />
          <div
            className="flow"
            style={{
              overflow: 'scroll',
              marginRight: '-1rem',
              marginLeft: '-1rem',
              paddingLeft: '1rem',
              paddingTop: '8px',
              width: '100vw',
              gap: '1rem',
            }}
          >
            {currentItem?.image_urls.map((url, i) => (
              <ProductImage
                url={url}
                width="312px"
                height="312px"
                isRemoveable={true}
                removeMethod={() =>
                  setCurrentItem({
                    ...currentItem,
                    image_urls: currentItem.image_urls.filter(
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
            defaultValue={currentItem.price}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, price: e.target.value })
            }
            label="PRICE"
          />
          <Textarea
            id="product-description-input"
            defaultValue={currentItem.description}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, description: e.target.value })
            }
            label="DESCRIPTION"
          />
          <div
            className="flow w-full"
            style={{
              position: 'fixed',
              bottom: '96px',
              left: 0,
              padding: '1rem',
              gap: '0.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Link href={`/item/${currentItem.id}`}>
              <button
                className="center"
                style={{ background: '#f5f2ff', gap: '0.5rem' }}
              >
                <XCircle size="18" weight="duotone" />
                CANCEL
              </button>
            </Link>
            <AsyncButton
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
