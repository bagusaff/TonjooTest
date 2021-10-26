import React, { useState } from "react";

//React Navgitaion Components
import { NavigationContainer } from "@react-navigation/native";

//Eva Design Components
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

//Stack Components
import AuthStack from "./src/stacks/Auth.Stack";
import HomeStack from "./src/stacks/Home.Stack";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        {isLoggedIn ? <HomeStack /> : <AuthStack />}
      </ApplicationProvider>
    </NavigationContainer>
  );
}
