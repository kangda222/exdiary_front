import React, { Component } from "react";
import { Alert } from "react-native";
import ModalScreen from "./screen";

class Action extends Component {
  constructor(props) {
    //console.log(props);
    super(props);
  }

  state = {
    isVisibleProfile: false,
    isVisiblePassword: false
  };

  render() {
    //console.log(width, height);
    return (
      <ModalScreen
        {...this.state}
        {...this.props}
        toggleProfileModal={this._toggleProfileModal}
        togglePasswordModal={this._togglePasswordModal}
        logout={this._logout}
        secession={this._secession}
        Alert={this._Alert}
      />
    );
  }

  _Alert = () =>
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "확인", onPress: () => this._logout() }
    ]);

  _toggleProfileModal = () => {
    this.setState({ isVisibleProfile: !this.state.isVisibleProfile });
  };

  _togglePasswordModal = () => {
    this.setState({ isVisiblePassword: !this.state.isVisiblePassword });
  };

  _logout = () => {
    this.props.toggleModal();
    this.props.logout();
  };

  _secession = () => {
    this.props.secession();
  };
}

export default Action;
