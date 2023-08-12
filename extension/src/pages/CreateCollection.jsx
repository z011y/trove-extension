import { useState, useContext } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { useLocation } from 'wouter';
import { AsyncButton } from '../components/AsyncButton';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

export function CreateCollection() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useLocation();

  async function createCollection(e) {
    e.preventDefault();
    setIsLoading(true);
    await fetch('http://localhost:8000/create-collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    setIsLoading(false);
    setLocation('/collections');
  }

  return (
    <div className="stack w-full p">
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
        <AsyncButton
          text="Create Collection"
          icon={<PlusCircle size="18" weight="duotone" />}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
