import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryboxScreen from "./screen";

class Action extends Component {
  // 타입 검사 
  static propTypes = {
    // totalDiary: PropTypes.array,
    exDiary: PropTypes.array,
    myDiary: PropTypes.array,
    getDiary: PropTypes.func.isRequired
  };

  state = {
    isFetching: false,
    isModalVisible: false,
    explanation: null,
    diary_title: null,
    diary_type: 'default',
    switchValue: false,
    myDiaryData: this.props.myDiary,
    exDiaryData: this.props.exDiary
  };

  /*
  컴포넌트가 최초 마운팅 됐을 경우와 부모 컴포넌트에서 전달해주는 props가 변경 되었을 경우 호출되며, 
  render() 메서드가 호출되기 이전에 호출된다.
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('***** nextProps:' + nextProps.length);
    // console.log('***** this.state.myDiary : ' + prevState.myDiaryData.length);

    if (nextProps.myDiary.length !== prevState.myDiaryData.length
      || nextProps.exDiary.length !== prevState.exDiaryData.length) {
      // 리스트 업데이트 
      console.log('getDerivedStateFromProps() List Update...');
      return {
        ...this.state,
        isFetching: false
      }
    }
    else {
      return { ...this.state }
    }
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

  _refresh = async () => {
    const { getDiary } = this.props;
    await getDiary();
    this.setState({
      isFetching: true
    });

  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible, diary_title: null, diary_type: "default", explanation: null, switchValue:false});
  }

  _reset = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible, diary_title: null, diary_type: "default", explanation: null, switchValue:false});
  };

  _onTitleChanged = (text) => {
    this.setState({ diary_title: text });
  }

  _onExplanationChanged = (text) => {
    this.setState({ explanation: text });
  }

  // 일기장 생성 시 
  _submitDiaryInfo = () => {
    const { getDiary, myDiary, exDiary, token } = this.props;
    let url = 'http://192.168.245.1:8080/diary/insertDiaryInfo';
    if ((this.state.diary_type === "default" && myDiary.length === 0) ||
      (this.state.diary_type === "exchange" && exDiary.length < 5)) {
      fetch(url, {
        method: 'post',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "authorization": "Bearer " + token
        },
        body: JSON.stringify({
          user_num: '2',
          email: 'user01@example.com',
          diary_type: this.state.diary_type,
          diary_title: this.state.diary_title,
          explanation: this.state.explanation
        }),
      })
        .then((response) => response.json())
        .then(response => {
          if (JSON.stringify(response) > 0 && this.state.diary_title !== 'null') {
            alert('일기장이 생성 되었습니다');
            getDiary();
            this._toggleModal();
          }
          else { 
            alert('제목을 입력해 주세요');
          }
        }).catch(e => e)
    } else {
      if (myDiary.length > 0) {
        alert("나의 일기장은 한개만 생성 가능합니다.");
      }
      else {
        alert("교환일기는 최대 5개까지 생성 가능합니다.");
      }
      this._toggleModal();
    }
  }

  _handleToggleSwitch = () => {
    this.setState({
      switchValue: !this.state.switchValue
    })

    if (this.state.switchValue) {
      this.setState({
        diary_type: 'default'
      })
    } else {
      this.setState({

        diary_type: 'exchange'
      })
    }
  }
}

export default Action;
