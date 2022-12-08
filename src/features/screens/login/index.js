import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import axios from "axios";
import { getData } from "../../../async_storage/storage";
import { useNavigation } from "@react-navigation/native";
import { storeData } from "../../../async_storage/storage";
import { useContext } from "react";
import { UserContext } from "../../../context/context";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Loginscreen() {
  const { logIn, signUp } = useContext(UserContext);
  const [pageStatus, setpageStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  if (pageStatus == "") {
    return (
      <SafeAreaView style={styles.plain}>
        <Text style={styles.title}>Login to your account</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setpageStatus("sign_in");
          }}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setpageStatus("log_in");
          }}
        >
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  if (pageStatus == "log_in") {
    return (
      <View style={styles.plain}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(Text) => setEmail(Text)}
          onSubmitEditing={() => {
            logIn(email);
          }}
          placeholderTextColor={"white"}
        />
      </View>
    );
  }
  if (pageStatus == "sign_in") {
    return (
      <View style={styles.plain}>
        <TextInput
          style={styles.input}
          placeholder="name..."
          value={name}
          onChangeText={(Text) => setName(Text)}
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="email..."
          value={email}
          onChangeText={(Text) => {
            setEmail(Text);
          }}
          placeholderTextColor={"white"}
        />
        {email !== "" && name !== "" ? (
          <TouchableOpacity
            onPress={() => {
              signUp(email, name);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.text}>Sign up</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.button}>
            <Text style={styles.text}>Sign up</Text>
          </View>
        )}
      </View>
    );
  }
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
    marginBottom: 45,
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
  button: {
    borderColor: "green",
    backgroundColor: "#4A4A6A",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 40,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 17,
    fontFamily: "Roboto",
  },
  input: {
    fontSize: 14,
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#4A4A6A",
    color: "white",
    fontFamily: "Roboto",
    marginVertical: 10,
  },
});
