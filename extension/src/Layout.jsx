import { useContext } from 'react';
import { Link, useRoute } from 'wouter';
import { Header } from './components/Header';
import { CurrentItemContext } from './App';
import { ProductImage } from './components/ProductImage';

export function Layout({ children }) {
  const { currentItem } = useContext(CurrentItemContext);
  const [isActiveItemPage] = useRoute('/');

  return (
    <>
      <Header />
      <main
        style={{
          marginTop: 'calc(3rem + 48px)',
          paddingBottom: `${isActiveItemPage ? '0px' : '97px'}`,
        }}
      >
        {children}
      </main>
      {isActiveItemPage ? null : (
        <Link href="/">
          <div
            className="space-between p clickable"
            style={{
              gap: '8px',
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(245, 242, 255, 0.8)',
              backdropFilter: 'blur(1rem)',
              borderTop: '1px solid #e4defc',
              zIndex: 8,
            }}
          >
            <div
              className="flow"
              style={{ height: '64px', gap: '8px', overflow: 'hidden' }}
            >
              <ProductImage
                url={currentItem?.imageUrls ? currentItem.imageUrls[0] : null}
                height="64px"
                width="64px"
              />
              <h3
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {currentItem.name}
              </h3>
            </div>
            <h4 style={{ maxWidth: '33%' }}>{`$${Number(
              currentItem.price
            ).toFixed(2)}`}</h4>
          </div>
        </Link>
      )}
    </>
  );
}
