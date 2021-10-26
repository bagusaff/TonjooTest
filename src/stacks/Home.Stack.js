import React from "react";
import HomeScreen from "../screens/Home.Screen";
import AddAgentScreen from "../screens/AddAgent.Screen";
import AgentsListScreen from "../screens/AgentsList.Screen";
import DraftListScreen from "../screens/DraftList.Screen";
import AgentsFromDatabaseListScreen from "../screens/AgentsFromDatabaseList.Screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={AddAgentScreen} name="AddAgent" />
      <Stack.Screen component={AgentsListScreen} name="AgentsList" />
      <Stack.Screen component={DraftListScreen} name="DraftList" />
      <Stack.Screen
        component={AgentsFromDatabaseListScreen}
        name="AgentDatabase"
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
