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
        isVisible={this.props.isVisiblePassword}
        onBackdropPress={() => this.props.toggleModal()}
      >
        <Container>
          <Text>비밀번호 변경!!</Text>
        </Container>
      </Modal>
    );
  }
}

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

export default Action;
