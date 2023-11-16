import { useContext, useRef, useState } from 'react';
import {
  View,
  Pressable,
  FlatList,
  Text,
  useWindowDimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { CollectionProductsContext } from '../context/collections';
import { LinearGradient } from 'expo-linear-gradient';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { SquaresFour, Plus } from 'phosphor-react-native';
import { ActiveCollectionContext } from '../context/activeCollection';
import * as Haptics from 'expo-haptics';

export default function CollectionTabs() {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  const [transformValue, setTransformValue] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItemPosition, setActiveItemPosition] = useState(0);
  const [offsets, setOffsets] = useState([]);
  const listRef = useRef(null);
  const { collections } = useContext(CollectionProductsContext);
  const { setActiveCollection } = useContext(ActiveCollectionContext);
  const { width } = useWindowDimensions();
  const tabPositions = [];

  if (!collections) {
    return null;
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        width: width,
        borderTopWidth: 1,
        borderTopColor: '#E3DFFA',
        backgroundColor: '#fff',
        zIndex: 1000,
      }}
    >
      <Link href="/(home)/collections">
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: 48,
          }}
        >
          <SquaresFour size="24" weight="bold" color="#20134B" />
        </View>
      </Link>
      <LinearGradient
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 48,
          right: 48,
          width: width - 96,
          height: 64,
          zIndex: 100,
        }}
        colors={['#fff', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', '#fff']}
        start={{
          x: 0,
          y: 0.5,
        }}
        end={{
          x: 1,
          y: 0.5,
        }}
        locations={[0, 0.1, 0.9, 1]}
      />
      <FlatList
        ref={listRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={({ item, index }) => (
          <Pressable
            onPress={() => {
              setActiveCollectionIndex(index);
              setActiveCollection(index);
              listRef.current?.scrollToOffset({
                offset: tabPositions[index] - 24,
                animated: true,
              });
              Haptics.selectionAsync();
            }}
            onLayout={({ nativeEvent }) => {
              tabPositions[index] = nativeEvent.layout.x;
            }}
            style={{
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Epilogue_500Medium',
                color: index === activeCollectionIndex ? '#1D1648' : '#8E8BA3',
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
        style={{
          width: '100%',
          height: 64,
        }}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          gap: 32,
        }}
        // onScroll={({ nativeEvent }) => {
        //   setScrollPosition(nativeEvent.contentOffset.x);
        // }}
        // onScrollEndDrag={() => {
        //   listRef.current?.scrollToOffset({
        //     offset: activeItemPosition,
        //     animated: true,
        //   });
        // }}
        snapToAlignment="center"
        // snapToOffsets={offsets}
        data={[{ id: 0, name: 'All' }, ...collections]}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 48,
        }}
      >
        <Plus size="24" weight="bold" color="#20134B" />
      </Pressable>
    </View>
  );
}
