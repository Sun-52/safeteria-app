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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  EvilIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { deleteData } from "../../../async_storage/storage";
import { Button } from "react-native-web";
import { UserContext } from "../../../context/context";

export default function Detailscreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { basket } = route.params;
  const [info, setinfo] = React.useState([]);
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
        <Text style={styles.title}>Order detail</Text>
      </View>
      <FlatList
        data={basket}
        renderItem={({ item }) => {
          return (
            <View style={styles.box}>
              <Text style={styles.info}>{item.name}</Text>
              <Text style={styles.price}>{item.price} ฿</Text>
              <View style={styles.add_tab}>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
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
    height: 55,
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
    height: 55,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
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
