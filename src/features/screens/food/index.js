import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function Foodscreen() {
  const route = useRoute();
  const food = route.params;
  return (
    <View>
      <FlatList
        data={food}
        renderItem={({ item }) => {
          return (
            <View style={styles.box}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  plain: {
    backgroundColor: "#32324D",
    flex: 1,
    alignContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  box: {
    backgroundColor: "#4A4A6A",
    flexDirection: "row",
  },
  info: {
    color: "white",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});
