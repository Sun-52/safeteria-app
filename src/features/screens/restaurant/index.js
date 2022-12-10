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
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteData } from "../../../async_storage/storage";
import { Button } from "react-native-web";
import { UserContext } from "../../../context/context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Restaurantscreen() {
  const navigation = useNavigation();
  const [restaurant, setrestaurant] = React.useState([]);
  const { set_signedin, user } = useContext(UserContext);
  useEffect(() => {
    axios.get("http://188.166.229.156:3000/restaurant").then((response) => {
      setrestaurant(response.data);
      console.log(response.data, "get all restaurant");
      console.log(user, "test user val");
    });
  }, []);
  return (
    <SafeAreaView style={styles.plain}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <EvilIcons name="location" color={"#DCDCE4"} size={20} />
          <Text style={styles.location}>SK Cafeteria</Text>
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <MaterialCommunityIcons
              name="tag-search-outline"
              color={"#DCDCE4"}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>Choose your restaurant</Text>
      <FlatList
        data={restaurant}
        renderItem={({ item }) => (
          <TouchableOpacity
            //style={styles.box}
            onPress={() => {
              console.log("restaurant selected");
              navigation.navigate("Food", { restaurant_id: item._id });
            }}
          >
            <View style={styles.box}>
              <Text style={styles.info}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deleteData("user_id");
          set_signedin(false);
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
          }}
        >
          Log out from account
        </Text>
      </TouchableOpacity>
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
    marginTop: 10,
    marginLeft: 15,
    alignSelf: "flex-start",
    fontFamily: "Roboto",
  },
  box: {
    backgroundColor: "#4A4A6A",
    //flexDirection: "row",
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
