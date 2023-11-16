import { useState, createContext } from 'react';

export const ActiveTabProductContext = createContext(null);

export function ActiveTabProductProvider({ children }) {
  const [activeTabProduct, setActiveTabProduct] = useState(null);

  async function getActiveTabProduct() {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      getProduct: true,
    });
    setActiveTabProduct(response);
  }

  return (
    <ActiveTabProductContext.Provider value={{ activeTabProduct, getActiveTabProduct }}>
      {children}
    </ActiveTabProductContext.Provider>
  )
}
