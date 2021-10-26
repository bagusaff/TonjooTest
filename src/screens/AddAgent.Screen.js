import React, { useState, useEffect } from "react";
import {
  Layout,
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
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { uploadAgentToDatabase } from "../state";

//Gender Data
const data = ["Male", "Female"];

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AddAgent = ({ navigation }) => {
  const dispatch = useDispatch();
  //Redux State
  const { isLoading } = useSelector((state) => state.agent);
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

  //Functions
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const cameraLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, (res) => {
        console.log("Response = ", res);
        if (res.didCancel) {
          console.log("User cancelled image picker");
        } else if (res.error) {
          console.log("ImagePicker Error: ", res.error);
        } else if (res.customButton) {
          console.log("User tapped custom button: ", res.customButton);
          alert(res.customButton);
        } else {
          console.log("response", JSON.stringify(res));
          setPhoto(res);
        }
      });
    }
  };

  const onUploadButtonPressed = () => {
    const uploadData = {
      firstName,
      lastName,
      displayValue,
      email,
      photo,
    };
    dispatch(uploadAgentToDatabase(uploadData));
  };

  const onDraftButtonPressed = () => {
    console.log("Draft Pressed");
  };
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
          onSelect={(index) => {
            setSelectedGender(index);
          }}
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
        {photo ? (
          <>
            <TouchableOpacity activeOpacity={0.8} onPress={cameraLaunch}>
              <Image
                source={{
                  uri: photo.assets[0].uri,
                }}
                style={[
                  {
                    width: 200,
                    height: 200,
                    borderRadius: 5,
                    marginBottom: 10,
                  },
                  styles.input,
                ]}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Button
            style={[{ width: 200, height: 200 }, styles.input]}
            appearance="outline"
            status="info"
            accessoryLeft={<Icon name="plus" />}
            onPress={cameraLaunch}
          />
        )}
        <Button
          style={styles.button}
          disabled={true}
          onPress={onDraftButtonPressed}
        >
          Save as Draft
        </Button>
        <Button
          style={styles.button}
          accessoryLeft={isLoading ? LoadingIndicator : null}
          onPress={onUploadButtonPressed}
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
