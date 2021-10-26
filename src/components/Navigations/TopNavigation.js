import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { logoutHandle } from "../../state";
//Icons
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const TopNav = () => {
  const dispatch = useDispatch();
  //Local State
  const [menuVisible, setMenuVisible] = React.useState(false);
  //Local Function
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const logoutButtonPressed = () => {
    dispatch(logoutHandle());
  };
  // Local Components
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          accessoryLeft={LogoutIcon}
          title="Logout"
          onPress={logoutButtonPressed}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={require("../../assets/icons/Avatar.png")}
      />
      <Text {...props}>Tonjoo</Text>
    </View>
  );
  return (
    <TopNavigation
      title={renderTitle}
      accessoryRight={renderOverflowMenuAction}
    />
  );
};

export default TopNav;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
