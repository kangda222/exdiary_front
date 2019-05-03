import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";

class Action extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisibleProfile}
        onBackdropPress={() => this.props.toggleModal()}
      >
        <Container>
          <Text>프로필 변경!!</Text>
          <Text>이름</Text>
          <TextInput placeholder="username" value={this.props.username} />
          <Text>핸드폰번호</Text>
          <TextInput placeholder="mobile number" />
          <Text>성별</Text>
        </Container>
      </Modal>
    );
  }
}

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

export default Action;
