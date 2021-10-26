import React, { useState } from "react";
import {
  Layout,
  Text,
  Icon,
  Input,
  Button,
  Spinner,
  Select,
  IndexPath,
  TopNavigation,
  TopNavigationAction,
  Divider,
  SelectItem,
} from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

//Gender Data
const data = ["Male", "Female"];

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AddAgent = ({ navigation }) => {
  //Local State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedGender, setSelectedGender] = useState(new IndexPath(0));
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const displayValue = data[selectedGender.row];

  //Local Components
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );
  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );
  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title="Add New Agent" />
      <Divider />
      <Layout level="1" style={styles.container}>
        <Input
          value={firstName}
          style={styles.input}
          placeholder="First Name"
          onChangeText={(nextValue) => setFirstName(nextValue)}
        />
        <Input
          value={lastName}
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(nextValue) => setLastName(nextValue)}
        />
        <Select
          style={styles.input}
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedGender}
          onSelect={(index) => setSelectedGender(index)}
        >
          {data.map(renderOption)}
        </Select>
        <Input
          value={email}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Button
          style={[{ width: 200, height: 200 }, styles.input]}
          appearance="outline"
          status="info"
          accessoryLeft={<Icon name="plus" />}
          onPress={() => console.log("Pressed")}
        />
        <Button
          style={styles.button}
          accessoryLeft={LoadingIndicator}
          onPress={() => console.log("pressed")}
        >
          Save as Draft
        </Button>
        <Button
          style={styles.button}
          accessoryLeft={LoadingIndicator}
          onPress={() => console.log("pressed")}
          status="info"
        >
          Submit
        </Button>
      </Layout>
    </>
  );
};

export default AddAgent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
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
