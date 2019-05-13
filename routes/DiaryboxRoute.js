import { createStackNavigator } from "react-navigation";
import DiaryboxScreen from "../screens/DiaryboxScreen";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
import DiarylistScreen from "../screens/DiarylistScreen";
import DiaryContentsScreen from "../screens/DiaryContentsScreen";

const DiaryboxRoute = createStackNavigator(
  {
    // 일기장 리스트 보여주는 화면 
    DiaryboxScreen: {
      screen: DiaryboxScreen
    },
    // 일기 리스트 보여주는 화면 
    DiarylistScreen: {
      screen: DiarylistScreen
    },
    // 일기 내용 보여주는 화면 
    DiaryContentsScreen: {
      screen: DiaryContentsScreen
    },
    // 일기 쓰기 화면
    WritingDiaryScreen: {
      screen:WritingDiaryScreen
    }
  },
  {
    mode:"card",
    headerMode: "none"
  }
);

export default DiaryboxRoute;
