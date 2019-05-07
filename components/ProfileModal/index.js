import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

class Action extends Component {
  constructor(props) {
    console.log("profileModal ::");
    console.log(props);
    super(props);
  }

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisibleProfile}
        onBackdropPress={() => this.props.toggleProfileModal()}
      >
        <Container>
          <Text>프로필 변경!!</Text>
          <Text>이름</Text>
          <TextInput placeholder="username" value={this.props.username} />
          <Text>핸드폰번호</Text>
          <TextInput placeholder="mobile number" />
          <Text>성별</Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            onPress={value => console.log(value)}
          />
        </Container>
      </Modal>
    );
  }
}

const radio_props = [{ label: "남", value: 0 }, { label: "여", value: 1 }];

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

export default Action;
