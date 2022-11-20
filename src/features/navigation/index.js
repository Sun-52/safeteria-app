import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurantscreen from "../screens/restaurant/index.js";
import Foodscreen from "../screens/food/index.js";
import Loginscreen from "../screens/login/index.js";
import Basketscreen from "../screens/basket/index.js";
import Phasescreen from "../screens/phase/index.js";
import Paymentscreen from "../screens/payment/index.js";

import { Ionicons, Entypo } from "@expo/vector-icons";

import { useContext } from "react";
import { UserContextProvider, UserContext } from "../../context/context";

export default function Navigation() {
  return (
    <UserContextProvider>
      <Nav />
    </UserContextProvider>
  );
}
const MainStack = createNativeStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Restaurant" component={Restaurantscreen} />
      <MainStack.Screen name="Food" component={Foodscreen} />
      <MainStack.Screen name="Basket" component={Basketscreen} />
      <MainStack.Screen name="Phase" component={Phasescreen} />
      <MainStack.Screen name="Payment" component={Paymentscreen} />
    </MainStack.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Loginscreen} />
    </LoginStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const RootTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        style: {
          position: "absolute",
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
        component={MainStackScreen}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
export function Nav() {
  const { isRegistered } = useContext(UserContext);
  console.log(isRegistered, "nav");
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isRegistered ? (
        <Stack.Screen name="Main" component={RootTab} />
      ) : (
        <Stack.Screen name="logintab" component={LoginStackScreen} />
      )}
      {/* {status === "login" && (
    <Stack.Screen name="login" component={LoginStackScreen} />
  )}
  {status === "home" && <Stack.Screen name="Main" component={RootTab} />} */}
    </Stack.Navigator>
  );
}
