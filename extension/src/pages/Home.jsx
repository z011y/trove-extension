import { useState, useContext } from 'react';
import { Link } from 'wouter';
import { PlusCircle, PencilSimple, CheckFat } from '@phosphor-icons/react';
import { CurrentItemContext, CollectionsContext, ItemsContext } from '../App';
import { EditableField } from '../components/EditableField';
import { ProductImage } from '../components/ProductImage';
import { AsyncButton } from '../components/AsyncButton';
import { ActionButton } from '../components/ActionButton';
import { EditButton } from '../components/EditButton';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

export function Home() {
  const [collectionId, setCollectionId] = useState('');
  const [isEditActive, setIsEditActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);
  const { collections } = useContext(CollectionsContext);
  const { getItems } = useContext(ItemsContext);

  async function addItem(e) {
    e.preventDefault();
    setIsLoading(true);
    const url = collectionId
      ? `http://localhost:8000/add-item?collection_id=${collectionId}`
      : 'http://localhost:8000/add-item';

    const data = JSON.stringify({
      name: currentItem?.name,
      image_urls: currentItem?.imageUrls,
      price: Number(currentItem?.price),
      url: currentItem?.url,
      brand: currentItem?.brand,
      description: currentItem?.description,
      is_available: currentItem?.isAvailable,
    });

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }).then(() => {
      getItems();
      setIsLoading(false);
    });
  }

  return (
    <div id="content" className="p stack" style={{ paddingBottom: '64px' }}>
      {/* <div className="split" style={{ gap: '1rem' }}>
        <EditableField
          field="name"
          type="text"
          defaultText={currentItem?.name ?? 'Product Name'}
          isEditActive={isEditActive}
        >
          <h2
            className="trunc w-full"
            style={currentItem?.name ? {} : { opacity: '0.5' }}
          >
            {currentItem?.name ?? 'Product Name'}
          </h2>
        </EditableField>
        <EditButton
          isEditActive={isEditActive}
          setIsEditActive={setIsEditActive}
        />
      </div> */}

      {/* {currentItem?.imageUrls ? (
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
          {currentItem?.imageUrls.map((url, i) => (
            <ProductImage
              url={url}
              width="312px"
              height="312px"
              isRemoveable={true}
              imageIndex={i}
            />
          ))}
        </div>
      ) : (
        <ProductImage width="312px" height="312px" />
      )}
      <EditableField
        field="price"
        type="number"
        defaultText={currentItem?.price ?? '-.--'}
        isEditActive={isEditActive}
      >
        <h3
          className="w-full"
          style={currentItem?.price ? {} : { opacity: '0.5' }}
        >
          {`$${currentItem?.price}` ?? '$-.--'}
        </h3>
      </EditableField>
      <EditableField
        field="description"
        type="text"
        defaultText={currentItem?.description ?? 'Product description'}
        isEditActive={isEditActive}
      >
        <p
          className="w-full"
          style={currentItem?.description ? {} : { opacity: '0.5' }}
        >
          {currentItem?.description ?? 'Product description'}
        </p>
      </EditableField> */}
      <form className="stack" onSubmit={addItem}>
        <Input
          id="product-name-input"
          type="text"
          defaultValue={currentItem?.name ?? 'Product Name'}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, name: e.target.value })
          }
          label="NAME"
        />
        {currentItem?.imageUrls ? (
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
            {currentItem?.imageUrls.map((url, i) => (
              <ProductImage
                url={url}
                width="312px"
                height="312px"
                isRemoveable={true}
                removeMethod={() =>
                  setCurrentItem({
                    ...currentItem,
                    imageUrls: currentItem.imageUrls.filter(
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
          defaultValue={currentItem?.price ?? '--.--'}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, price: e.target.value })
          }
          label="PRICE"
        />
        <Textarea
          id="product-description-textarea"
          onChange={(e) =>
            setCurrentItem({ ...currentItem, description: e.target.value })
          }
          defaultValue={currentItem?.description ?? 'Product description'}
          label="DESCRIPTION"
        />
        <div
          className="flow p"
          style={{
            gap: '1rem',
            position: 'fixed',
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <select
            name="collections"
            id="collection-select"
            style={{ width: '100%' }}
            onChange={(e) => setCollectionId(e.target.value)}
          >
            <option value="">My Trove</option>
            {collections.map((collection) => {
              return <option value={collection.id}>{collection.name}</option>;
            })}
          </select>
          <AsyncButton
            text="add"
            icon={<PlusCircle size="18" weight="duotone" />}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
