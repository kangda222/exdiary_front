import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

const Diarybox = props => (
  <TouchableOpacity>
    <Text>{props.title}</Text>
  </TouchableOpacity>
);

Diarybox.prototypes = {
  title: PropTypes.string.isRequired
};

export default Diarybox;
