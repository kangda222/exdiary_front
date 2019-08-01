import React, { Component } from "react";
import DiaryContentsScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { title, write_date, nickname, diary_num, page_num, diaryContent }
        }
      }
    } = props;

    this.state = {
      title,
      write_date,
      nickname,
      diary_num,
      page_num,
      diaryContent: (diaryContent) ? diaryContent : []
    }
  }

  render() {
    return <DiaryContentsScreen
      {...this.props}
      {...this.state}
      deleteContent={this._deleteContent}
      changeContent={this._changeContent}
    />;
  }

  // 컨텐츠 삭제 시 
  _deleteContent = async(_diary_num, _page_num) => {
    console.log("deleteContent()");
    const { deleteDiaryContents } = this.props;
    const result = await deleteDiaryContents(_diary_num, _page_num);
    if(result){
      this.props.navigation.navigate("DiarylistScreen");
    }
  }

}

export default Action;