import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, Alert } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

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
    //console.log(width);
    return (
      <Modal
        isVisible={this.props.isVisiblePassword}
        onBackdropPress={() => this._reset()}
        style={{ width: width - 30 }}
      >
        {!this.state.isChange ? (
          <Container>
            <Text>비밀번호 확인</Text>
            <TextInput
              placeholder="Password"
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this._changePassword}
              //onSubmitEditing={props.submit}
            />
            {!this.state.isCorrect ? <IncorrectTxt>불일치</IncorrectTxt> : null}
            <BtnCon>
              <TouchableOpacity
                onPressOut={() => this._checkPassword(this.state.password)}
              >
                <Button>확인</Button>
              </TouchableOpacity>

              <TouchableOpacity onPressOut={() => this._reset()}>
                <Button>취소</Button>
              </TouchableOpacity>
            </BtnCon>
          </Container>
        ) : (
          <Container>
            <Text>새로운 비밀번호</Text>
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
            {!this.state.isCorrect ? (
              <IncorrectTxt>불일치 합니다</IncorrectTxt>
            ) : null}
            <BtnCon>
              <TouchableOpacity onPressOut={() => this._reset()}>
                <Button>취소</Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPressOut={() => this._submit(this.state.password)}
              >
                <Button>변경</Button>
              </TouchableOpacity>
            </BtnCon>
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
    this.setState({
      password: "",
      password2: "",
      isChange: false,
      isCorrect: true
    });
    this.props.toggleModal();
  };

  _Alert = () =>
    Alert.alert("비밀번호 변경 완료", "비밀번호가 변경 완료 되었습니다", [
      { text: "확인", onPress: () => console.log("OK Pressed") }
    ]);
}

const Container = styled.View`
  background-color: #fff;
  align-items: center;
`;

const Text = styled.Text`
  margin: 10px;
`;

const IncorrectTxt = styled.Text`
  margin: 10px;
  color: red;
`;

const TextInput = styled.TextInput`
  width: ${((width - 30) * 2) / 3};
  border-width: 1px;
  border-radius: 10;
  border-color: #ef9a9a;
`;

const BtnCon = styled.View`
  flex-direction: row;
`;

const TouchableOpacity = styled.TouchableOpacity`
  margin-top: 10px;
  width: ${(width - 30) / 2};
  height: 50px;
  background-color: #ef9a9a;
  justify-content: center;
`;

const Button = styled.Text`
  text-align: center;
  font-weight: bold;
`;

export default Action;
