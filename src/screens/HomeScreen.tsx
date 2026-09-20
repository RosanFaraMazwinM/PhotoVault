import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { fetchImages } from '../services/api';
import { FilterType, ImageItem } from '../types';

import ImageCard from '../components/ImageCard';
import FilterBar from '../components/FilterBar';

import { useApp } from '../context/AppContext';

export default function HomeScreen({
  navigation,
}: any) {
  const {
    isFavorite,
    toggleFavorite,
  } = useApp();

  const [images, setImages] =
    useState<ImageItem[]>([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState<FilterType>('ALL');

  const loadImages = async (
    pageNumber: number,
    refresh = false
  ) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const newImages =
        await fetchImages(
          pageNumber,
          20
        );

      if (
        refresh ||
        pageNumber === 1
      ) {
        setImages(newImages);
      } else {
        setImages(previous => [
          ...previous,
          ...newImages,
        ]);
      }

      setPage(pageNumber);
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to load images. Please try again.'
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadImages(1);
  }, []);

  const handleRefresh =
    useCallback(() => {
      loadImages(1, true);
    }, []);

  const handleLoadMore = () => {
    if (
      !loadingMore &&
      !loading &&
      images.length > 0
    ) {
      loadImages(page + 1);
    }
  };

  const filteredImages =
    useMemo(() => {
      const searchText =
        search.trim().toLowerCase();

      return images.filter(item => {
        const matchesSearch =
          item.author
            .toLowerCase()
            .includes(searchText);

        const firstLetter =
          item.author
            .trim()
            .charAt(0)
            .toUpperCase();

        let matchesFilter = true;

        if (filter === 'A-M') {
          matchesFilter =
            firstLetter >= 'A' &&
            firstLetter <= 'M';
        }

        if (filter === 'N-Z') {
          matchesFilter =
            firstLetter >= 'N' &&
            firstLetter <= 'Z';
        }

        return (
          matchesSearch &&
          matchesFilter
        );
      });
    }, [images, search, filter]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#6C5CE7"
        />

        <Text style={styles.loadingText}>
          Loading images...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          PhotoVault
        </Text>

        <Text style={styles.subtitle}>
          Discover beautiful images
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          🔎
        </Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by author..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterContainer}>
        <FilterBar
          selected={filter}
          onSelect={setFilter}
        />
      </View>

      <FlatList
        data={filteredImages}
        keyExtractor={item => item.id}

        contentContainerStyle={
          styles.list
        }

        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }

        renderItem={({ item }) => (
          <ImageCard
            item={item}
            favorite={isFavorite(
              item.id
            )}
            onPress={() =>
              navigation.navigate(
                'ImageDetails',
                {
                  image: item,
                }
              )
            }
            onFavorite={() =>
              toggleFavorite(
                item.id
              )
            }
          />
        )}

        onEndReached={
          handleLoadMore
        }

        onEndReachedThreshold={0.5}

        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#6C5CE7"
              style={styles.footer}
            />
          ) : null
        }

        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No images found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or filter.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#18181B',
  },

  subtitle: {
    color: '#71717A',
    marginTop: 4,
  },

  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: '#18181B',
  },

  filterContainer: {
    paddingHorizontal: 20,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
  },

  loadingText: {
    marginTop: 10,
    color: '#71717A',
  },

  footer: {
    marginVertical: 20,
  },

  empty: {
    alignItems: 'center',
    marginTop: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  emptyText: {
    marginTop: 5,
    color: '#777',
  },
});