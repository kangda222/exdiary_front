import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabsNavigation from "./TabsNavigation";
import { Ionicons } from "@expo/vector-icons";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        headerLeft: null,
        title: '앱',
        headerRight: <Ionicons name='ios-contact' size={30}></Ionicons>,    
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
