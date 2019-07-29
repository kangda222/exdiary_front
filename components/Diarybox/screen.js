import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import OptionsMenu from "react-native-options-menu";
import { Card } from "react-native-elements";
const MoreIcon = require("../../assets/images/icon_receiptpay.png");

const { width } = Dimensions.get("window").width;

// 일기장 목록 그리기 
const Diarybox = props => (
  <View>
    <Card containerStyle={{ width: 200, height: 100 }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPressOut={async () => {
            const a = await props.handlePress(props.diary_num);
            if(a){
              props.navigation.navigate("DiarylistScreen", {
                diaryList: props.diaryList,
                diary_title: props.diary_title, // 일기장 타이틀 
                diary_num: props.diary_num,
                diary_type: props.diary_type, // 교환일기인지, 기본 일기인지 확인을 위해
              });
            }
          }}
        >
          <Text style={{ fontFamily: "Roboto", fontSize: 18, fontWeight: 'bold' }}>{props.diary_title} </Text>
          <Text style={{ fontSize: 15, lineHeight: 20 }}>{props.create_date.substring(0, 10)}</Text>
        </TouchableOpacity>
        <OptionsMenu
          button={MoreIcon}
          buttonStyle={{ width: 20, height: 20, margin: 7.5, resizeMode: "contain" }}
          //destructiveIndex={1}
          options={["수정", "삭제", "취소"]}
          actions={[props.editDiaryInfo, props.deleteDiary, props.cancel]}
        />
      </View>
    </Card>
  </View>
);

Diarybox.prototypes = {
  diary_title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};

var style = StyleSheet.create({
  boxBorder: {
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: '#00897b',
    borderWidth: 1,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,
  }

})

export default withNavigation(Diarybox);
