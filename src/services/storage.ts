import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USERS_KEY = '@photovault_users';
const SESSION_KEY = '@photovault_session';
const FAVORITES_KEY = '@photovault_favorites';
const THEME_KEY = '@photovault_theme';

export const storage = {
  async getUsers(): Promise<User[]> {
    const data = await AsyncStorage.getItem(USERS_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  },

  async saveUsers(users: User[]) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  async getSession(): Promise<User | null> {
    const data = await AsyncStorage.getItem(SESSION_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  },

  async saveSession(user: User) {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  async clearSession() {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  async getFavorites(): Promise<string[]> {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  },

  async saveFavorites(ids: string[]) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  },

  async getTheme(): Promise<'light' | 'dark'> {
    const theme = await AsyncStorage.getItem(THEME_KEY);

    return theme === 'dark' ? 'dark' : 'light';
  },

  async saveTheme(theme: 'light' | 'dark') {
    await AsyncStorage.setItem(THEME_KEY, theme);
  },
};