import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar, Alert } from "react-native";
import styled from "styled-components/native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import PhotoMenuModal from "../PhotoMenuModal";
import { white } from "ansi-colors";

const { width } = Dimensions.get("window");

class Action extends Component {
  constructor(props) {
    //console.log(props);
    super(props);
  }

  state = {
    isMale:
      this.props.profile && this.props.profile.gender === "F" ? false : true,
    nickname: this.props.profile && this.props.profile.nickname,
    phoneNumber: this.props.profile && this.props.profile.phoneNumber,
    isShowPhotoMenu: false,
    image: this.props.profile && this.props.profile.profile_img
  };

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisibleProfile}
        onBackdropPress={() => this._reset()}
        style={{ width: width * 0.9 }}
      >
        <Container>
          <Text>프로필 변경</Text>
          <TouchableOpacity onPressOut={() => this._togglePhotoMenu()}>
            {this.state.image ? (
              <Image
                source={{
                  uri: this.state.image
                }}
              />
            ) : (
              <Ionicons name="ios-contact" size={50} />
            )}
            <PhotoMenuModal
              isShowPhotoMenu={this.state.isShowPhotoMenu}
              togglePhotoMenu={this._togglePhotoMenu}
              setImage={this._setImage}
            />
          </TouchableOpacity>
          <Text>이름</Text>
          <TextInput
            placeholder=" username"
            value={this.state.nickname}
            onChangeText={this._changeNickname}
          />
          <Text>핸드폰번호</Text>
          <TextInput
            placeholder=" mobile number"
            onChangeText={this._changePhonNumber}
          />
          <Text>성별</Text>
          <BtnCon>
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
          </BtnCon>
          <BtnCon>
            <TouchableBtn onPressOut={() => this._reset()}>
              <Button>취소</Button>
            </TouchableBtn>
            <TouchableBtn onPressOut={() => this._submit()}>
              <Button>변경</Button>
            </TouchableBtn>
          </BtnCon>
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
    const { nickname, phoneNumber, isMale, image } = this.state;
    //console.log(image);
    const isSuccess = await this.props.updateProfile(
      nickname,
      phoneNumber,
      isMale,
      image
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

  _togglePhotoMenu = () => {
    this.setState({ isShowPhotoMenu: !this.state.isShowPhotoMenu });
  };

  _setImage = uri => {
    this.setState({ image: uri });
  };
}

const Container = styled.View`
  background-color: #fff;
  align-items: center;
`;

const Text = styled.Text`
  margin: 10px;
`;

const TextInput = styled.TextInput`
  width: ${(width * 0.9 * 2) / 3};
  border-width: 1px;
  border-radius: 10;
  border-color: #ef9a9a;
`;

const BtnCon = styled.View`
  flex-direction: row;
`;

const TouchableBtn = styled.TouchableOpacity`
  margin-top: 10px;
  width: ${(width * 0.9) / 2};
  height: 50px;
  background-color: #ef9a9a;
  justify-content: center;
`;

const Button = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const Image = styled.Image`
  width: 40;
  height: 40;
  border-radius: 20;
`;

const TouchableOpacity = styled.TouchableOpacity``;

export default Action;
