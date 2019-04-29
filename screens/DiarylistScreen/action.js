import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, FlatList, Text } from "react-native";
import DiarylistScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    const {
      navigation: {
        state: {
          params: { diaryList }
        }
      }
    } = props;
    this.state = {
      diaryList
    };
  }

  static propTypes = {
    diaryContent: PropTypes.array,
    getDiaryContent: PropTypes.func.isRequired
  };

  render() {
    return <DiarylistScreen {...this.props} {...this.state} />;
  }
}

export default Action;
