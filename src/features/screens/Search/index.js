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
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeButtom } from "../../../components/SafeButtom";

export default function Searchscreen() {
  const [que, setque] = React.useState("");
  const navigation = useNavigation();
  const [data, setdata] = React.useState([]);
  const { user } = useContext(UserContext);
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
            if (que.length === 4) {
              axios
                .get(`http://188.166.229.156:3000/que/${que}`)
                .then((response) => {
                  console.log(response.data, "get order from id");
                  if (response.data !== null) {
                    if (user.role === "shop") {
                      for (
                        let i = 0;
                        i < response.data.amount_of_food.length;
                        i++
                      ) {
                        setdata(
                          data.push({
                            _id: response.data.food_list[i]._id,
                            name: response.data.food_list[i].name,
                            price: response.data.food_list[i].price,
                            amount: response.data.amount_of_food[i],
                          })
                        );
                      }
                      setque("");
                      navigation.navigate("Detail", {
                        basket: data,
                        id: response.data._id,
                      });
                    } else {
                      alert("Student can't search for order");
                      navigation.navigate("Restaurant");
                    }
                  } else {
                    alert("Order not found");
                  }
                });
            } else {
              alert("Que number shouldn't be more or less than 4 digits");
            }
          }}
        />
      </View>
      <SafeButtom />
    </SafeAreaView>
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
    fontFamily: "Roboto",
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
    marginBottom: 40,
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
  input: {
    fontSize: 14,
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#4A4A6A",
    color: "white",
    fontFamily: "Roboto",
  },
});
