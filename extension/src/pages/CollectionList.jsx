import { useEffect, useContext } from 'react';
import { Link, useLocation } from 'wouter';
import { PlusCircle } from '@phosphor-icons/react';
import { ListItemCollection } from '../components/ListItemCollection';
import { CollectionsContext } from '../context/collections';

export function CollectionList() {
  const { collections, getCollections } = useContext(CollectionsContext);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <button
        className="center fixed bottom-4 right-4 gap-1 z-[7]"
        onClick={() => setLocation('/new-collection')}
      >
        <PlusCircle size="16" weight="duotone" />
        New Collection
      </button>
      {collections.map((collection) => {
        return (
          <Link href={`/collection/${collection.id}`}>
            <div>
              <ListItemCollection collection={collection} />
            </div>
          </Link>
        );
      })}
    </>
  );
}
