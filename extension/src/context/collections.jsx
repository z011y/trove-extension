import { useState, createContext } from 'react';

export const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(null);

  async function getCollections() {
    // const cache = localStorage.getItem('collections');
    // console.log(cache);
    // if (cache) setCollections(cache);
    const res = await fetch('http://10.0.0.139:3001/get-collections');
    const data = await res.json();
    // localStorage.setItem('collections', data);
    setCollections(data);
  }

  return (
    <CollectionsContext.Provider value={{ collections, getCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
}
