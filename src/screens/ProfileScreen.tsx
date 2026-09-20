import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { useApp } from '../context/AppContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProfileScreen() {
  const {
    user,
    updateProfile,
    logout,
    isDark,
    toggleTheme,
  } = useApp();

  const [fullName, setFullName] = useState(
    user?.fullName || ''
  );

  const [email] = useState(
    user?.email || ''
  );

  const [gender, setGender] = useState<
    'Male' | 'Female' | 'Other'
  >(user?.gender || 'Other');

  const [mobile, setMobile] = useState(
    user?.mobile || ''
  );

  const [address, setAddress] = useState(
    user?.address || ''
  );

  const [city, setCity] = useState(
    user?.city || ''
  );

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert(
        'Error',
        'Full name is required'
      );
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert(
        'Error',
        'Mobile number must contain exactly 10 digits'
      );
      return;
    }

    if (!city) {
      Alert.alert(
        'Error',
        'Please select your city'
      );
      return;
    }

    if (!user) {
      return;
    }

    try {
      await updateProfile({
        ...user,
        fullName: fullName.trim(),
        email,
        gender,
        mobile,
        address,
        city,
      });

      Alert.alert(
        'Success',
        'Profile updated successfully!'
      );
    } catch (error) {
      console.log(
        'Profile update error:',
        error
      );

      Alert.alert(
        'Error',
        'Unable to update profile.'
      );
    }
  };

  const handleLogout = async () => {
    console.log('Logout clicked');

    try {
      await logout();
      console.log('Logout successful');
    } catch (error) {
      console.log(
        'Logout error:',
        error
      );

      Alert.alert(
        'Error',
        'Unable to logout'
      );
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        isDark && styles.darkContainer,
      ]}
      contentContainerStyle={styles.content}
    >

      {/* PROFILE HEADER */}

      <View style={styles.header}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {fullName
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text
          style={[
            styles.heading,
            isDark && styles.darkText,
          ]}
        >
          My Profile
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

      </View>


      {/* PROFILE FORM */}

      <View style={styles.form}>

        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />


        <Input
          label="Email"
          value={email}
          onChangeText={() => {}}
        />


        {/* GENDER */}

        <Text
          style={[
            styles.label,
            isDark && styles.darkText,
          ]}
        >
          Gender
        </Text>

        <View style={styles.genderContainer}>

          {['Male', 'Female', 'Other'].map(
            item => (
              <Pressable
                key={item}
                style={styles.genderOption}
                onPress={() =>
                  setGender(
                    item as
                      | 'Male'
                      | 'Female'
                      | 'Other'
                  )
                }
              >

                <View
                  style={[
                    styles.radioOuter,
                    isDark &&
                      styles.darkRadioOuter,
                  ]}
                >
                  {gender === item && (
                    <View style={styles.radioInner} />
                  )}
                </View>

                <Text
                  style={[
                    styles.genderText,
                    isDark &&
                      styles.darkText,
                  ]}
                >
                  {item}
                </Text>

              </Pressable>
            )
          )}

        </View>


        {/* MOBILE */}

        <Input
          label="Mobile"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />


        {/* ADDRESS */}

        <Input
          label="Address"
          value={address}
          onChangeText={setAddress}
        />


        {/* CITY DROPDOWN */}

        <Text
          style={[
            styles.label,
            isDark && styles.darkText,
          ]}
        >
          City
        </Text>

        <View
          style={[
            styles.pickerContainer,
            isDark && styles.darkPickerContainer,
          ]}
        >

          <Picker
            selectedValue={city}
            onValueChange={value =>
              setCity(value)
            }
            style={[
              styles.picker,
              isDark && styles.darkPicker,
            ]}
          >

            <Picker.Item
              label="Select your city"
              value=""
            />

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
              label="Tiruchirappalli"
              value="Tiruchirappalli"
            />

            <Picker.Item
              label="Tirunelveli"
              value="Tirunelveli"
            />

            <Picker.Item
              label="Thoothukudi"
              value="Thoothukudi"
            />

            <Picker.Item
              label="Bengaluru"
              value="Bengaluru"
            />

            <Picker.Item
              label="Hyderabad"
              value="Hyderabad"
            />

            <Picker.Item
              label="Mumbai"
              value="Mumbai"
            />

            <Picker.Item
              label="Delhi"
              value="Delhi"
            />

          </Picker>

        </View>


        {/* SAVE */}

        <Button
          title="Save Changes"
          onPress={handleSave}
        />

      </View>


      {/* DARK MODE */}

      <View
        style={[
          styles.themeBox,
          isDark && styles.darkBox,
        ]}
      >

        <View>

          <Text
            style={[
              styles.themeTitle,
              isDark && styles.darkText,
            ]}
          >
            Dark Mode
          </Text>

          <Text style={styles.themeSubtitle}>
            Switch between light and dark theme
          </Text>

        </View>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
        />

      </View>


      {/* LOGOUT */}

      <Button
        title="Logout"
        onPress={handleLogout}
      />

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  darkContainer: {
    backgroundColor: '#111827',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: '#6b7280',
  },

  form: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    marginTop: 8,
  },

  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  darkRadioOuter: {
    borderColor: '#a78bfa',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C5CE7',
  },

  genderText: {
    fontSize: 14,
    color: '#111827',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },

  darkPickerContainer: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },

  picker: {
    height: 52,
    color: '#111827',
  },

  darkPicker: {
    color: '#ffffff',
  },

  themeBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  darkBox: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },

  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  themeSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },

  darkText: {
    color: '#ffffff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});