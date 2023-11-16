import { Text, View, TextInput, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, Link } from 'expo-router';
import { X, MagnifyingGlass, Plus } from 'phosphor-react-native';

export default function SearchHeader({ query, setQuery, searchProducts }) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 48,
        height: 96,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 16,
          paddingRight: 16,
          gap: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            height: 36,
            width: '100%',
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#F3F3F3',
          }}
        >
          <MagnifyingGlass size="20" weight="bold" color="#8E8BA3" />
          <TextInput
            style={{
              height: 36,
              width: '100%',
              color: '#20134b',
              fontFamily: 'Epilogue_500Medium',
              fontSize: 16,
              letterSpacing: -0.5,
            }}
            autoFocus={true}
            value={query}
            onChangeText={(input) => setQuery(input)}
            placeholder="Search products"
            placeholderTextColor="#8E8BA3"
            autoCapitalize="none"
            autoComplete="off"
            onSubmitEditing={searchProducts}
            returnKeyType="search"
          />
        </View>
        <Link href="../">
          <Text
            style={{
              fontFamily: 'Epilogue_500Medium',
              fontSize: 16,
              letterSpacing: -1,
            }}
          >
            Cancel
          </Text>
        </Link>
      </View>
    </View>
  );
}
