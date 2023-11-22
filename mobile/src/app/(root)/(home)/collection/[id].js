import { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import ProductListItem from '../../../../components/ProductListItem';
import { CollectionProductsContext } from '../../../../context/collections';
import { ActiveCollectionContext } from '../../../../context/activeCollection';
import CollectionTabs from '../../../../components/CollectionTabs';
import CollectionModalActions from '../../../../components/CollectionModalActions';
import CollectionModalAdd from '../../../../components/CollectionModalAdd';
import CollectionModalEdit from '../../../../components/CollectionModalEdit';
import { Paragraph } from '../../../../components/Text';

export default function Collection() {
  const { id } = useLocalSearchParams();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { products, collections, getProductsAndCollections } = useContext(
    CollectionProductsContext
  );
  const { width, height } = useWindowDimensions();
  const [collectionProducts, setCollectionProducts] = useState(products);
  const currentCollection = collections.find(
    (collection) => collection.id === id
  );

  async function refresh() {
    setIsRefreshing(true);
    await getProductsAndCollections();
    setIsRefreshing(false);
  }

  useEffect(() => {
    if (id === 0) {
      setCollectionProducts(products);
    } else {
      setCollectionProducts(currentCollection?.products);
    }
  }, [products]);

  return (
    <View style={styles.container}>
      <CollectionTabs />
      <CollectionModalActions collection={currentCollection} />
      <CollectionModalAdd />
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
            <Paragraph>No products in collection.</Paragraph>
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
