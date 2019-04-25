import React from "react";
import { createStackNavigator } from "react-navigation";
import DiaryboxScreen from "../screens/DiaryboxScreen";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";

const DiaryboxRoute = createStackNavigator(
  {
    DiaryboxScreen: {
      screen: DiaryboxScreen
    },
    WritingDiaryScreen: {
      screen: WritingDiaryScreen
    }
  },
  {
    navigationOptions: {
      headerMode: "none"
    }
  }
);

export default DiaryboxRoute;
