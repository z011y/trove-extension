import { useState, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import { CollectionsContext } from '../App';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { AsyncButton } from '../components/AsyncButton';

export function EditCollection({ id }) {
  const [isEditLoading, setIsEditLoading] = useState(false);
  const { collections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();

  const [currentCollection, setCurrentCollection] = useState(
    collections.find((collection) => collection.id === Number(id))
  );

  async function updateCollection(e) {
    e.preventDefault();
    setIsEditLoading(true);
    await fetch(
      `http://localhost:8000/edit-collection/${currentCollection.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: currentCollection.name,
          description: currentCollection.description,
        }),
      }
    );
    setIsEditLoading(false);
    setLocation(`/collection/${currentCollection.id}`);
  }

  return (
    <>
      <div id="content" className="p stack" style={{ paddingBottom: '64px' }}>
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
            <Link href={`/collection/${currentCollection.id}`}>
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
