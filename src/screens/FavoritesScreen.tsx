import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useApp } from '../context/AppContext';
import { fetchImages } from '../services/api';
import { ImageItem } from '../types';
import ImageCard from '../components/ImageCard';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useApp();

  const navigation = useNavigation<any>();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const data = await fetchImages(1, 50);

      const favoriteImages = data.filter(item =>
        favorites.includes(item.id)
      );

      setImages(favoriteImages);
    } catch (error) {
      console.log('Favorites error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) {
      return images;
    }

    return images.filter(item =>
      item.author.toLowerCase().includes(text)
    );
  }, [images, search]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>

      <TextInput
        style={styles.search}
        placeholder="Search favorites by author..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredFavorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>❤️</Text>

          <Text style={styles.emptyTitle}>
            No Favorites Yet
          </Text>

          <Text style={styles.emptyText}>
            Add some images to your favorites from the Gallery.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ImageCard
  item={item}
  favorite={true}
  onFavorite={() => toggleFavorite(item.id)}
  onPress={() => navigation.navigate('ImageDetails', { image: item })}
/>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111827',
  },

  search: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    fontSize: 15,
  },

  list: {
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },

  loadingText: {
    marginTop: 10,
    color: '#6b7280',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});