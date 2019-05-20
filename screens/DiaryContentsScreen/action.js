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
          deleteContent = {this._deleteContent}
          changeContent = {this._changeContent}
        />;
    }

    // 컨텐츠 삭제 시 
    _deleteContent = () => {
      console.log("deleteContent()");
    }

    // 컨텐츠 수정 시 
    _changeContent = () => {
      console.log("changeContent()");
    }
}

export default Action;