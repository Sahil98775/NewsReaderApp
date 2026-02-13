import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";
import { BookmarkContext } from "../bookMarkContext";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/styles";
import NewsItem from "../DataType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigations/StackNav";

type Props = NativeStackScreenProps<RootStackParamList, "BookMarks">;

type NewsListProps = {
  news: NewsItem[];
  navigation: any;
  bookmarks: NewsItem[];
  handleBookmark: (article: NewsItem) => void;
};

const Bookmarks = ({ navigation }: Props) => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  if (bookmarks.length === 0) {
    return (
      <View
        style={[
          styles.HomeContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ fontSize: 18, color: "gray" }}>No bookmarks yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.HomeContainer}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.article_id.toString()}
        renderItem={({ item }) => {
          const isBookmarked = bookmarks.some(
            (b) => b.article_id === item.article_id
          );

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailScreen", { article: item })
              }
              style={{
                backgroundColor: "#F8F9FA",
                marginVertical: 8,
                padding: 8,
                borderRadius: 5,
              }}
            >
              {item.image_url && (
                <Image
                  source={{ uri: item.image_url }}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}
              <View style={{ flex: 1, backgroundColor: "#F8F9FA", padding: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {item.title}
                </Text>
                <Image
                  source={{ uri: item.source_icon }}
                  style={{
                    width: 30,
                    height: 30,
                    paddingBottom: 5,
                  }}
                  resizeMode="cover"
                />
                <Text style={{ fontSize: 14, color: "gray", paddingTop: 20 }}>
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

export default Bookmarks;
