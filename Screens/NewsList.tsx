import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "../Styles/styles";
import { Ionicons } from "@expo/vector-icons";
import NewsItem from "../DataType";
import { useContext } from "react";
import { BookmarkContext } from "../bookMarkContext";

type NewsListProps = {
  news: NewsItem[];
  navigation: any;
  bookmarks: NewsItem[];
  handleBookmark: (article: NewsItem) => void;
};
const NewsList = ({ news, navigation, handleBookmark }: NewsListProps) => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  return (
    <View style={styles.flatContainer}>
      <FlatList
        data={news}
        keyExtractor={(item, index) =>
          item.article_id?.toString() || index.toString()
        }
        renderItem={({ item }) => {
          const isBookmarked = bookmarks.some(
            (b) => b.article_id === item.article_id
          );

          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={25}
            color={isBookmarked ? "red" : "black"}
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={() => toggleBookmark(item)}
          />;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DetailScreen", { article: item });
              }}
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginVertical: 8,
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              {item.image_url && (
                <Image
                  source={{ uri: item.image_url }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                <Image
                  source={{ uri: item.source_icon }}
                  style={{
                    width: 25,
                    height: 25,
                    paddingBottom: 5,
                  }}
                  resizeMode="cover"
                />

                <Text style={{ fontSize: 12, color: "gray", paddingTop: 10 }}>
                  {new Date(item.pubDate).toLocaleDateString()}
                </Text>
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={25}
                  color={isBookmarked ? "red" : "black"}
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onPress={() => toggleBookmark(item)}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NewsList;
