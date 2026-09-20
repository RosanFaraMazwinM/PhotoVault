import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import Input from '../components/Input';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { Gender } from '../types';

export default function RegisterScreen({
  navigation,
}: any) {
  const { register } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] =
    useState<Gender>('Male');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Chennai');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('CREATE ACCOUNT BUTTON CLICKED');
    if (
      !fullName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !address.trim() ||
      !city ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        'Required',
        'Please fill in all fields.'
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert(
        'Invalid Mobile',
        'Mobile number must contain exactly 10 digits.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Invalid Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Passwords do not match.'
      );
      return;
    }

    setLoading(true);

    const result = await register({
      fullName: fullName.trim(),
      email: email.trim(),
      gender,
      mobile,
      address: address.trim(),
      city,
      password,
    });

    setLoading(false);

    if (!result.success) {
      Alert.alert(
        'Registration Failed',
        result.message
      );
      return;
    }

    Alert.alert(
      'Success',
      'Account created successfully!',
      [
        {
          text: 'Login',
          onPress: () =>
            navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Join PhotoVault today
      </Text>

      <Input
        label="Full Name"
        value={fullName}
        placeholder="Enter your full name"
        onChangeText={setFullName}
      />

      <Input
        label="Email"
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Gender</Text>

      <View style={styles.genderRow}>
        {(['Male', 'Female', 'Other'] as Gender[]).map(
          item => (
            <Pressable
              key={item}
              onPress={() => setGender(item)}
              style={styles.genderOption}
            >
              <View style={styles.radio}>
                {gender === item && (
                  <View style={styles.radioSelected} />
                )}
              </View>

              <Text style={styles.genderText}>
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Input
        label="Mobile"
        value={mobile}
        placeholder="10 digit mobile number"
        keyboardType="phone-pad"
        onChangeText={text =>
          setMobile(
            text.replace(/\D/g, '').slice(0, 10)
          )
        }
      />

      <Input
        label="Address"
        value={address}
        placeholder="Enter your address"
        onChangeText={setAddress}
      />

      <Text style={styles.label}>City</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={city}
          onValueChange={value =>
            setCity(value)
          }
        >
          <Picker.Item
            label="Chennai"
            value="Chennai"
          />
          <Picker.Item
            label="Coimbatore"
            value="Coimbatore"
          />
          <Picker.Item
            label="Madurai"
            value="Madurai"
          />
          <Picker.Item
            label="Ramanathapuram"
            value="Ramanathapuram"
          />
          <Picker.Item
            label="Trichy"
            value="Trichy"
          />
          <Picker.Item
            label="Other"
            value="Other"
          />
        </Picker>
      </View>

      <Input
        label="Password"
        value={password}
        placeholder="Minimum 6 characters"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Input
        label="Confirm Password"
        value={confirmPassword}
        placeholder="Re-enter your password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Create Account"
        onPress={handleRegister}
        loading={loading}
      />

      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={styles.loginLinkContainer}
      >
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink}>
            Login
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

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#18181B',
    marginBottom: 6,
  },

  subtitle: {
    color: '#71717A',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  genderRow: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 18,
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C5CE7',
  },

  genderText: {
    color: '#333',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 14,
    overflow: 'hidden',
  },

  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#71717A',
  },

  loginLink: {
    color: '#6C5CE7',
    fontWeight: '700',
  },
});