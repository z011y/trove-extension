import { Text, View, Image, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { DotsThree } from 'phosphor-react-native';

export default function CollectionListItem({ collection }) {
  const { width, height } = useWindowDimensions();
  console.log(collection.products);
  const imageWidth = (width / 2 - 32 - 32 - 8) / 2;

  return (
    <View
      style={{
        padding: 16,
        width: width / 2,
        display: 'flex',
        gap: 8,
      }}
    >
      <View
        style={{
          flexShrink: 1,
          backgroundColor: 'rgba(219,219,219,0.5)',
          width: '100%',
          borderRadius: 24,
          padding: 16,
          gap: 16,
        }}
      >
        {/* <View
          style={{
            zIndex: 10,
            borderRadius: '100%',
            overflow: 'hidden',
            position: 'absolute',
            top: 8,
            right: 8,
            width: 24,
            height: 24,
          }}
        >
          <BlurView
            style={{
              zIndex: 10,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            intensity={80}
          >
            <DotsThree size="20" weight="bold" />
          </BlurView>
        </View> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <Image
            style={{
              borderRadius: 8,
            }}
            height={imageWidth}
            width={imageWidth}
            source={{ uri: collection.products[0]?.image_urls[0] }}
          />
          <Image
            style={{
              borderRadius: 8,
            }}
            height={imageWidth}
            width={imageWidth}
            source={{ uri: collection.products[1]?.image_urls[0] }}
          />
          <Image
            style={{
              borderRadius: 8,
            }}
            height={imageWidth}
            width={imageWidth}
            source={{ uri: collection.products[2]?.image_urls[0] }}
          />
          <Image
            style={{
              borderRadius: 8,
            }}
            height={imageWidth}
            width={imageWidth}
            source={{ uri: collection.products[3]?.image_urls[0] }}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Epilogue_500Medium',
            flexShrink: 1,
            letterSpacing: -0.5,
          }}
          numberOfLines={2}
        >
          {collection?.name}
        </Text>
      </View>
    </View>
  );
}
