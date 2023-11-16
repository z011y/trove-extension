import { useEffect, useState, useContext } from 'react';
import { Route, Redirect } from 'wouter';

import './App.css';
import { ActiveTabProductContext } from './context/activeTabProduct';
import { CollectionsContext } from './context/collections';
import { ProductsContext } from './context/products';
import { SessionContext } from './context/session';
import { Layout } from './Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Loading } from './components/Loading';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Account } from './pages/Account';
import { ActiveTabProduct } from './pages/ActiveTabProduct';
import { YourTrove } from './pages/YourTrove';
import { CollectionList } from './pages/./CollectionList';
import { CollectionDetails } from './pages/CollectionDetails';
import { CollectionAdd } from './pages/CollectionAdd';
import { CollectionEdit } from './pages/CollectionEdit';
import { ProductDetails } from './pages/ProductDetails';
import { ProductEdit } from './pages/ProductEdit';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { getActiveTabProduct } = useContext(ActiveTabProductContext);
  const { getCollections } = useContext(CollectionsContext);
  const { getProducts } = useContext(ProductsContext);
  const { session, getSession } = useContext(SessionContext);

  async function fetchData() {
    setIsLoading(true);
    await getCollections();
    await getProducts();
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getSession();
    getActiveTabProduct();
    setIsLoading(false);
    console.log(session);
  }, []);

  useEffect(() => {
    console.log(session);
    if (session) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) return <Loading />;

  if (session) {
    return (
      <>
        <ScrollToTop />
        <Layout>
          <Redirect to="/" />
          <Route path="/">
            <ActiveTabProduct />
          </Route>
          <Route path="/your-trove">
            <YourTrove />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/collections">
            <CollectionList />
          </Route>
          <Route path="/new-collection">
            <CollectionAdd />
          </Route>
          <Route path="/collection/:id">
            {(params) => <CollectionDetails id={params.id} />}
          </Route>
          <Route path="/product/:id">
            {(params) => <ProductDetails id={params.id} />}
          </Route>
          <Route path="/edit-product/:id">
            {(params) => <ProductEdit id={params.id} />}
          </Route>
          <Route path="/edit-collection/:id">
            {(params) => <CollectionEdit id={params.id} />}
          </Route>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Redirect to="/sign-in" />
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
    </>
  );
}
