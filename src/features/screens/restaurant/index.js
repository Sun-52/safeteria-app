import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import axios from "axios";

export default function Restaurantscreen() {
  const [restaurant, setrestaurant] = React.useState([]);
  useEffect(() => {
    axios.get("http://188.166.229.156:3000/restaurant").then((response) => {
      setrestaurant(response.data);
      console.log(response.data, "get all restaurant");
    });
  });
  return (
    <View style={styles.plain}>
      <Text>Choose your restaurant</Text>
      <FlatList
        data={restaurant}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              console.log("restaurant selected");
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
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
