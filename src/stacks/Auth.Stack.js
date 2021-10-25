import React from "react";
import LoginScreen from "../screens/Login.Screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const AuthStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={LoginScreen} name="Login" />
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
