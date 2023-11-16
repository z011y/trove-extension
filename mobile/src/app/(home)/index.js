import { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import { Link } from 'expo-router';
import ProductListItem from '../../components/ProductListItem';
import { CollectionProductsContext } from '../../context/collections';
import { ActiveCollectionContext } from '../../context/activeCollection';
import CollectionTabs from '../../components/CollectionTabs';
import CollectionModal from '../../components/CollectionModal';

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { products, collections, getProductsAndCollections } = useContext(
    CollectionProductsContext
  );
  const { activeCollection } = useContext(ActiveCollectionContext);
  const { width, height } = useWindowDimensions();
  const [collectionProducts, setCollectionProducts] = useState(products);

  async function getProductsForCollection() {
    const res = await fetch(
      `http://10.0.0.139:3001/get-products-for-collection/${
        collections[activeCollection - 1].id
      }`
    );
    const data = await res.json();
    setCollectionProducts(data);
  }

  async function refresh() {
    setIsRefreshing(true);
    await getProductsAndCollections();
    setIsRefreshing(false);
  }

  useEffect(() => {
    if (activeCollection === 0) {
      setCollectionProducts(products);
    } else {
      setCollectionProducts(collections[activeCollection - 1].products);
    }
  }, [products, activeCollection]);

  return (
    <View style={styles.container}>
      <CollectionTabs />
      <CollectionModal collection={collections[activeCollection - 1]} />
      <FlatList
        style={{
          padding: 8,
          marginBottom: 64,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={() => (
          <View
            style={{
              width: width,
              height: height - 96 - 64 - 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Epilogue_500Medium',
              }}
            >
              No products in collection.
            </Text>
          </View>
        )}
        data={collectionProducts}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/(home)/product/[id]',
              params: { id: item.id },
            }}
          >
            <ProductListItem product={item} />
          </Link>
        )}
        keyExtractor={(item, i) => item.id + i}
        refreshing={isRefreshing}
        onRefresh={refresh}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
