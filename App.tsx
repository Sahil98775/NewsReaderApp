import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BookmarkProvider } from "./bookMarkContext";
import { NavigationContainer } from "@react-navigation/native";
import StacNav from "./Navigations/StackNav";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BookmarkProvider>
        <NavigationContainer>
          <StacNav />
        </NavigationContainer>
      </BookmarkProvider>
    </GestureHandlerRootView>
  );
}
