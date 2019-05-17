import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryContentsScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
          state: {
              params: { title,write_date,nickname }
          }
      }
  } = props;
  
    this.state = {
      title,
      write_date,
      nickname
    }
}

    render() {
        return <DiaryContentsScreen
          {...this.props}
          {...this.state}
        />;
    }
}

export default Action;