import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Divider } from "@ui-kitten/components";
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
          title="Agents List From Tonjoo API"
          onPress={() => navigation.push("AgentsList")}
          image="AgentsList"
        />
        <HomeCard
          colors={["#FF5252", "#FF72B6"]}
          title="Add Agent"
          onPress={() => navigation.push("AddAgent")}
          image="AddAgent"
        />
        <HomeCard
          colors={["#4316DB", "#9076E7"]}
          title="Draft List"
          onPress={() => navigation.push("DraftList")}
          image="DraftList"
        />
        <HomeCard
          colors={["#9EE1EC", "#E5A7E0"]}
          title="Agents From Firebase"
          onPress={() => navigation.push("AgentDatabase")}
          image="AgentDatabase"
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
