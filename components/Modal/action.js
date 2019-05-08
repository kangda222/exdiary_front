import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileModal from "../ProfileModal";
import PasswordModal from "../PasswordModal";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

class Action extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  state = {
    isVisibleProfile: false,
    isVisiblePassword: false
  };

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => this.props.toggleModal()}
        onSwipeComplete={() => this.props.toggleModal()}
        swipeDirection="right"
      >
        <Container>
          <Profile>
            <Ionicons name="ios-contact" size={50} />
            <Username>{this.props.username}</Username>
          </Profile>
          <TouchableOpacity onPressOut={() => this._toggleProfileModal()}>
            <Menu>프로필 설정</Menu>
            <ProfileModal
              isVisibleProfile={this.state.isVisibleProfile}
              toggleProfileModal={this._toggleProfileModal}
              username={this.props.username}
            />
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => this._togglePasswordModal()}>
            <Menu>비밀번호 변경</Menu>
            <PasswordModal
              isVisiblePassword={this.state.isVisiblePassword}
              toggleModal={this._togglePasswordModal}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu>좋아요</Menu>
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu>회원탈퇴</Menu>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => this._Alert()}>
            <Menu>로그아웃</Menu>
          </TouchableOpacity>
        </Container>
      </Modal>
    );
  }

  _Alert = () =>
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "확인", onPress: this._logout() }
    ]);

  _toggleProfileModal = () => {
    console.log(this.state.isVisibleProfile);
    this.setState({ isVisibleProfile: !this.state.isVisibleProfile });
  };

  _togglePasswordModal = () => {
    console.log(this.state.isVisiblePassword);
    this.setState({ isVisiblePassword: !this.state.isVisiblePassword });
  };

  _logout = () => {
    this.props.toggleModal();
    this.props.logout();
  };
}

const Container = styled.View`
  background-color: #fff;
  height: ${height};
  width: ${width * (2 / 3)};
  margin-left: ${width * (1 / 3)};
`;

const Profile = styled.View`
  flex-direction: row;
  margin: ${STATUSBAR_HEIGHT}px 2px 2px;
`;

const Username = styled.Text`
  font-weight: 500;
  font-size: 25;
  margin-left: 10;
`;

const Menu = styled.Text``;

export default Action;
