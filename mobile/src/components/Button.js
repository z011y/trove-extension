import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Button({ onPress, title, icon, variant, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        borderRadius: 12,
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        overflow: 'hidden',
        backgroundColor: '#f3f3f3',
        ...style,
      }}
    >
      {variant === 'primary' ? (
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
      ) : null}
      <Text
        style={{
          fontFamily: 'Epilogue_500Medium',
          letterSpacing: -0.5,
        }}
      >
        {title}
      </Text>
      {icon}
    </Pressable>
  );
}
