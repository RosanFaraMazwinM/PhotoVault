import React from 'react';

import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function ImageDetailsScreen({ route }: any) {
  const { image } = route.params;
  const { isDark } = useApp();

  const imageUrl =
    `https://picsum.photos/id/${image.id}/1200/800`;

  const downloadImage = async () => {
    // WEB
    if (Platform.OS === 'web') {
      window.open(imageUrl, '_blank');
      return;
    }

    // NATIVE ONLY
    try {
      const MediaLibrary =
        await import('expo-media-library');

      const FileSystem =
        await import('expo-file-system');

      const permission =
        await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow PhotoVault to access your gallery.'
        );
        return;
      }

      const file =
        await FileSystem.File.downloadFileAsync(
          imageUrl,
          FileSystem.Paths.cache
        );

      await MediaLibrary.saveToLibraryAsync(
        file.uri
      );

      Alert.alert(
        'Success',
        'Image saved to your device gallery!'
      );
    } catch (error) {
      console.log('Gallery save error:', error);

      Alert.alert(
        'Error',
        'Unable to save the image to your gallery.'
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDark && styles.darkContainer,
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text
          style={[
            styles.author,
            isDark && styles.darkText,
          ]}
        >
          {image.author}
        </Text>

        <Text style={styles.id}>
          Image ID: {image.id}
        </Text>

        <Pressable
          onPress={downloadImage}
          style={styles.downloadButton}
        >
          <Text style={styles.downloadText}>
            {Platform.OS === 'web'
              ? 'Download Image'
              : 'Save to Gallery'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  darkContainer: {
    backgroundColor: '#111827',
  },

  image: {
    width: '100%',
    height: 400,
  },

  info: {
    padding: 20,
  },

  author: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  darkText: {
    color: '#ffffff',
  },

  id: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 20,
  },

  downloadButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  downloadText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});