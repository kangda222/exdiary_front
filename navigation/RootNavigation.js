import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabsNavigation from "./TabsNavigation";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

export default createAppContainer(RootNavigation);
