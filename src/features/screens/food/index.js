import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign, EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import { UserContext } from "../../../context/context";

export default function Foodscreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurant_id } = route.params;
  console.log(restaurant_id, "restaurant id");
  const { user } = useContext(UserContext);
  const [food, setFood] = React.useState({});
  const [basket, setbasket] = React.useState({ food_list: [] });
  const [name, setname] = React.useState("");
  useEffect(() => {
    axios
      .get(`http://188.166.229.156:3000/restaurant/${restaurant_id}`)
      .then((response) => {
        console.log(response.data.food_list, "get food");
        console.log(basket, "check basket");
        setFood(response.data.food_list);
        setname(response.data.name);
      });
  }, []);
  return (
    <View style={styles.plain}>
      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
          marginLeft: 15,
          flexDirection: "row",
        }}
      >
        <EvilIcons name="location" color={"#DCDCE4"} size={20} />
        <Text style={styles.location}>SK Cafeteria | {name}</Text>
      </View>
      <Text style={styles.title}>Choose your dish | {name}</Text>
      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          marginTop: 10,
          marginLeft: 15,
          flexDirection: "row",
        }}
        onPress={() => {
          console.log("redirect to basket");
          navigation.navigate("Basket", { no_basket: basket });
        }}
      >
        <FontAwesome5 name="shopping-basket" color={"#DCDCE4"} size={20} />
        <Text style={[styles.location, { marginLeft: 10 }]}>Basket</Text>
      </TouchableOpacity>
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
                    axios
                      .post(
                        `http://188.166.229.156:3000/food/${user._id}/${item._id}`
                      )
                      .then((response) => {
                        console.log(response.data, "increase food");
                        setbasket(response.data);
                      });
                  }}
                >
                  <AntDesign name="pluscircle" color={"#FF7B2C"} size={22} />
                </TouchableOpacity>
              </View>
              <View>
                {basket.food_list.includes(item._id) ? (
                  <Text style={styles.amount}>
                    {
                      basket?.amount_of_food[
                        basket?.food_list.indexOf(item._id)
                      ]
                    }
                  </Text>
                ) : (
                  <Text style={styles.amount}>0</Text>
                )}
              </View>
              <View
                style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }}
              >
                {basket?.food_list?.includes(item._id) ? (
                  <TouchableOpacity
                    onPress={() => {
                      console.log("decrease");
                      axios
                        .patch(
                          `http://188.166.229.156:3000/food/${user._id}/${item._id}`
                        )
                        .then((response) => {
                          console.log(response.data, "decrease food");
                          setbasket(response.data);
                        });
                    }}
                  >
                    <AntDesign name="minuscircle" color={"#FF7B2C"} size={22} />
                  </TouchableOpacity>
                ) : (
                  <AntDesign name="minuscircle" color={"#FF7B2C"} size={22} />
                )}
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
    height: 105,
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
    height: 105,
    flex: 1,
    alignItems: "flex-end",
  },
  amount: {
    color: "white",
    fontSize: 17,
    marginRight: 17,
  },
  location: {
    color: "#DCDCE4",
    fontSize: 19,
    // marginTop: 10,
    // marginLeft: 20,
    //alignSelf: "flex-start",
  },
});
