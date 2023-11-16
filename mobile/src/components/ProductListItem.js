import { Text, View, Image, useWindowDimensions } from 'react-native';
import { DotsThree } from 'phosphor-react-native';
import { BlurView } from 'expo-blur';

export default function ProductListItem({ product }) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        padding: 8,
        width: width / 2 - 8,
      }}
    >
      <View
        style={{
          gap: 8,
          flexShrink: 1,
        }}
      >
        <View
          style={{
            position: 'relative',
          }}
        >
          <View
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
          </View>
          <View
            style={{
              borderRadius: 32,
              overflow: 'hidden',
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 10,
            }}
          >
            <BlurView
              intensity={80}
              tint="default"
              style={{
                alignSelf: 'flex-start',
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Epilogue_500Medium',
                  fontSize: 12,
                  color: '#1D1648',
                }}
              >{`$${Number(product?.price).toFixed(2)}`}</Text>
            </BlurView>
          </View>
          <Image
            style={{
              borderRadius: 16,
            }}
            height={width / 2 - 24}
            width={width / 2 - 24}
            source={{ uri: product?.image_urls[0] }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexShrink: 1,
            gap: 4,
          }}
        >
          <Text
            style={{
              fontFamily: 'Epilogue_500Medium',
              flexShrink: 1,
              letterSpacing: -0.5,
            }}
            numberOfLines={2}
          >
            {product?.name}
          </Text>
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontFamily: 'Epilogue_400Regular',
                color: '#8E8BA3',
              }}
            >
              {product?.brand}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
