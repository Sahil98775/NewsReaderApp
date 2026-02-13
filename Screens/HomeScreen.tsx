import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Categories from "../Components/Categories";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import NewsItem from "../DataType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigations/StackNav";
//-------------------------------------------------------------------
import styles from "../Styles/styles";
import getBreaking from "../API/Latest";
import fetchNews from "../API/FNews";
import Country from "../Components/CountrySelect";
import NewsList from "./NewsList";
import BreakingCarousal from "./BreakingCarousal";
import { BookmarkContext } from "../bookMarkContext";

//---------------------------------------------------------------------

const HomeScreen = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  const { bookmarks: BookMark, toggleBookmark: handleBookedMark } =
    useContext(BookmarkContext);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setselectedCountry] = useState("in");
  const [selectedCategory, setselectedCategory] = useState<string | null>(null);
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);

  //----------------------------------------------------
  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        setLoading(true);
        const Breaking = await getBreaking(selectedCountry);
        setBreakingNews(Breaking);
      } catch (error) {
        console.log("Error loading breaking news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBreakingNews();
  }, [selectedCountry]);
  //----------------------------------------------------------
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchNews(selectedCountry, selectedCategory);
        setNews(articles);
      } catch (error) {
        console.log("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [selectedCategory, selectedCountry]);

  // ==========================================================
  return (
    <View style={styles.HomeContainer}>
      <View style={styles.homesearchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          placeholder="Search"
          cursorColor={"black"}
          style={{
            flex: 1,
            marginLeft: 8,
            fontSize: 17,
            color: "black",
          }}
        />
      </View>

      <Country
        onSelect={(code) => {
          setselectedCountry(code);
        }}
      />

      <View
        style={{
          flex: 5,
          margin: 10,
        }}
      >
        <Text
          style={{
            color: "#BB1919",
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 2,
          }}
        >
          BREAKING NEWS
        </Text>
        <BreakingCarousal breakingNews={breakingNews} navigation={navigation} />
      </View>

      <View style={{ flex: 8, backgroundColor: "#F8F9FA", margin: 10 }}>
        <View style={{ paddingBottom: 1 }}>
          <Categories onSelect={(cat) => setselectedCategory(cat)} />
        </View>
        <NewsList
          news={news}
          bookmarks={BookMark}
          navigation={navigation}
          handleBookmark={handleBookedMark}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
