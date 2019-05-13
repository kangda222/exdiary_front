import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";


// 일기장 목록 그리기 
const Diarybox = props => (
  <View>
    <TouchableOpacity
      onPressOut={() => {
        props.handlePress(props.diary_num);
        props.navigation.navigate("DiarylistScreen", {
          diaryList: props.diaryList
        });
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text>{props.diary_title} </Text>
        <Text>{props.create_date.substring(0, 10)}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

Diarybox.prototypes = {
  diary_title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default withNavigation(Diarybox);
