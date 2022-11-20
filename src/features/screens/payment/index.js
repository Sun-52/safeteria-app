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

export default function Paymentscreen() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}
