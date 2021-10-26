import React from "react";
import {
  Layout,
  Icon,
  Divider,
  TopNavigation,
  TopNavigationAction,
  List,
} from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";
import AgentCard from "../components/Cards/AgentCard";

// Dummy
const data = new Array(8).fill({
  title: "Item",
});

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AgentLists = ({ navigation }) => {
  //Local Components
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  const renderItem = ({ item, index }) => <AgentCard />;

  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title="Agents List" />
      <Divider />
      <Layout level="2" style={styles.container}>
        <List data={data} renderItem={renderItem} />
      </Layout>
    </>
  );
};

export default AgentLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
