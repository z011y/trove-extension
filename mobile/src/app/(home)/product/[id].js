import { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { X, Link as LinkIcon, ArrowSquareOut } from 'phosphor-react-native';
import { CollectionProductsContext } from '../../../context/collections';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

export default function ProductDetails() {
  const { products } = useContext(CollectionProductsContext);
  const { width, height } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const currentProduct = products.find((product) => product.id === Number(id));
  const imageSize = width - 40;

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          zIndex: 10,
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          paddingTop: 4,
          height: 56,
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 24,
          paddingRight: 24,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Link href="../">
          <X size="24" weight="bold" />
        </Link>
      </View>
      <FlatList
        style={{
          width: width,
        }}
        horizontal={true}
        snapToInterval={imageSize}
        decelerationRate="fast"
        data={currentProduct?.image_urls}
        renderItem={({ item }) => (
          <Image width={imageSize} height={imageSize} source={{ uri: item }} />
        )}
        keyExtractor={(item, index) => item + index}
      />
      <View
        style={{
          padding: 16,
          gap: 8,
          height: height - imageSize,
        }}
      >
        <Text
          style={{
            fontFamily: 'Epilogue_700Bold',
            fontSize: 20,
            color: '#20134b',
            letterSpacing: -1,
            lineHeight: 24,
          }}
        >
          {currentProduct?.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Epilogue_400Regular',
            color: '#8E8BA3',
            letterSpacing: -1,
          }}
        >
          {currentProduct?.brand}
        </Text>
        <Text
          style={{
            fontFamily: 'Epilogue_500Medium',
            fontSize: 24,
            color: '#1D1648',
          }}
        >
          {`$${Number(currentProduct?.price).toFixed(2)}`}
        </Text>
        <Text
          style={{
            fontFamily: 'Epilogue_400Regular',
            fontSize: 16,
            color: '#8E8BA3',
            letterSpacing: -0.5,
            lineHeight: 24,
          }}
        >
          {currentProduct?.description}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 56,
          left: 0,
          width: width,
          height: 112,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Pressable
          onPress={() => {
            Clipboard.setUrlAsync(currentProduct?.url);
            Haptics.selectionAsync();
          }}
          style={{
            width: 48,
            backgroundColor: '#F3F3F3',
            borderRadius: 12,
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LinkIcon size={18} weight="bold" />
        </Pressable>
        <Pressable
          onPress={() => {
            WebBrowser.openBrowserAsync(currentProduct?.url);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          style={{
            width: width - 20 - 48 - 16 - 8,
            borderRadius: 12,
            height: 48,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            style={{ ...StyleSheet.absoluteFill }}
            colors={['#F0C8C9', '#D5D0F5', '#BED9F5']}
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
          />
          <Text
            style={{
              fontFamily: 'Epilogue_500Medium',
              letterSpacing: -0.5,
              height: 12,
            }}
          >
            Visit Site
          </Text>
          <ArrowSquareOut size={18} weight="bold" />
        </Pressable>
      </View>
    </View>
  );
}
