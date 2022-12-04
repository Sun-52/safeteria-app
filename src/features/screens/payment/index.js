import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Paymentscreen() {
  const route = useRoute();
  const { pre_basket } = route.params;
  const navigation = useNavigation();
  console.log(pre_basket, "pre basket");
  const { user } = useContext(UserContext);
  const [basket, setbasket] = React.useState({});
  const price = [];
  var sumprice = 0;
  const [finalprice, setfinalprice] = React.useState("");
  const [id, setid] = React.useState("");
  useEffect(() => {
    axios
      .get(`http://188.166.229.156:3000/food/${user._id}`)
      .then((response) => {
        console.log(response.data, "get order");
        setbasket(response.data);
        for (let i = 0; i < pre_basket.amount_of_food.length; i++) {
          console.log(pre_basket?.amount_of_food[i], "food amount loop");
          console.log(response.data.food_list[i]?.price, "food price lopp");
          price.push(
            parseInt(pre_basket?.amount_of_food[i]) *
              parseInt(response.data.food_list[i]?.price)
          );
          console.log(price, "price loop");
        }
        for (let j = 0; j < price.length; j++) {
          console.log(price[j], "price");
          console.log(sumprice + price[j], "add price");
          sumprice = sumprice + price[j];
          setfinalprice(sumprice);
        }
      });
  }, []);
  return (
    <SafeAreaView style={styles.plain}>
      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 15,
          marginLeft: 20,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-chevron-back-circle" size={26} color={"#4A4A6A"} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment confirmation</Text>
      </View>
      <View style={styles.box}>
        <View
          style={{
            alignSelf: "center",
            width: 300,
            height: 20,
            flexDirection: "row",
            //justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginLeft: 7 }}>
              Items
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17 }}>Amount</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginRight: 7 }}>
              Price
            </Text>
          </View>
        </View>
        <FlatList
          data={basket.food_list}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  alignSelf: "center",
                  width: 300,
                  height: 20,
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  marginVertical: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16, marginLeft: 7 }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {
                      basket?.amount_of_food[
                        pre_basket?.food_list?.indexOf(item._id)
                      ]
                    }
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#FF7B2C", fontSize: 16, marginRight: 7 }}
                  >
                    {basket?.amount_of_food[
                      pre_basket?.food_list?.indexOf(item._id)
                    ] * parseInt(item.price)}{" "}
                    ฿
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            alignSelf: "center",
            width: 300,
            height: 20,
            flexDirection: "row",
            // justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 17, marginLeft: 7 }}>
              Total price
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FF7B2C", fontSize: 17, marginRight: 7 }}>
              {finalprice} ฿
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("payment paid");
            axios
              .patch(`http://188.166.229.156:3000/qrcode/${basket._id}`)
              .then((response) => {
                console.log(response.data, "get que number");
                setid(response.data._id);
                navigation.navigate("Auth", { id: response.data._id });
              });
          }}
        >
          <View style={styles.button}>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                marginBottom: 7,
                marginRight: 11,
              }}
            >
              Pay {finalprice} ฿
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    // marginTop: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
    fontFamily: "Roboto",
  },
  box: {
    backgroundColor: "#4A4A6A",
    flexDirection: "column",
    // height: 105,
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
    fontFamily: "Roboto",
  },
  price: {
    color: "#FF7B2C",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 5,
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
  },
  location: {
    color: "#DCDCE4",
    fontSize: 19,
    // marginTop: 10,
    // marginLeft: 20,
    //alignSelf: "flex-start",
    fontFamily: "Roboto",
  },
  button: {
    backgroundColor: "#4A4A6A",
    width: 300,
    borderRadius: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
});
