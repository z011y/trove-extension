import { Text } from 'react-native';

export function Paragraph({ children, style, weight = 'medium' }) {
  const weights = {
    regular: 'Epilogue_400Regular',
    medium: 'Epilogue_500Medium',
    bold: 'Epilogue_700Bold',
  };

  return (
    <Text
      style={{
        fontFamily: weights[weight],
        fontSize: 16,
        color: '#8E8BA3',
        letterSpacing: -0.5,
        ...style,
      }}
    >
      {children}
    </Text>
  );
}

export function Heading({ children, style, level }) {
  const levels = {
    1: 24,
    2: 20,
    3: 18,
    4: 16,
    5: 14,
    6: 12,
  };

  return (
    <Text
      style={{
        fontFamily: 'Epilogue_700Bold',
        fontSize: levels[level],
        color: '#20134b',
        letterSpacing: -1,
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
