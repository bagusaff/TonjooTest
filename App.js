import React, { useState } from "react";

//React Navgitaion Components
import { NavigationContainer } from "@react-navigation/native";

//Eva Design Components
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

//Redux
import { Provider, useSelector } from "react-redux";
import { store } from "./src/state";

//Stack Components
import AuthStack from "./src/stacks/Auth.Stack";
import HomeStack from "./src/stacks/Home.Stack";

//Toast
import Toast from "react-native-toast-message";

//Helper
import { navigationRef } from "./RootNavigation";

const AppWrapper = () => {
  //Redux State
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
      customMapping={mapping}
    >
      <NavigationContainer ref={navigationRef}>
        <IconRegistry icons={EvaIconsPack} />
        {isLoggedIn ? <HomeStack /> : <AuthStack />}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
