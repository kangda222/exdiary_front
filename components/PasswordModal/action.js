import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, Alert } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

class Action extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    password: "",
    password2: "",
    isSubmitting: false,
    isCorrect: true,
    isChange: false
  };

  static propTypes = {
    checkPassword: PropTypes.func.isRequired,
    isCorrect: PropTypes.bool
  };

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisiblePassword}
        onBackdropPress={() => this._reset()}
      >
        {!this.state.isChange ? (
          <Container>
            <Text>비밀번호 변경!!</Text>
            <TextInput
              placeholder="Password"
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this._changePassword}
              //onSubmitEditing={props.submit}
            />
            {!this.state.isCorrect ? <Text>불일치</Text> : null}
            <Button
              title="확인"
              onPress={() => this._checkPassword(this.state.password)}
            />
            <Button title="취소" onPress={() => this._reset()} />
          </Container>
        ) : (
          <Container>
            <Text>비밀번호</Text>
            <TextInput
              placeholder="Password"
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this._changePassword}
            />
            <Text>비밀번호 재입력</Text>
            <TextInput
              placeholder="Password again"
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password2}
              onChangeText={this._changePassword2}
            />
            {!this.state.isCorrect ? <Text>불일치 합니다</Text> : null}
            <Button title="취소" onPress={() => this._reset()} />
            <Button
              title="변경"
              onPress={() => this._submit(this.state.password)}
            />
          </Container>
        )}
      </Modal>
    );
  }

  _changePassword = text => {
    this.setState({ password: text });
  };

  _changePassword2 = async text => {
    await this.setState({ password2: text });
    this.setState({
      isCorrect: this.state.password !== this.state.password2 ? false : true
    });
  };

  _checkPassword = async password => {
    const isCorrect = await this.props.checkPassword(password);
    console.log(`isCorrect :: ${isCorrect}`);
    if (isCorrect) {
      console.log(isCorrect);
      this.setState({ isCorrect: true, password: "", isChange: true });
    } else {
      this.setState({ isCorrect: false });
    }
  };

  _submit = async password => {
    this.setState({ password: "", password2: "" });
    console.log(`submit!!!!!! password :: ${password}`);
    const isUpdate = await this.props.updatePassword(password);
    if (isUpdate) {
      await this._reset();
      this._Alert();
    }
  };

  _reset = () => {
    this.setState({ password: "", password2: "", isChange: false });
    this.props.toggleModal();
  };

  _Alert = () =>
    Alert.alert("비밀번호 변경 완료", "비밀번호가 변경 완료 되었습니다", [
      { text: "확인", onPress: () => console.log("OK Pressed") }
    ]);
}

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

export default Action;
