import { View, TextInput } from 'react-native';

export default function Input({
  icon,
  placeholder,
  onChangeText,
  value,
  onSubmitEditing,
  autoFocus = false,
  returnKeyType = 'done',
  secureTextEntry = false,
  multiline = false,
}) {
  return (
    <View
      style={{
        flexShrink: 1,
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
      {icon}
      <TextInput
        style={{
          height: 36,
          width: '100%',
          color: '#20134b',
          fontFamily: 'Epilogue_500Medium',
          fontSize: 16,
          letterSpacing: -0.5,
        }}
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8BA3"
        autoCapitalize="none"
        autoComplete="off"
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
}
