import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import BookMarks from "../Screens/BookMarks";
import { View, Text } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { useContext } from "react";
import { BookmarkContext } from "../bookMarkContext";

const Tab = createBottomTabNavigator();

const BottamTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          paddingTop: 10,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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

          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="BookMarks"
        component={BookMarks}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottamTabs;
