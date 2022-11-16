import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/features/navigation/index.js";
import { UserContextProvider } from "./src/context/context.js";

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
