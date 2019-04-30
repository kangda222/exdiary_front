import React from "react";
import { createStackNavigator } from "react-navigation";
import DiaryboxScreen from "../screens/DiaryboxScreen";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
import DiarylistScreen from "../screens/DiarylistScreen";

const DiaryboxRoute = createStackNavigator(
  {
    DiaryboxScreen: {
      screen: DiaryboxScreen
    },
    DiarylistScreen: {
      screen: DiarylistScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default DiaryboxRoute;
