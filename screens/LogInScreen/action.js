import React, { Component } from "react";
import { Alert } from "react-native";
import LogInScreen from "./screen";

class Action extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false
  };

  render() {
    return (
      <LogInScreen
        {...this.state}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        submit={this._submit}
      />
    );
  }
  _changeUsername = text => {
    this.setState({ username: text });
  };
  _changePassword = text => {
    this.setState({ password: text });
  };
  _submit = async () => {
    const { username, password, isSubmitting } = this.state;
    const { login } = this.props;
    if (!isSubmitting) {
      if (username && password) {
        this.setState({
          isSubmitting: true
        });
        // redux action
        const loginResult = await login(username, password);
        if (!loginResult) {
          Alert.alert("잘못된 아이디, 비밀번호 입니다");
          this.setState({ isSubmitting: false });
        }
      } else {
        Alert.alert("아이디, 비밀번호를 입력해주세요");
      }
    }
  };
}

export default Action;
