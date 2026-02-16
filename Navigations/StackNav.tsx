import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import InitialScreen from "../Screens/InitialScreen";
import BottomTabs from "./BottamTabs";
import DetailScreen from "../Screens/DetailScreen";
import NewsItem from "../DataType";
import Foundation from "@expo/vector-icons/Foundation";
import { useContext } from "react";
import { BookmarkContext } from "../bookMarkContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  InitialScreen: undefined;
  MainTab: undefined;
  DetailScreen: { article: NewsItem };
  BookMarks: undefined;
};

const StacNav = () => {
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTab"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
                ANCHORs
              </Text>
              <Foundation
                name="anchor"
                size={30}
                color="black"
                style={{ paddingLeft: 5 }}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default StacNav;
