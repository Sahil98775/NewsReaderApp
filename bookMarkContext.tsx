import { createContext, useState, ReactNode, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import NewsItem from "./DataType";

type BookmarkContextType = {
  bookmarks: NewsItem[];
  toggleBookmark: (article: NewsItem) => Promise<void>;
};

export const BookmarkContext = createContext<BookmarkContextType>(
  {} as BookmarkContextType
);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  // ✅ Open DB + Create Table
  useEffect(() => {
    const initDB = async () => {
      const database = await SQLite.openDatabaseAsync("news.db");

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS bookmarks (
          article_id TEXT PRIMARY KEY NOT NULL,
          title TEXT,
          description TEXT,
          image_url TEXT,
          link TEXT,
          source_name TEXT,
          pubDate TEXT,
          creator TEXT
        );
      `);

      setDb(database);
      loadBookmarks(database);
    };

    initDB();
  }, []);

  // ✅ Load bookmarks
  const loadBookmarks = async (database: SQLite.SQLiteDatabase) => {
    const results = await database.getAllAsync<NewsItem>(
      `SELECT * FROM bookmarks;`
    );
    setBookmarks(results);
  };

  // ✅ Toggle bookmark
  const toggleBookmark = async (article: NewsItem) => {
    if (!db) return;

    const exists = bookmarks.some(
      (item) => item.article_id === article.article_id
    );

    if (exists) {
      await db.runAsync(
        `DELETE FROM bookmarks WHERE article_id = ?;`,
        article.article_id
      );
    } else {
      await db.runAsync(
        `INSERT INTO bookmarks 
        (article_id, title, description, image_url, link, source_name, pubDate, creator)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        article.article_id,
        article.title,
        article.description,
        article.image_url,
        article.link,
        article.source_name,
        article.pubDate,
        article.creator?.join(", ") ?? ""
      );
    }

    loadBookmarks(db);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// import { createContext, useState, ReactNode, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import NewsItem from "./DataType";

// type BookmarkContextType = {
//   bookmarks: NewsItem[];
//   toggleBookmark: (article: NewsItem) => void;
// };

// export const BookmarkContext = createContext<BookmarkContextType>(
//   {} as BookmarkContextType
// );

// export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
//   const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

//   // Load bookmarks from AsyncStorage when app starts
//   useEffect(() => {
//     const loadBookmarks = async () => {
//       try {
//         const jsonValue = await AsyncStorage.getItem("@bookmarks");
//         if (jsonValue) setBookmarks(JSON.parse(jsonValue));
//       } catch (e) {
//         console.log("Failed to load bookmarks:", e);
//       }
//     };
//     loadBookmarks();
//   }, []);

//   // Save bookmarks to AsyncStorage whenever they change
//   useEffect(() => {
//     const saveBookmarks = async () => {
//       try {
//         await AsyncStorage.setItem("@bookmarks", JSON.stringify(bookmarks));
//       } catch (e) {
//         console.log("Failed to save bookmarks:", e);
//       }
//     };
//     saveBookmarks();
//   }, [bookmarks]);

//   const toggleBookmark = (article: NewsItem) => {
//     setBookmarks((prev) => {
//       const exists = prev.some(
//         (item) => item.article_id === article.article_id
//       );

//       if (exists) {
//         return prev.filter((item) => item.article_id !== article.article_id);
//       } else {
//         return [...prev, article];
//       }
//     });
//   };

//   return (
//     <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
//       {children}
//     </BookmarkContext.Provider>
//   );
// };
