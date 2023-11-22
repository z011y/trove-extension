import { useContext, useState } from 'react';
import {
  FlatList,
  View,
  Button,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import { CollectionProductsContext } from '../../context/collections';
import { WebView } from 'react-native-webview';

export default function Shop() {
  const { products } = useContext(CollectionProductsContext);
  const { width } = useWindowDimensions();

  return (
    <WebView style={styles.container} source={{ uri: 'https://google.com' }} />
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
