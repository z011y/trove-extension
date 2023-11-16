import { useContext } from 'react';
import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import { CollectionProductsContext } from '../context/collections';

export default function Account() {
  const { products } = useContext(CollectionProductsContext);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: width,
          paddingTop: 144,
        }}
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id}
        refreshing={products ? true : false}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: '#e4defc', height: 1 }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Epilogue_400Regular',
  },
});
