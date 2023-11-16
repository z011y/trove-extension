import { useContext } from 'react';
import { Link, useRoute } from 'wouter';
import { Header } from './components/Header';
import { ActiveTabProductContext } from '././context/activeTabProduct';
import { ProductImage } from './components/ProductImage';

export function Layout({ children }) {
  const { activeTabProduct } = useContext(ActiveTabProductContext);
  const [isActiveTabProductPage] = useRoute('/');
  const [isCollectionListPage] = useRoute('/collections');
  const [isYourTrovePage] = useRoute('/your-trove');
  const shouldDisplayActiveTabProduct =
    !isActiveTabProductPage || !isCollectionListPage || !isYourTrovePage;

  return (
    <>
      <Header />
      <main
        className="mt-24"
        style={{ paddingBottom: shouldDisplayActiveTabProduct ? '0px' : '97px' }}
      >
        {children}
      </main>
      {shouldDisplayActiveTabProduct ? null : (
        <Link href="/">
          <div className="space-between p-4 clickable gap-2 fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-[#e4defc] z-[8]">
            <div className="flow h-16 gap-2 overflow-hidden">
              <ProductImage
                url={activeTabProduct?.imageUrls ? activeTabProduct.imageUrls[0] : null}
                height="64px"
                width="64px"
              />
              <h3 className="text-ellipsis whitespace-nowrap overflow-hidden">
                {activeTabProduct?.name}
              </h3>
            </div>
            <h4 className="max-w-[33%]">{`$${Number(activeTabProduct?.price).toFixed(
              2
            )}`}</h4>
          </div>
        </Link>
      )}
    </>
  );
}
