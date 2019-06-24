import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

// 일기 리스트 목록 그리기 
const DiarylistScreen = props => (
  <View>
    {props.diaryList.length !== 0 ?
      <>
        <Text>{props.diary_title}</Text>
        <FlatList
          data={props.diaryList}
          keyExtractor={item => item.page_num.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPressOut={() => {
              props.getDiaryContents(item.diary_num.toString(), item.page_num.toString());
              props.navigation.navigate("DiaryContentsScreen", {
                title:item.title,
                write_date:item.write_date,
                nickname:item.nickname,
                page_num:item.page_num,
                diary_num:item.diary_num
              });
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>{item.title} </Text>
                <Text>{item.write_date.substring(0, 10)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </> : null}
      
    <TouchableOpacity onPressOut={() => {
      props .navigation.navigate("WritingDiaryScreen", {
        diary_num: props.diary_num,
      });
    }}>
      <Feather name={"plus-circle"} size={30} />
      <Text>일기를 추가하세요!</Text>
    </TouchableOpacity>
  </View>
);

DiarylistScreen.proptypes = {
  // diaryList: PropTypes.array.isRequired
};

export default DiarylistScreen;
