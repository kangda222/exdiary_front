import React, { Component } from "react";
import PropTypes from "prop-types";
import Diarybox from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    getDiarylist: PropTypes.func.isRequired,
    diaryList: PropTypes.array
  };
  render() {
    return <Diarybox {...this.props} handlePress={this._handlePress} />;
  }

  _handlePress = id => {
    const { getDiarylist } = this.props;
    getDiarylist(id);
  };
}

export default Action;
