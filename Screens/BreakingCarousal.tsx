import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import NewsItem from "../DataType";

const { width } = Dimensions.get("window");

type BreakingCarousalProps = {
  breakingNews: NewsItem[];
  navigation: any;
};

const BreakingCarousal = ({
  breakingNews,
  navigation,
}: BreakingCarousalProps) => {
  return (
    <View style={{ marginVertical: 2 }}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={breakingNews}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("DetailScreen", { article: item })
            }
          >
            <View
              style={{ borderRadius: 10, overflow: "hidden", paddingRight: 25 }}
            >
              {item.image_url && (
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: "100%", height: 212, borderRadius: 5 }}
                />
              )}

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  paddingBottom: 11,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Manrope",
                    fontSize: 16,
                    padding: 5,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BreakingCarousal;
