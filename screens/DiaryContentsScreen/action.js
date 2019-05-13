import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryContentsScreen from "./screen";

class Action extends Component {
    render() {
        return <DiaryContentsScreen
          {...this.props}
          {...this.state}
        />;
    }
}

export default Action;