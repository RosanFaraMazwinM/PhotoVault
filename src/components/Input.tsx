import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  placeholder = '',
  secureTextEntry = false,
}: Props) {
  const { isDark } = useApp();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          isDark && styles.darkText,
        ]}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#9ca3af"
        style={[
          styles.input,
          isDark && styles.darkInput,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: 15,
  },

  darkInput: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    color: '#ffffff',
  },

  darkText: {
    color: '#ffffff',
  },
});