import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Layout,
  Icon,
  Text,
  Divider,
  TopNavigation,
  TopNavigationAction,
  List,
  Spinner,
} from "@ui-kitten/components";
import AgentCard from "../components/Cards/AgentCard";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const DraftList = ({ navigation }) => {
  //Local Components
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  const renderItem = ({ item, index }) => <AgentCard props={item} />;

  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title="Draft List" />
      <Divider />
      <Layout level="2" style={styles.container}>
        <View style={styles.indicator}>
          <Text category="c2">Coming Soon...</Text>
        </View>
        {/* {isLoading ? (
        ) : (
          <List data={agents || []} renderItem={renderItem} />
        )} */}
      </Layout>
    </>
  );
};

export default DraftList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },
});
