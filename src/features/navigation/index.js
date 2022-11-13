import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurantscreen from "../screens/restaurant";
import Foodscreen from "../screens/food";

import { Ionicons, Entypo } from "@expo/vector-icons";

export default function Navigation() {
  return <RootTab />;
}
const MainStack = createNativeStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Restaurant" component={Restaurantscreen} />
      <MainStack.Screen name="Food" component={Foodscreen} />
    </MainStack.Navigator>
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
