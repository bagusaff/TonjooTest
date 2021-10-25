import React, { useState } from "react";

//React Navgitaion Components
import { NavigationContainer } from "@react-navigation/native";

//Eva Design Components
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

//Stack Components
import AuthStack from "./src/stacks/Auth.Stack";
import HomeStack from "./src/stacks/Home.Stack";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        {isLoggedIn ? <HomeStack /> : <AuthStack />}
      </ApplicationProvider>
    </NavigationContainer>
  );
}
