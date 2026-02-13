import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsItem from "./DataType";

type BookmarkContextType = {
  bookmarks: NewsItem[];
  toggleBookmark: (article: NewsItem) => void;
};

export const BookmarkContext = createContext<BookmarkContextType>(
  {} as BookmarkContextType
);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

  // Load bookmarks from AsyncStorage when app starts
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@bookmarks");
        if (jsonValue) setBookmarks(JSON.parse(jsonValue));
      } catch (e) {
        console.log("Failed to load bookmarks:", e);
      }
    };
    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage whenever they change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem("@bookmarks", JSON.stringify(bookmarks));
      } catch (e) {
        console.log("Failed to save bookmarks:", e);
      }
    };
    saveBookmarks();
  }, [bookmarks]);

  const toggleBookmark = (article: NewsItem) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (item) => item.article_id === article.article_id
      );

      if (exists) {
        return prev.filter((item) => item.article_id !== article.article_id);
      } else {
        return [...prev, article];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
