import { useEffect, useState, createContext } from 'react';
import { Router, Route, Redirect } from 'wouter';
import { Layout } from './Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Loading } from './components/Loading';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Trove } from './pages/Trove';
import { Account } from './pages/Account';
import { CollectionsPage } from './pages/./CollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { ItemPage } from './pages/ItemPage';
import { CreateCollection } from './pages/CreateCollection';
import { EditItem } from './pages/EditItem';
import { EditCollection } from './pages/EditCollection';
import './App.css';

export const SessionContext = createContext(null);
export const CurrentItemContext = createContext({});
export const CollectionsContext = createContext([]);
export const ItemsContext = createContext([]);

export function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [collections, setCollections] = useState(null);
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getCurrentItem() {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      getItem: true,
    });
    setCurrentItem(response);
  }

  async function getCollections() {
    const res = await fetch(`http://localhost:8000/get-collections`);
    const data = await res.json();
    setCollections(data);
  }

  async function getItems() {
    const res = await fetch(`http://localhost:8000/get-items`);
    const data = await res.json();
    setItems(data);
  }

  async function fetchData() {
    setIsLoading(true);
    const res = await fetch('http://localhost:8000/get-session');
    const data = await res.json();

    if (data.session) {
      setIsAuthenticated(true);
      await getCollections();
      await getItems();
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getCurrentItem();
    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  if (isAuthenticated) {
    return (
      <>
        <CurrentItemContext.Provider value={{ currentItem, setCurrentItem }}>
          <CollectionsContext.Provider value={{ collections, getCollections }}>
            <ItemsContext.Provider value={{ items, getItems }}>
              <ScrollToTop />
              <Layout>
                <Redirect to="/" />
                <Route path="/">
                  <Home />
                </Route>
                <Route path="/all-items">
                  <Trove />
                </Route>
                <Route path="/account">
                  <Account setIsAuthenticated={setIsAuthenticated} />
                </Route>
                <Route path="/collections">
                  <CollectionsPage />
                </Route>
                <Route path="/new-collection">
                  <CreateCollection />
                </Route>
                <Route path="/collection/:id">
                  {(params) => <CollectionPage id={params.id} />}
                </Route>
                <Route path="/item/:id">
                  {(params) => <ItemPage id={params.id} />}
                </Route>
                <Route path="/edit-item/:id">
                  {(params) => <EditItem id={params.id} />}
                </Route>
                <Route path="/edit-collection/:id">
                  {(params) => <EditCollection id={params.id} />}
                </Route>
              </Layout>
            </ItemsContext.Provider>
          </CollectionsContext.Provider>
        </CurrentItemContext.Provider>
      </>
    );
  }

  return (
    <>
      <Redirect to="/login" />
      <Route path="/login">
        <Login setIsAuthenticated={setIsAuthenticated} fetchData={fetchData} />
      </Route>
      <Route path="/sign-up">
        <SignUp getSession={fetchData} />
      </Route>
    </>
  );
}
