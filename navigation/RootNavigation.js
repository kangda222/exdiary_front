import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabsNavigation from "./TabsNavigation";
import { Ionicons } from "@expo/vector-icons";
import WritingScreen from '../screens/WritingDiaryScreen';

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        title: '교환일기',
        headerRight: <Ionicons name='ios-contact' size={30}></Ionicons>,    
      }
    },
    WritingScreen: {
      screen: WritingScreen,
      navigationOptions: {
        title: '글 작성', 
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
