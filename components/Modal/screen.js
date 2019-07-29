import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import ProfileModal from "../ProfileModal";
import PasswordModal from "../PasswordModal";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const ModalScreen = props => (
  <Modal
    isVisible={props.isModalVisible}
    onBackdropPress={() => props.toggleModal()}
    onSwipeComplete={() => props.toggleModal()}
    swipeDirection="right"
  >
    <Container>
      <Profile>
        <Box>
          <Ionicons name="ios-contact" size={50} />
        </Box>
        <Box>
          <Username>{props.profile && props.profile.email}</Username>
        </Box>
      </Profile>
      <Content>
        <TouchableOpacity onPressOut={() => props.toggleProfileModal()}>
          <Menu>프로필 설정</Menu>
          <ProfileModal
            isVisibleProfile={props.isVisibleProfile}
            toggleProfileModal={props.toggleProfileModal}
            profile={props.profile}
          />
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => props.togglePasswordModal()}>
          <Menu>비밀번호 변경</Menu>
          <PasswordModal
            isVisiblePassword={props.isVisiblePassword}
            toggleModal={props.togglePasswordModal}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Menu>좋아요</Menu>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => props.secession()}>
          <Menu>회원탈퇴</Menu>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => props.Alert()}>
          <Menu>로그아웃</Menu>
        </TouchableOpacity>
      </Content>
    </Container>
  </Modal>
);

const Container = styled.View`
  background-color: #ef9a9a;
  height: ${height};
  width: ${width * (2 / 3)};
  margin-left: ${width * (1 / 3)};
`;

const Profile = styled.View`
  flex-direction: row;
  margin: ${STATUSBAR_HEIGHT}px 2px 2px;
`;

const Box = styled.View`
  margin-left: 2px;
  align-items: center;
  justify-content: center;
`;

const Username = styled.Text`
  font-weight: 500;
  font-size: 15;
  margin-left: 10;
`;

const Content = styled.View`
  margin-top: 10;
`;

const Menu = styled.Text`
  margin: 5px 5px;
  font-weight: 500;
  font-size: 15;
`;

export default ModalScreen;
