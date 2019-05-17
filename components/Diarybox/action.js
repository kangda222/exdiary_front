import React, { Component } from "react";
import PropTypes from "prop-types";
import Diarybox from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    getDiarylist: PropTypes.func.isRequired,
    // diaryList: PropTypes.array
  };
  render() {
    return <Diarybox
      {...this.props}
      handlePress={this._handlePress}
    />;
  }

  _handlePress = diary_num => {
    const { getDiarylist, token } = this.props;
    console.log("diaryBox:",token);
    getDiarylist(diary_num,token);
  };
}

export default Action;
