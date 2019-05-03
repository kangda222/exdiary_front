import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

class Action extends Component {
  constructor(props) {
    super(props);
  }

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
          <Menu>프로필 설정</Menu>
          <Menu>비밀번호 변경</Menu>
          <Menu>좋아요</Menu>
          <Menu>회원탈퇴</Menu>
          <Menu>로그아웃</Menu>
        </Container>
      </Modal>
    );
  }
}

const Container = styled.View`
  background-color: #fff;
  height: ${height};
  width: ${width * (2 / 3)};
  margin-left: ${width * (1 / 3)};
`;

const Profile = styled.View`
  margin: ${STATUSBAR_HEIGHT}px 2px 2px;
`;

const Username = styled.Text``;

const Menu = styled.Text``;

export default Action;
