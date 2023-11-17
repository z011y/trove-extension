import { useContext } from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, Link } from 'expo-router';
import {
  CaretDown,
  MagnifyingGlass,
  PencilSimple,
  Plus,
} from 'phosphor-react-native';
import { ActiveCollectionContext } from '../context/activeCollection';
import { CollectionProductsContext } from '../context/collections';
import { CollectionModalActionsContext } from './CollectionModalActions';
import * as Haptics from 'expo-haptics';

export default function Header() {
  const { activeCollection } = useContext(ActiveCollectionContext);
  const { collections } = useContext(CollectionProductsContext);
  const { setIsCollectionModalActionsVisible } = useContext(
    CollectionModalActionsContext
  );
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View
      style={{
        position: 'relative',
        paddingTop: 64,
        height: 96,
        width: width,
        backgroundColor: '#fff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#E3DFFA',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* <Link
          href={{
            pathname: `/(home)/collection/${collections[activeCollection - 1]}`,
            params: { id: collections[activeCollection - 1]?.id },
          }}
        > */}
        {collections[activeCollection - 1] ? (
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setIsCollectionModalVisible(true);
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Epilogue_700Bold',
                  fontSize: 20,
                  color: '#20134b',
                  letterSpacing: -1,
                }}
              >
                {collections[activeCollection - 1]?.name}
              </Text>
              <CaretDown
                size="18"
                weight="bold"
                style={{
                  color: '#20134b',
                }}
              />
            </View>
          </Pressable>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              paddingBottom: 8,
            }}
          >
            <Image
              style={{ height: 22, width: 15 }}
              source={require('../../assets/trove.png')}
            />
            <Text
              style={{
                fontFamily: 'Epilogue_500Medium',
                fontSize: 24,
                color: '#20134b',
                letterSpacing: -2,
                marginTop: 2,
              }}
            >
              Trove
            </Text>
          </View>
        )}
        {/* </Link> */}
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Link href="/(home)/search">
            <MagnifyingGlass
              size="24"
              weight="bold"
              style={{
                color: '#20134b',
              }}
            />
          </Link>
        </View>
      </View>
    </View>
  );
}
