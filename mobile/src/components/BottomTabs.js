import { useContext, useRef, useState } from 'react';
import { View, Text, Animated, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { CollectionProductsContext } from '../context/collections';
import { LinearGradient } from 'expo-linear-gradient';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { ActiveCollectionContext } from '../context/activeCollection';

export default function BottomTabs() {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0);
  const [transformValue, setTransformValue] = useState(0);
  const { collections } = useContext(CollectionProductsContext);
  const { setActiveCollection } = useContext(ActiveCollectionContext);
  const { width } = useWindowDimensions();
  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart((e) => {
      if (activeCollectionIndex !== collections.length) {
        setActiveCollectionIndex(activeCollectionIndex + 1);
        setActiveCollection(activeCollectionIndex);
        transformLeft();
        setTransformValue(transformValue - width + 56);
      }
    });
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart((e) => {
      if (activeCollectionIndex > 0) {
        setActiveCollectionIndex(activeCollectionIndex - 1);
        setActiveCollection(activeCollectionIndex);
        transformRight();
        setTransformValue(transformValue + width - 56);
      }
    });
  const transformAnimation = useRef(new Animated.Value(0)).current;

  function transformLeft() {
    Animated.timing(transformAnimation, {
      toValue: transformValue - width + 56,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function transformRight() {
    Animated.timing(transformAnimation, {
      toValue: transformValue + width - 56,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  if (!collections) {
    return null;
  }

  return (
    <GestureDetector gesture={flingLeft}>
      <GestureDetector gesture={flingRight}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 88,
            borderTopWidth: 1,
            borderTopColor: '#E3DFFA',
            backgroundColor: '#fff',
          }}
        >
          <Animated.View
            style={{
              padding: 16,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              transform: [{ translateX: transformAnimation }],
            }}
          >
            {[{ id: 0, name: 'Your Trove' }, ...collections].map(
              (collection, i) => (
                <Link
                  href={
                    collection.id === 0 ? '/' : `/collection/${collection?.id}`
                  }
                >
                  {activeCollectionIndex === i ? (
                    <View
                      style={{
                        width: width - 64,
                        height: 40,
                        paddingLeft: 16,
                        paddingRight: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <LinearGradient
                        colors={['#F1C8C9', '#D6D0F5', '#BED8F5']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={{
                          borderRadius: 40,
                          borderWidth: 1,
                          borderColor: '#1D1648',
                          left: 0,
                          right: 0,
                          height: '100%',
                          position: 'absolute',
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Epilogue_400Regular',
                          color: '#1D1648',
                        }}
                      >
                        {collection.name}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 40,
                        paddingLeft: 16,
                        paddingRight: 16,
                        borderRadius: 40,
                        borderWidth: 1,
                        borderColor: '#E3DFFA',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F4F3FE',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Epilogue_400Regular',
                          color: '#1D1648',
                        }}
                      >
                        {collection.name}
                      </Text>
                    </View>
                  )}
                </Link>
              )
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureDetector>
  );
}
