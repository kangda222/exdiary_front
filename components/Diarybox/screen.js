import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import OptionsMenu from "react-native-options-menu"
const MoreIcon = require("../../assets/images/icon_receiptpay.png");

// 일기장 목록 그리기 
const Diarybox = props => (
  <View>
    <TouchableOpacity
      onPressOut={() => {
        props.handlePress(props.diary_num);
        if(props.loadded){
          props.navigation.navigate("DiarylistScreen", {
            diaryList: props.diaryList,
            diary_title: props.diary_title, // 일기장 타이틀 
            diary_num: props.diary_num
          });
        }
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text>{props.diary_title} </Text>
        <Text>{props.create_date.substring(0, 10)} </Text>
      </View>
    </TouchableOpacity>
    <OptionsMenu
      button={MoreIcon}
      buttonStyle={{ width: 20, height: 20, margin: 7.5, resizeMode: "contain" }}
      //destructiveIndex={1}
      options={["Edit", "Delete", "Cancel"]}
      actions={[props.editDiaryInfo, props.deleteDiary, props.cancel]}
      />
  </View>
);

Diarybox.prototypes = {
  diary_title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default withNavigation(Diarybox);
