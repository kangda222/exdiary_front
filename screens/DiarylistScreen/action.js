import React, { Component } from "react";
import PropTypes from "prop-types";
import DiarylistScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { diaryList }
        }
      }
    } = props;
    this.state = {
      diaryList,
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
    />;
  }
  
  // 일기에 해당하는 내용 가져오기
  _getDiaryContents = _page_num => {
    const {getDiaryContent} = this.props;
    getDiaryContent(_page_num);
  }

}

export default Action;
