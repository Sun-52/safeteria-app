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

export default function Authscreen() {
  const route = useRoute();
  const { id } = route.params;
  const [que, setque] = React.useState("");
  useEffect(() => {
    axios.get(`http://188.166.229.156:3000/qrcode/${id}`).then((response) => {
      console.log(response.data, "get order from auth");
      setque(response.data.que);
    });
  });
  return (
    <View style={styles.plain}>
      <View style={styles.box}>
        <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
          {que}
        </Text>
      </View>
      <Text style={styles.location}>Please show the que to the shop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  plain: {
    backgroundColor: "#32324D",
    flex: 1,
    justifyContent: "center",
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
    marginTop: 40,
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
