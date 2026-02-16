import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/styles";
import { useNavigation } from "@react-navigation/native";
import Foundation from "@expo/vector-icons/Foundation";
import { useEffect } from "react";

const InitialScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MainTab");
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.IntialContainer}>
      <Text style={{ fontSize: 17 }}>Welcome to</Text>

      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={() => navigation.navigate("MainTab")}
      >
        <Foundation name="anchor" size={100} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 50, fontWeight: "500", paddingBottom: 15 }}>
        ANCHORs
      </Text>
    </SafeAreaView>
  );
};

export default InitialScreen;
