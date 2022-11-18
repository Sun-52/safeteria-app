import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/context";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function Basketscreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { no_basket } = route.params;
  const { user } = useContext(UserContext);
  const [basket, setbasket] = React.useState({});
  const [pre_basket, setpre_basket] = React.useState({});
  useEffect(() => {
    setpre_basket(no_basket);
  }, []);
  useEffect(() => {
    axios
      .get(`http://188.166.229.156:3000/food/${user._id}`)
      .then((response) => {
        setbasket(response.data);
        console.log(response.data, "get basket use effect");
      });
  }, [pre_basket]);
  return (
    <View style={styles.plain}>
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
        <Text style={styles.title}>Your order</Text>
      </View>
      <FlatList
        data={basket.food_list}
        renderItem={({ item }) => {
          return (
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
                          setpre_basket(response.data);
                        });
                    }}
                  >
                    <AntDesign name="pluscircle" color={"#FF7B2C"} size={22} />
                  </TouchableOpacity>
                </View>
                <View>
                  {pre_basket?.food_list?.includes(item._id) ? (
                    <Text style={styles.amount}>
                      {
                        pre_basket?.amount_of_food[
                          pre_basket?.food_list.indexOf(item._id)
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
                  {pre_basket?.food_list?.includes(item._id) ? (
                    <TouchableOpacity
                      onPress={() => {
                        console.log("decrease");
                        axios
                          .patch(
                            `http://188.166.229.156:3000/food/${user._id}/${item._id}`
                          )
                          .then((response) => {
                            console.log(response.data, "decrease food");
                            setpre_basket(response.data);
                          });
                      }}
                    >
                      <AntDesign
                        name="minuscircle"
                        color={"#FF7B2C"}
                        size={22}
                      />
                    </TouchableOpacity>
                  ) : (
                    <AntDesign name="minuscircle" color={"#FF7B2C"} size={22} />
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
      <View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                marginBottom: 7,
                marginRight: 11,
              }}
            >
              Continue
            </Text>
            <AntDesign name="arrowright" color={"white"} size={24} />
          </View>
        </TouchableOpacity>
      </View>
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
    // marginTop: 20,
    marginLeft: 10,
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
