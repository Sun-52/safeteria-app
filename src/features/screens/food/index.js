import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

export default function Foodscreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurant_id } = route.params;
  console.log(restaurant_id, "restaurant id");
  const [food, setFood] = React.useState({});
  useEffect(() => {
    axios
      .get(`http://188.166.229.156:3000/restaurant/${restaurant_id}`)
      .then((response) => {
        console.log(response.data.food_list, "get food");
        setFood(response.data.food_list);
      });
  }, []);
  return (
    <View style={styles.plain}>
      <Text style={styles.title}>Choose your dish</Text>
      <FlatList
        data={food}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.info}>{item.name}</Text>
            <Text style={styles.price}>{item.price} ฿</Text>
            <View style={styles.add_tab}>
              <View
                style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log("increase");
                  }}
                >
                  <AntDesign name="pluscircle" color={"#FF7B2C"} size={22} />
                </TouchableOpacity>
              </View>
              <View
                style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log("decrease");
                  }}
                >
                  <AntDesign name="minuscircle" color={"#FF7B2C"} size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    alignSelf: "flex-start",
  },
  box: {
    backgroundColor: "#4A4A6A",
    flexDirection: "row",
    height: 85,
    width: 300,
    marginTop: 15,
    borderRadius: 20,
  },
  info: {
    color: "white",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 5,
  },
  price: {
    color: "#FF7B2C",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 5,
  },
  add_tab: {
    flexDirection: "column",
    //backgroundColor: "green",
    height: 60,
    flex: 1,
    alignItems: "flex-end",
  },
});
