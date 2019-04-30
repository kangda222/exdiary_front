import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryboxScreen from "./screen";

class Action extends Component {
  static propTypes = {
    myDiary: PropTypes.array,
    exDiary: PropTypes.array,
    getDiary: PropTypes.func.isRequired
  };

  state = {
    isFetching: false
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.myDiary || nextProps.exDiary) {
      return {
        isFetching: false
      };
    }
    return { ...this.state };
  }

  render() {
    return (
      <DiaryboxScreen {...this.props} {...this.state} refresh={this._refresh} />
    );
  }

  _refresh = () => {
    const { getDiary } = this.props;
    this.setState({
      isFetching: true
    });
    getDiary();
  };
}

export default Action;
