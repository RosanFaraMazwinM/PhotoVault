import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { FilterType } from '../types';

interface Props {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
}

export default function FilterBar({
  selected,
  onSelect,
}: Props) {
  const filters = [
    {
      label: 'All Images',
      value: 'ALL' as FilterType,
    },
    {
      label: 'Authors A-M',
      value: 'A-M' as FilterType,
    },
    {
      label: 'Authors N-Z',
      value: 'N-Z' as FilterType,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {filters.map(filter => (
        <Pressable
          key={filter.value}
          onPress={() => onSelect(filter.value)}
          style={[
            styles.button,
            selected === filter.value &&
              styles.active,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === filter.value &&
                styles.activeText,
            ]}
          >
            {filter.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    marginRight: 8,
  },

  active: {
    backgroundColor: '#6C5CE7',
  },

  text: {
    color: '#333',
    fontWeight: '600',
  },

  activeText: {
    color: '#FFF',
  },
});