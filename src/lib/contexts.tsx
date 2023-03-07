import type { Post, Author, Category } from '@/lib/types';
import { createContext, useContext } from 'react';
import { GetStaticProps } from 'next';

export type AppContextType = {
  posts: Post[];
  authors: Author[];
  categories: Category[];
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

type AppContextProviderProps = {
  children: React.ReactNode;
  data: AppContextType;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
  data,
}) => {
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
