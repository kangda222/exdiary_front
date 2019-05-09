import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryboxScreen from "./screen";

class Action extends Component {
  static propTypes = {
    myDiary: PropTypes.array,
    exDiary: PropTypes.array,
    getDiary: PropTypes.func.isRequired
  };

  state = {
    isFetching: false,
    isModalVisible: false,
    explanation: '',
    diary_title: '',
    diary_type:'default',
    switchValue: false,
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.myDiary || nextProps.exDiary) {
      return {
        isFetching: false
      };
    }
    return { ...this.state };
  }

  render() {
    return (
      <DiaryboxScreen 
        {...this.props}
        {...this.state}
        refresh={this._refresh}
        toggleModal={this._toggleModal}
        onTitleChanged={this._onTitleChanged}
        onExplanationChanged={this._onExplanationChanged}
        submitDiaryInfo={this._submitDiaryInfo}
        handleToggleSwitch={this._handleToggleSwitch}
      />
    );
  }

  _refresh = () => {
    const { getDiary } = this.props;
    this.setState({
      isFetching: true
    });
    getDiary();
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _onTitleChanged = (text) => {
    this.setState({ diary_title: text });
  }

  _onExplanationChanged = (text) => {
    this.setState({ explanation: text });
  }

  _submitDiaryInfo = () => {
    const { getDiaryList } = this.props;
    let url = 'http://192.168.245.1:8080/diary/insertDiaryInfo';
    fetch(url,{
      method:'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body:JSON.stringify({
        user_num:'1',
        email:'qwerty@naver.com',
        diary_type:this.state.diary_type,
        diary_title:this.state.diary_title,
        explanation:this.state.explanation
      }),
    })
    .then((response) => response.json())
    .then(responseJsonFromServer => {
      if(JSON.stringify(responseJsonFromServer) > 0){
        
        getDiary();
      }
      else {
        alert('일기장 생성에 실패');
      }
    })
    .catch(e => e)

    this.setState({ isModalVisible: !this.state.isModalVisible });
  

  }

  _handleToggleSwitch = () => {
    this.setState({
      switchValue:!this.state.switchValue
    })

    if(this.state.switchValue){
      this.setState({
        diary_type:'default'
      })
    }else{
      this.setState({
        
        diary_type:'exchange'
      })
    }
  }
}

export default Action;
