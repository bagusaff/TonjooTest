import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Icon,
  Input,
  Button,
  Spinner,
  Divider,
} from "@ui-kitten/components";
//Custom Components
import TopNav from "../components/Navigations/TopNavigation";
import HomeCard from "../components/Cards/HomeCard";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <TopNav />
      <Divider />
      <Layout style={styles.container} level="2">
        <HomeCard
          colors={["#2FB8FF", "#50A4FF"]}
          title="Agents List"
          onPress={() => navigation.push("AgentsList")}
          image="AgentsList"
        />
        <HomeCard
          colors={["#FF5252", "#FF72B6"]}
          title="Add Agent"
          onPress={() => navigation.push("AddAgent")}
          image="AddAgent"
        />
      </Layout>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
