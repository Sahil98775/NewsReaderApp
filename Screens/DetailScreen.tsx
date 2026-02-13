import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { BookmarkContext } from "../bookMarkContext";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigations/StackNav";
type Props = NativeStackScreenProps<RootStackParamList, "DetailScreen">;

const DetailScreen = ({ navigation }: Props) => {
  const route = useRoute();
  const { article } = route.params as { article: any };
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={26}
          color={isBookmarked ? "red" : "black"}
          onPress={() => toggleBookmark(article)}
        />
      ),
    });
  }, [navigation, isBookmarked, bookmarks]);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 15,
      }}
    >
      <View>
        <Image
          source={{ uri: article.image_url }}
          style={{ width: "100%", height: 400, borderRadius: 10 }}
        />
      </View>
      <View style={{ flex: 2, paddingBottom: 100 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: "Manrope",
            marginVertical: 10,
          }}
        >
          {article.title}
        </Text>
        <Text>{new Date(article.pubDate).toLocaleString()}</Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            fontFamily: "Open Sans",
            paddingTop: 10,
          }}
        >
          {article.description}
        </Text>
        <Text style={{ fontSize: 15, paddingTop: 30, paddingBottom: 3 }}>
          {article.creator}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 3 }}
        >
          <Text style={{ fontSize: 18, paddingTop: 2, fontWeight: "700" }}>
            {article.source_name}
          </Text>
          <Image
            source={{ uri: article.source_icon }}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
