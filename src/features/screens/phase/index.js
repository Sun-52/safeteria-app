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
import { SafeButtom } from "../../../components/SafeButtom";

export default function Phasescreen() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [phase, setphase] = React.useState("");
  const [pre_basket, setpre_basket] = React.useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [people, setPeople] = useState([0, 0, 0, 0, 0]);
  const [items, setItems] = useState([
    {
      label: `11:00-11:10 - ${people[0]} people`,
      value: "11:00-11:10",
    },
    {
      label: `11:10-11:20 - ${people[1]} people`,
      value: "11:10-11:20",
    },
    {
      label: `11:20-11:30 - ${people[2]} people`,
      value: "11:20-11:30",
    },
    {
      label: `11:30-11:40 - ${people[3]} people`,
      value: "11:30-11:40",
    },
    {
      label: `11:40-11:50 - ${people[4]} people`,
      value: "11:40-11:50",
    },
  ]);
  useEffect(() => {
    console.log(value, "drop list");
    axios
      .patch(`http://188.166.229.156:3000/food/${user._id}`, {
        phase: value,
      })
      .then((response) => {
        console.log(response.data, "add phase");
        setpre_basket(response.data);
      });
  }, [value]);
  useEffect(() => {
    axios.get("http://188.166.229.156:3000/food/get/phase").then((response) => {
      const new_item = [
        {
          label: `11:00-11:10 - ${response.data[0]} people`,
          value: "11:00-11:10",
        },
        {
          label: `11:10-11:20 - ${response.data[1]} people`,
          value: "11:10-11:20",
        },
        {
          label: `11:20-11:30 - ${response.data[2]} people`,
          value: "11:20-11:30",
        },
        {
          label: `11:30-11:40 - ${response.data[3]} people`,
          value: "11:30-11:40",
        },
        {
          label: `11:40-11:50 - ${response.data[4]} people`,
          value: "11:40-11:50",
        },
      ];
      setItems(new_item);
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
        <Text style={styles.title}>Select your phase</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select your phase"
          style={styles.button}
          textStyle={{ color: "white", fontSize: 17 }}
          dropDownContainerStyle={{
            backgroundColor: "#4A4A6A",
            width: 300,
          }}
        />
      </View>
      <View>
        {value === null ? (
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
        ) : (
          <TouchableOpacity
            onPress={() => {
              console.log("selected phase", value);
              // axios
              //   .patch(`http://188.166.229.156:3000/food/${user._id}`, {
              //     phase: value,
              //   })
              //   .then((response) => {
              //     console.log(response.data, "add phase");
              //     setpre_basket(response.data);
              //   });
              navigation.navigate("Payment", { pre_basket: pre_basket });
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
                Continue
              </Text>
              <AntDesign name="arrowright" color={"white"} size={24} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <SafeButtom />
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
