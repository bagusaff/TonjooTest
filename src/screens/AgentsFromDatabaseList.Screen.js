import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Layout,
  Icon,
  Divider,
  TopNavigation,
  TopNavigationAction,
  List,
  Spinner,
} from "@ui-kitten/components";
import AgentCard from "../components/Cards/AgentCard";

import { useSelector, useDispatch } from "react-redux";
import { fetchFirebaseAgent } from "../state";
//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AgentsFromDatabaseList = ({ navigation }) => {
  const dispatch = useDispatch();
  //Redux State
  const { firebaseAgents, isLoading } = useSelector((state) => state.agent);
  //Local Components
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  const renderItem = ({ item, index }) => <AgentCard props={item} />;

  //Functions
  useEffect(() => {
    dispatch(fetchFirebaseAgent());
  }, []);
  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title="Agents From Firebase" />
      <Divider />
      <Layout level="2" style={styles.container}>
        {isLoading ? (
          <View style={styles.indicator}>
            <Spinner />
          </View>
        ) : (
          <List data={firebaseAgents || []} renderItem={renderItem} />
        )}
      </Layout>
    </>
  );
};

export default AgentsFromDatabaseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  indicator: {
    alignItems: "center",
  },
});
