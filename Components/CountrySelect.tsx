import { View, Text, Pressable } from "react-native";
import { useState } from "react";

const countries = [
  { name: "Global", code: "wo" },
  { name: "India", code: "in" },
  { name: "USA", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "UK", code: "gb" },
];

const Country = ({ onSelect }: { onSelect: (code: string) => void }) => {
  const [selectCountry, setSelectCountry] = useState("India");

  const handlePress = (item: { name: string; code: string }) => {
    setSelectCountry(item.name);
    onSelect(item.code);
  };
  return (
    <View
      style={{
        padding: 2,
        paddingLeft: 10,
        flexDirection: "row",
        gap: 10,
      }}
    >
      {countries.map((item) => (
        <Pressable
          key={item.name}
          onPress={() => handlePress(item)}
          style={{
            backgroundColor: selectCountry === item.name ? "red" : "#E4E4E4",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: selectCountry === item.name ? "white" : "black",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Country;
