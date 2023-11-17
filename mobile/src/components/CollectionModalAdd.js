import { useState } from 'react';
import { View } from 'react-native';
import Input from './Input';
import { Heading } from './Text';

export default function CollectionModalAdd() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Heading level={2}>New Collection</Heading>
      <Input
        placeholder="Collection Name"
        value={name}
        onChangeText={(input) => setName(input)}
      />
      <Input
        placeholder="Collection Description"
        value={description}
        onChangeText={(input) => setDescription(input)}
        multiline={true}
      />
    </View>
  );
}
