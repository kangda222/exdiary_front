import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryboxScreen from "./screen";

class Action extends Component {
  static propTypes = {
    feed: PropTypes.array,
    getDiary: PropTypes.func.isRequired
  };

  state = {
    isFetching: false
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.feed) {
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
