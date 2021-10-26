import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "@ui-kitten/components";
import AddAgent from "../../assets/icons/AddAgent.svg";
import AgentsList from "../../assets/icons/AgentsList.svg";
const HomeCard = ({ colors, title, onPress, image }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.linearGradient}>
        <Text category="h1" style={styles.banner}>
          {title}
        </Text>
        {image === "AddAgent" ? (
          <AddAgent style={styles.image} />
        ) : (
          <AgentsList style={styles.image} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 50,
    borderRadius: 15,
    marginTop: 15,
    position: "relative",
    overflow: "hidden",
  },
  banner: {
    fontSize: 20,
    color: "#fff",
  },
  image: {
    width: 120,
    height: 50,
    position: "absolute",
    right: 0,
    top: -15,
  },
});
