import React, { Component } from "react";
import PropTypes from "prop-types";
import DiarylistScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            diaryList,
            diary_title,
            diary_num
          }
        }
      }
    } = props;

    this.state = {
      diaryList,
      diary_title, // 일기장 제목을 나타내주기 위해 
      diary_num // 일기장 번호 넘겨주기 위해
    };
  }
  static propTypes = {
    // diaryContent: PropTypes.array,
    // getDiaryContent: PropTypes.func.isRequired
  };

  render() {
    return <DiarylistScreen
      {...this.props}
      {...this.state}
      getDiaryContents={this._getDiaryContents}
      setValue={this._setValue}
    />;
  }

  // 일기에 해당하는 내용 가져오기
  _getDiaryContents = (_diary_num,_page_num) => {
    console.log(_diary_num, _page_num);
    const { getDiaryContent } = this.props;
    getDiaryContent(_diary_num, _page_num);
  }

}

export default Action;
