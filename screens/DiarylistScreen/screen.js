import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import PropTypes from "prop-types";

// 일기 리스트 목록 그리기 
const DiarylistScreen = props => (
  <View>
    <Text>{props.diary_title}</Text>
    <FlatList
      data={props.diaryList}
      keyExtractor={item => item.page_num.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPressOut={() => {
          props.getDiaryContents(item.page_num.toString());
          props.navigation.navigate("DiaryContentsScreen", {
              
          });
        }}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{item.title} </Text>
            <Text>{item.write_date.substring(0, 10)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

DiarylistScreen.proptypes = {
  diaryList: PropTypes.array.isRequired
};

export default DiarylistScreen;
