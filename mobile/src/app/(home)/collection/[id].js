import { useContext } from 'react';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, useWindowDimensions } from 'react-native';
import ProductListItem from '../../../components/ProductListItem';
import { X } from 'phosphor-react-native';
import { CollectionProductsContext } from '../../../context/collections';
import CollectionListItem from '../../../components/CollectionListItem';
import { Paragraph } from '../../../components/Text';

export default function CollectionDetails() {
  const { collections } = useContext(CollectionProductsContext);
  const { width, height } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View
      style={{
        height: height / 2,
        width: width,
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 24,
      }}
    >
      <View
        style={{
          paddingTop: 4,
          height: 56,
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 24,
          paddingRight: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: '#e4defc',
          borderBottomWidth: 1,
        }}
      >
        <Heading level={2}>{id}</Heading>
        <Link href="../">
          <X size="24" weight="bold" />
        </Link>
      </View>
    </View>
  );
}
