import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  EvilIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { deleteData } from "../../../async_storage/storage";
import { Button } from "react-native-web";
import { UserContext } from "../../../context/context";

export default function Searchscreen() {
  const [que, setque] = React.useState("");
  const navigation = useNavigation();
  const [data, setdata] = React.useState([]);
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
        <Text style={styles.title}>Input que number</Text>
      </View>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Que number..."
          value={que}
          onChangeText={(Text) => {
            setque(Text);
          }}
          onSubmitEditing={() => {
            axios
              .get(`http://188.166.229.156:3000/que/${que}`)
              .then((response) => {
                console.log(response.data, "get order from id");
                for (let i = 0; i < response.data.amount_of_food.length; i++) {
                  setdata(
                    data.push({
                      _id: response.data.food_list[i]._id,
                      name: response.data.food_list[i].name,
                      price: response.data.food_list[i].price,
                      amount: response.data.amount_of_food[i],
                    })
                  );
                }
                navigation.navigate("Detail", { basket: data });
              });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  plain: {
    backgroundColor: "#32324D",
    flex: 1,
    // justifyContent: "center",
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
    flexDirection: "column",
    height: 65,
    width: 100,
    marginTop: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 40,
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
  input: {
    fontSize: 14,
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#4A4A6A",
    color: "white",
  },
});
