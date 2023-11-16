import { useState, useContext } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { useLocation } from 'wouter';
import { SessionContext } from '../context/session';
import { ButtonAsync } from '../components/ButtonAsync';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

export function CollectionAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const { session } = useContext(SessionContext);

  async function createCollection(e) {
    e.preventDefault();
    setIsLoading(true);
    await fetch('http://10.0.0.139:3001/add-collection', {
      method: 'POST',
      body: JSON.stringify({
        collection: {
          name,
          description,
          userId: session.user.id,
        },
      }),
    });
    setIsLoading(false);
    setLocation('/collections');
  }

  return (
    <div className="stack w-full p-4">
      <h2>New Collection</h2>
      <form className="stack" onSubmit={createCollection}>
        <Input
          id="collection-name-input"
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection Name"
          label="NAME"
        />
        <Textarea
          id="collection-description-input"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Collection Description"
          label="DESCRIPTION"
        />
        <ButtonAsync
          text="Create Collection"
          icon={<PlusCircle size="18" weight="duotone" />}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
