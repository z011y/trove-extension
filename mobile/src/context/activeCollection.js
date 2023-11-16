import { useState, createContext } from 'react';

export const ActiveCollectionContext = createContext(null);

export function ActiveCollectionProvider({ children }) {
  const [activeCollection, setActiveCollection] = useState(0);

  return (
    <ActiveCollectionContext.Provider
      value={{ activeCollection, setActiveCollection }}
    >
      {children}
    </ActiveCollectionContext.Provider>
  );
}
