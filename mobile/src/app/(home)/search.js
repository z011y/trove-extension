import { useContext, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import {
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import { X } from 'phosphor-react-native';
import CollectionListItem from '../../components/CollectionListItem';
import { CollectionProductsContext } from '../../context/collections';
import SearchHeader from '../../components/SearchHeader';

export default function Search() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState(null);
  const { products, collections } = useContext(CollectionProductsContext);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  function searchProducts() {
    setResults(products.filter((product) => product.name.includes(query)));
  }

  return (
    <>
      <Stack.Screen
        options={{
          animation: 'fade',
          animationDuration: 200,
          header: () => (
            <SearchHeader
              query={query}
              setQuery={setQuery}
              searchProducts={searchProducts}
            />
          ),
        }}
      />
      {results ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
        >
          <FlatList
            style={{
              width: width,
              padding: 8,
            }}
            data={results}
            numColumns={2}
            renderItem={({ item }) => <ProductListItem product={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior="height"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
        ></KeyboardAvoidingView>
      )}
    </>
  );
}
