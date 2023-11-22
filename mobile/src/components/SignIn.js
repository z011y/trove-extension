import { useState, useContext, createContext } from 'react';
import { View, TextInput } from 'react-native';
import { Paragraph, Heading } from './Text';
import {
  Envelope,
  Password,
  SignIn as SignInIcon,
} from 'phosphor-react-native';
import Input from './Input';
import Button from './Button';

export const SessionContext = createContext(null);

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setSession } = useContext(SessionContext);

  async function signIn() {
    const res = await fetch('http://10.0.0.139:3001/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setSession(data.session);
  }

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        padding: 24,
      }}
    >
      <Heading level={2}>Sign In</Heading>
      <Input
        icon={<Envelope size={18} weight="bold" color="#8E8BA3" />}
        value={email}
        onChangeText={(input) => setEmail(input)}
        placeholder="Your email"
      />
      <Input
        icon={<Password size={18} weight="bold" color="#8E8BA3" />}
        value={password}
        onChangeText={(input) => setPassword(input)}
        placeholder="Your password"
        secureTextEntry={true}
      />
      <Button
        title="Sign In"
        onPress={signIn}
        icon={<SignInIcon size="18" weight="bold" />}
      />
    </View>
  );
}
