import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function Loginscreen() {
  const navigation = useNavigation();
  console.log("test");
  return (
    <View style={{ backgroundColor: "green" }}>
      <Text>TEst</Text>
    </View>
  );
}
