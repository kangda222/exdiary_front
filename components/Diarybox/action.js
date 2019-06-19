import React, { Component } from "react";
import PropTypes from "prop-types";
import Diarybox from "./screen";
class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loadded: false
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
      editDiaryInfo={this._editDiaryInfo}
      deleteDiary={this._deleteDiary}
    />;
  }

  // 일기장 진입 시 
  _handlePress = async () => {
    const { getDiarylist } = this.props;
    const result = await getDiarylist(this.props.diary_num);
    if (result) {
      this.setState({ loadded: !this.state.loadded });
    }
  };

  // 일기장 삭제 시 
  _deleteDiary = () => {
    const { deleteDiary } = this.props;
    deleteDiary(this.props.diary_num);
  }

  // 일기장 수정 시 
  _editDiaryInfo = () => {
    console.log(this.props);
    // const { updateDiaryInfo } = this.props;

  }
}

export default Action;
