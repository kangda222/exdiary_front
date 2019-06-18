import React, { Component } from "react";
import PropTypes from "prop-types";
import Diarybox from "./screen";
import { throws } from "assert";

class Action extends Component {
  constructor(props) {
    super(props);

    this.state={
      open:false,
    }
  }

  static propTypes = {
    getDiarylist: PropTypes.func.isRequired,
  };

  render() {
    return <Diarybox
      {...this.props}
      {...this.state}
      handlePress={this._handlePress}
      handleMenuOpen={this._handleMenuOpen}
      editDiaryInfo={this._editDiaryInfo}
      deleteDiary={this._deleteDiary}
    />;
  }

  // 일기장 진입 시 
  _handlePress = () => {
    const { getDiarylist } = this.props;
    getDiarylist(this.props.diary_num);
  };

  // 일기장 삭제 시 
  _deleteDiary = (_diary_num) => {
    console.log("_deleteDiary() :" + this.props.diary_num);
    const { deleteDiary } = this.props;
    deleteDiary( this.props.diary_num);
  }

  // 일기장 수정 시 
  _editDiaryInfo = (_diary_num, _diary_title, _explanation) => {
    const { updateDiaryInfo } = this.props;
    console.log("_editDiaryInfo() :" + this.props.diary_num, +"," + this.props.diary_title + "," + this.props.explanation);
    updateDiaryInfo(this.props.diary_num,this.props.diary_title,this.props.explanation);
  }
}

export default Action;
