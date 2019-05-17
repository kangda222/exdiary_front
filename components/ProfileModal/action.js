import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar, Alert } from "react-native";
import styled from "styled-components/native";
import { CheckBox } from "react-native-elements";
import { white } from "ansi-colors";

class Action extends Component {
  constructor(props) {
    //console.log(props);
    super(props);
  }

  state = {
    isMale:
      this.props.profile && this.props.profile.gender === "F" ? false : true,
    nickname: this.props.profile.nickname,
    phoneNumber: this.props.profile.phoneNumber
  };

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisibleProfile}
        onBackdropPress={() => this._reset()}
      >
        <Container>
          <Text>프로필 변경!!</Text>
          <Text>이름</Text>
          <TextInput
            placeholder="username"
            value={this.state.nickname}
            onChangeText={this._changeNickname}
          />
          <Text>핸드폰번호</Text>
          <TextInput
            placeholder="mobile number"
            onChangeText={this._changePhonNumber}
          />
          <Text>성별</Text>
          <CheckBox
            center
            title="남"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={{
              width: 100,
              height: 15,
              backgroundColor: "white",
              borderColor: "white"
            }}
            iconRight={true}
            checked={this.state.isMale}
            onPress={() => this._toggleGender()}
          />
          <CheckBox
            center
            title="여"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={{
              width: 100,
              height: 15,
              backgroundColor: "white",
              borderColor: "white"
            }}
            iconRight={true}
            checked={!this.state.isMale}
            onPress={() => this._toggleGender()}
          />
          <Button title="취소" onPress={() => this._reset()} />
          <Button title="변경" onPress={() => this._submit()} />
        </Container>
      </Modal>
    );
  }

  _toggleGender = () => {
    this.setState({ isMale: !this.state.isMale });
  };

  _reset = () => {
    this.setState({ nickname: this.props.profile.nickname });
    this.props.toggleProfileModal();
  };

  _submit = async () => {
    const { nickname, phoneNumber, isMale } = this.state;
    const isSuccess = await this.props.updateProfile(
      nickname,
      phoneNumber,
      isMale
    );
    if (isSuccess) {
      await this.props.toggleProfileModal();
      Alert.alert("프로필 수정 완료", "프로필 수정이 완료 되었습니다", [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]);
    } else {
      this.setState({ nickname: this.props.profile.nickname });
      Alert.alert("프로필 수정 오류", "다시 시도 해주세요", [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]);
    }
  };

  _changeNickname = text => {
    this.setState({ nickname: text });
  };

  _changePhonNumber = text => {
    this.setState({ phoneNumber: text });
  };
}

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

export default Action;
