import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Layout,
  Spinner,
  Text,
  Divider,
  Button,
  Avatar,
} from "@ui-kitten/components";

const AgentCard = ({ props }) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.wrapper}>
        <Avatar style={styles.avatar} source={{ uri: props.avatar }} />
        <View>
          <Text style={styles.InfoText} category="s1">
            {props.first_name} {props.last_name}
          </Text>
          <Text style={styles.InfoText}>{props.gender}</Text>
          <Text style={styles.InfoText}>{props.email}</Text>
        </View>
      </View>
      <Divider />
      {/* <Button
        style={styles.button}
        appearance="outline"
        status="success"
        disabled={false}
      >
        Save to Cloud
      </Button> */}
    </Layout>
  );
};

export default AgentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderWidth: 0.5,
    borderColor: "#E4E9F2",
    borderRadius: 10,
    padding: 20,
    position: "relative",
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  InfoText: {
    marginBottom: 5,
  },
  button: {
    margin: 2,
    width: 150,
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
