import React, { useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';

export default function LoginScreen({
  navigation,
}: any) {
  const { login, isDark } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert(
        'Required',
        'Please enter your email address.'
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Required',
        'Please enter your password.'
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    try {
      setLoading(true);

      const result = await login(
        email.trim(),
        password
      );

      setLoading(false);

      if (!result.success) {
        Alert.alert(
          'Login Failed',
          'Incorrect email or password.'
        );
        return;
      }

      // AppNavigator automatically opens PhotoVault
      // because the user session is now available.

    } catch (error) {
      setLoading(false);

      console.log('Login error:', error);

      Alert.alert(
        'Login Error',
        'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        isDark && styles.darkContainer,
      ]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={[
          styles.title,
          isDark && styles.darkText,
        ]}
      >
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Login to your PhotoVault account
      </Text>

      <Input
        label="Email"
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
      />

      <Pressable
        onPress={() => navigation.navigate('Register')}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink}>
            Create Account
          </Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  darkContainer: {
    backgroundColor: '#111827',
  },

  content: {
    padding: 22,
    paddingTop: 80,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 6,
  },

  darkText: {
    color: '#FFFFFF',
  },

  subtitle: {
    color: '#71717A',
    marginBottom: 30,
    fontSize: 15,
  },

  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  registerText: {
    color: '#71717A',
  },

  registerLink: {
    color: '#6C5CE7',
    fontWeight: '700',
  },
});