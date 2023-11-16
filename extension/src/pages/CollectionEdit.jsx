import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import { CollectionsContext } from '../context/collections';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { ButtonAsync } from '../components/ButtonAsync';

export function CollectionEdit({ id }) {
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { collections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();

  const [currentCollection, setCurrentCollection] = useState(
    collections.find((collection) => collection.id === Number(id))
  );

  async function updateCollection(e) {
    e.preventDefault();
    setIsEditLoading(true);
    await fetch('http://10.0.0.139:3001/edit-collection', {
      method: 'POST',
      body: JSON.stringify({
        collection: {
          id: currentCollection.id,
          name: currentCollection.name,
          description: currentCollection.description,
        },
      }),
    });
    setIsEditLoading(false);
    setLocation(`/collection/${currentCollection.id}`);
  }

  return (
    <>
      <div id="content" className="p-4 stack pb-16">
        <form className="stack" onSubmit={updateCollection}>
          <Input
            id="collection-name-input"
            type="text"
            defaultValue={currentCollection.name}
            onChange={(e) =>
              setCurrentCollection({
                ...currentCollection,
                name: e.target.value,
              })
            }
            label="NAME"
          />
          <Textarea
            id="collection-description-input"
            defaultValue={currentCollection.description}
            onChange={(e) =>
              setCurrentCollection({
                ...currentCollection,
                description: e.target.value,
              })
            }
            label="DESCRIPTION"
          />
          <div className="flow w-full fixed bottom-4 left-0 p-4 gap-2 justify-end">
            <Link href={`/collection/${currentCollection.id}`}>
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
