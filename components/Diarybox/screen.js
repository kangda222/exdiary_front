import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const Diarybox = props => (
  <TouchableOpacity
    onPressOut={() => {
      props.handlePress(props.id);
      props.navigation.navigate("DiarylistScreen", {
        diaryList: props.diaryList
      });
    }}
  >
    <Text>{props.title}</Text>
  </TouchableOpacity>
);

Diarybox.prototypes = {
  title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default withNavigation(Diarybox);
