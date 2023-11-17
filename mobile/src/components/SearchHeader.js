import { Text, View, TextInput, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, Link } from 'expo-router';
import { X, MagnifyingGlass, Plus } from 'phosphor-react-native';
import Input from './Input';

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
        <Input
          icon={<MagnifyingGlass size="20" weight="bold" color="#8E8BA3" />}
          placeholder="Search products"
          value={query}
          onChangeText={(input) => setQuery(input)}
          onSubmitEditing={searchProducts}
          autoFocus={true}
          returnKeyType="search"
        />
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
