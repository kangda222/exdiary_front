import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import DiaryboxScreen from "../screens/DiaryboxScreen";
import SearchScreen from "../screens/SearchScreen";
import CalenderScreen from "../screens/CalenderScreen";
import NotificationScreen from "../screens/NotificationScreen";
import MyDiaryListScreen from "../screens/MyDiaryListScreen";
import { Ionicons } from "@expo/vector-icons";

const TabsNavigation = createBottomTabNavigator(
  {
    Diarybox: {
      //screen: DiaryboxScreen,
      screen: MyDiaryListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-bookmarks"
            size={30}
            color={focused ? "blue" : "black"}
          />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-send"}
            size={30}
            color={focused ? "blue" : "black"}
          />
        )
      }
    },
    Calender: {
      screen: CalenderScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-calendar"}
            size={30}
            color={focused ? "blue" : "black"}
          />
        )
      }
    },
    Notificaiton: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"ios-notifications"}
            size={30}
            color={focused ? "blue" : "black"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FBFBFB",
        height: 45
      }
    }
  }
);

export default createAppContainer(TabsNavigation);
