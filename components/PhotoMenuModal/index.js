import React, { Component } from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { ImagePicker, Permissions } from "expo";

const { width } = Dimensions.get("window");

class Action extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isShowPhotoMenu}
        onBackdropPress={() => this._reset()}
        style={{ width: width * 0.9 }}
      >
        <Container>
          <TouchableOpacity onPressOut={() => this._handleCamera()}>
            <Text>카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => this._handleCameraRoll()}>
            <Text>사진첩</Text>
          </TouchableOpacity>
        </Container>
      </Modal>
    );
  }

  _reset = () => {
    this.props.togglePhotoMenu();
  };
  _handleCamera = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        //console.log(result.uri);
        this.props.setImage(result.uri);
      }
    }
    this._reset();
  };
  _handleCameraRoll = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (!result.cancelled) {
        this.props.setImage(result.uri);
      }
    }
    this._reset();
  };
}

const Container = styled.View`
  background-color: #fff;
  flex-direction: row;
`;

const TouchableOpacity = styled.TouchableOpacity`
  width: ${(width * 0.9) / 2};
  height: 100;
  background-color: #ef9a9a;
  justify-content: center;
`;

const Text = styled.Text`
  text-align: center;
  font-weight: bold;
`;

export default Action;
