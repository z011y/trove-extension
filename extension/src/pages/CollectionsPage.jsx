import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { PlusCircle, PencilSimple } from '@phosphor-icons/react';
import { Collection } from '../components/Collection';
import { CollectionsContext } from '../App';
import { ActionBar } from '../components/ActionBar';
import { ActionButton } from '../components/ActionButton';

export function CollectionsPage() {
  const { collections, getCollections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <button
        className="center"
        onClick={() => setLocation('/new-collection')}
        style={{
          position: 'fixed',
          bottom: '112px',
          right: '1rem',
          gap: '4px',
          zIndex: 7,
        }}
      >
        <PlusCircle size="16" weight="duotone" />
        New Collection
      </button>
      {collections.map((collection) => {
        return (
          <Link href={`/collection/${collection.id}`}>
            <div onClick={() => console.log(collection.id)}>
              <Collection collection={collection} />
            </div>
          </Link>
        );
      })}
    </>
  );
}
