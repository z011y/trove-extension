import { useContext } from 'react';
import { Link, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import {
  FlatList,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import { X } from 'phosphor-react-native';
import { CollectionProductsContext } from '../../context/collections';
import CollectionListItem from '../../components/CollectionListItem';
import { ActiveCollectionContext } from '../../context/activeCollection';

export default function Collections() {
  const { collections } = useContext(CollectionProductsContext);
  const { setActiveCollection } = useContext(ActiveCollectionContext);
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  return (
    <BlurView
      style={{ zIndex: 1000, width: width, height: height }}
      intensity={50}
    >
      <View
        style={{
          paddingTop: 48,
          height: 96,
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 24,
          paddingRight: 24,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
          zIndex: 10,
        }}
      >
        <Link href="../">
          <X size="24" weight="bold" />
        </Link>
      </View>
      <FlatList
        style={{
          marginTop: -96,
          paddingTop: 96,
          paddingBottom: 96,
          width: width,
        }}
        numColumns={2}
        data={collections}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setActiveCollection(index + 1);
              router.push('../');
            }}
          >
            <CollectionListItem collection={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        refreshing={collections ? true : false}
      />
    </BlurView>
  );
}
