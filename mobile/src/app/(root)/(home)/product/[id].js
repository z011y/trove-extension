import { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { X, Link as LinkIcon, ArrowSquareOut } from 'phosphor-react-native';
import { CollectionProductsContext } from '../../../../context/collections';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Heading, Paragraph } from '../../../../components/Text';
import Button from '../../../../components/Button';

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
      <ScrollView
        style={{
          marginBottom: 96,
        }}
      >
        <FlatList
          style={{
            width: width,
          }}
          horizontal={true}
          snapToInterval={imageSize}
          decelerationRate="fast"
          data={currentProduct?.image_urls}
          renderItem={({ item }) => (
            <Image
              width={imageSize}
              height={imageSize}
              source={{ uri: item }}
            />
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
          <Heading level={2} style={{ lineHeight: 24 }}>
            {currentProduct?.name}
          </Heading>
          <Text
            style={{
              fontFamily: 'Epilogue_400Regular',
              color: '#8E8BA3',
              letterSpacing: -1,
            }}
          >
            {currentProduct?.brand}
          </Text>
          <Heading
            level={1}
            style={{
              fontFamily: 'Epilogue_500Medium',
            }}
          >
            {`$${Number(currentProduct?.price).toFixed(2)}`}
          </Heading>
          <Paragraph style={{ lineHeight: 24 }}>
            {currentProduct?.description}
          </Paragraph>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: width,
          height: 96,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 16,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: '#fff',
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
        <Button
          title="Visit Site"
          icon={<ArrowSquareOut size={18} weight="bold" />}
          onPress={() => {
            WebBrowser.openBrowserAsync(currentProduct?.url);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
          style={{
            width: width - 20 - 48 - 16 - 8,
          }}
        />
      </View>
    </View>
  );
}
