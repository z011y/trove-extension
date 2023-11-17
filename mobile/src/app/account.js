import { useContext } from 'react';
import { Button, View, StyleSheet, useWindowDimensions } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import { CollectionProductsContext } from '../context/collections';
import { SessionContext } from './_layout';

export default function Account() {
  const { setSession } = useContext(SessionContext);
  const { width } = useWindowDimensions();

  async function signOut() {
    await fetch('http://10.0.0.139:3001/sign-out');
    setSession(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
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
