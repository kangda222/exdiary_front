import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryContentsScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    console.log("this.props.contents:"+ JSON.stringify(this.props.diaryContent));
  }

    render() {
        return <DiaryContentsScreen
          {...this.props}
          {...this.state}
        />;
    }
}

export default Action;