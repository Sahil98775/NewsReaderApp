import { Text, View, Pressable, ScrollView } from "react-native";
import { useState } from "react";

const Categories = [
  { name: "All", code: null },
  { name: "Business", code: "business" },
  { name: "Entertainment", code: "entertainment" },
  { name: "Sports", code: "sports" },
  { name: "Health", code: "health" },
  { name: "Technology", code: "technology" },
  { name: "Politics", code: "politics" },
  { name: "Lifestyle", code: "lifestyle" },
];

const Category = ({
  onSelect,
}: {
  onSelect: (category: string | null) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleClick = (item: { name: string; code: string | null }) => {
    setSelectedCategory(item.name);
    onSelect(item.code);
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 5,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {Categories.map((item) => (
        <Pressable
          key={item.name}
          onPress={() => handleClick(item)}
          style={{
            backgroundColor: selectedCategory === item.name ? "red" : "#E4E4E4",
            padding: 9,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: selectedCategory === item.name ? "white" : "black",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
export default Category;
