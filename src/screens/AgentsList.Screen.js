import React, { useEffect } from "react";
import {
  Layout,
  Icon,
  Divider,
  TopNavigation,
  TopNavigationAction,
  List,
  Spinner,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

//Custom Component Import
import { fetchAgents } from "../state";
import AgentCard from "../components/Cards/AgentCard";

//Icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AgentLists = ({ navigation }) => {
  const dispatch = useDispatch();
  //Redux State
  const { agents, isLoading } = useSelector((state) => state.agent);
  const { token } = useSelector((state) => state.auth);

  //Local Components
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  const renderItem = ({ item, index }) => <AgentCard props={item} />;

  //functions
  useEffect(() => {
    dispatch(fetchAgents(token));
  }, []);

  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title="Agents List" />
      <Divider />
      <Layout level="2" style={styles.container}>
        {isLoading ? (
          <View style={styles.indicator}>
            <Spinner />
          </View>
        ) : (
          <List data={agents || []} renderItem={renderItem} />
        )}
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
  indicator: {
    alignItems: "center",
  },
});
