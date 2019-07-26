import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import DiaryboxRoute from "../routes/DiaryboxRoute";
import SearchScreen from "../screens/SearchScreen";
import CalenderScreen from "../screens/CalenderScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Ionicons } from "@expo/vector-icons";

const TabsNavigation = createBottomTabNavigator(
  {
    Diarybox: {
      screen: DiaryboxRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-bookmarks"
            size={30}
            color={focused ? "#263238" : "#ffcdd2"}
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
            color={focused ? "#263238" : "#ffcdd2"}
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
            color={focused ? "#263238" : "#ffcdd2"}
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
            color={focused ? "#263238" : "#ffcdd2"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#ef9a9a",
        height: 45
      }
    }
  }
);

export default createAppContainer(TabsNavigation);
