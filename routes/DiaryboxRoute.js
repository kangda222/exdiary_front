import React from "react";
import { createStackNavigator } from "react-navigation";
import DiaryboxScreen from "../screens/DiaryboxScreen";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
import DiarylistScreen from "../screens/DiarylistScreen";

const DiaryboxRoute = createStackNavigator(
  {
    // 일기장 리스트 보여주는 화면 
    DiaryboxScreen: {
      screen: DiaryboxScreen
    },
    DiarylistScreen: {
      screen: DiarylistScreen
    }
  },
  {
    mode:"card",
    headerMode: "none"
  }
);

export default DiaryboxRoute;
