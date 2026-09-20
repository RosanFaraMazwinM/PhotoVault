import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { User } from '../types';
import { storage } from '../services/storage';

interface AppContextType {
  user: User | null;
  favorites: string[];
  isLoading: boolean;
  isDark: boolean;

  register: (
    newUser: User
  ) => Promise<{ success: boolean; message: string }>;

  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;

  logout: () => Promise<void>;

  updateProfile: (updatedUser: User) => Promise<void>;

  toggleFavorite: (imageId: string) => Promise<void>;

  isFavorite: (imageId: string) => boolean;

  toggleTheme: () => Promise<void>;
}

const AppContext = createContext<AppContextType>(
  {} as AppContextType
);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const session = await storage.getSession();
      const savedFavorites = await storage.getFavorites();
      const savedTheme = await storage.getTheme();

      setUser(session);
      setFavorites(savedFavorites);
      setIsDark(savedTheme === 'dark');
    } catch (error) {
      console.log('Initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (newUser: User) => {
    const users = await storage.getUsers();

    const existingUser = users.find(
      item =>
        item.email.toLowerCase() ===
        newUser.email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists.',
      };
    }

    users.push(newUser);

    await storage.saveUsers(users);

    return {
      success: true,
      message: 'Registration successful.',
    };
  };

  const login = async (
    email: string,
    password: string
  ) => {
    const users = await storage.getUsers();

    const foundUser = users.find(
      item =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'Invalid email or password.',
      };
    }

    await storage.saveSession(foundUser);

    setUser(foundUser);

    return {
      success: true,
      message: 'Login successful.',
    };
  };

  const logout = async () => {
    await storage.clearSession();
    setUser(null);
  };

  const updateProfile = async (updatedUser: User) => {
    const users = await storage.getUsers();

    const updatedUsers = users.map(item =>
      item.email === user?.email ? updatedUser : item
    );

    await storage.saveUsers(updatedUsers);
    await storage.saveSession(updatedUser);

    setUser(updatedUser);
  };

  const toggleFavorite = async (imageId: string) => {
    let updatedFavorites: string[];

    if (favorites.includes(imageId)) {
      updatedFavorites = favorites.filter(
        id => id !== imageId
      );
    } else {
      updatedFavorites = [
        ...favorites,
        imageId,
      ];
    }

    setFavorites(updatedFavorites);

    await storage.saveFavorites(updatedFavorites);
  };

  const isFavorite = (imageId: string) => {
    return favorites.includes(imageId);
  };

  const toggleTheme = async () => {
    const nextTheme = isDark ? 'light' : 'dark';

    setIsDark(!isDark);

    await storage.saveTheme(nextTheme);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        favorites,
        isLoading,
        isDark,
        register,
        login,
        logout,
        updateProfile,
        toggleFavorite,
        isFavorite,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}