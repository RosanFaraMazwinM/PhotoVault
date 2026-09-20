import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ImageItem } from '../types';

interface Props {
  item: ImageItem;
  favorite: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

export default function ImageCard({
  item,
  favorite,
  onPress,
  onFavorite,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{
          uri: `https://picsum.photos/id/${item.id}/1200/800`,
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <View style={styles.details}>
          <Text
            numberOfLines={1}
            style={styles.author}
          >
            {item.author}
          </Text>

          <Text style={styles.id}>
            ID: {item.id}
          </Text>
        </View>

        <Pressable
          onPress={onFavorite}
          style={styles.favorite}
        >
          <Text style={styles.heart}>
            {favorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },

  image: {
  width: '100%',
  aspectRatio: 1.5,
  backgroundColor: '#EEE',
},

  info: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  details: {
    flex: 1,
  },

  author: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  id: {
    color: '#777',
    marginTop: 4,
  },

  favorite: {
    padding: 5,
  },

  heart: {
    fontSize: 28,
    color: '#E63970',
  },
});