import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  Layout,
  Text,
  Icon,
  Input,
  Button,
  Spinner,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";

//Redux Functions
import { loginHandle } from "../state";

//Icons
const PersonIcon = (props) => <Icon {...props} name="person" />;
const LoginScreen = () => {
  const dispatch = useDispatch();
  //Redux State
  const { isLoading } = useSelector((state) => state.auth);
  //Local State
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Functions
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const loginButtonOnPress = () => {
    dispatch(loginHandle(username, password));
  };

  //Local Component
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.wrapper}>
        <Text category="h1" status="primary">
          Tonjoo Test
        </Text>
        <Text category="label" appearance="hint">
          Username & Password : tonjoo
        </Text>
        <Input
          value={username}
          style={styles.input}
          placeholder="Masukkan Username"
          accessoryRight={PersonIcon}
          onChangeText={(nextValue) => setUsername(nextValue)}
        />
        <Input
          value={password}
          style={styles.input}
          placeholder="Masukkan Password"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />
        <Button
          style={styles.button}
          accessoryLeft={isLoading ? LoadingIndicator : null}
          onPress={loginButtonOnPress}
        >
          Log In
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  wrapper: { width: "100%" },
  input: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: "auto",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
