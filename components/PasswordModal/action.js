import React, { Component } from "react";
import Modal from "react-native-modal";
import { Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

class Action extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    password: "",
    isSubmitting: false,
    isCorrect: true
  };

  static propTypes = {
    checkPassword: PropTypes.func.isRequired,
    isCorrect: PropTypes.bool
  };

  render() {
    //console.log(width, height);
    return (
      <Modal
        isVisible={this.props.isVisiblePassword}
        onBackdropPress={() => this._reset()}
      >
        <Container>
          <Text>비밀번호 변경!!</Text>
          <TextInput
            placeholder="Password"
            autoCapitalize={"none"}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this._changePassword}
            //onSubmitEditing={props.submit}
          />
          {!this.state.isCorrect ? <Text>불일치</Text> : null}
          <Button
            title="확인"
            onPress={() => this._submit(this.state.password)}
          />
          <Button title="취소" onPress={() => this._reset()} />
        </Container>
      </Modal>
    );
  }

  _changePassword = text => {
    this.setState({ password: text });
  };

  _submit = async password => {
    const isCorrect = await this.props.checkPassword(password);
    console.log(`isCorrect :: ${isCorrect}`);
    if (isCorrect) {
      this.setState({ isCorrect: true });
    } else {
      this.setState({ isCorrect: false });
    }
  };

  _reset = () => {
    this.setState({ password: "" });
    this.props.toggleModal();
  };
}

const Container = styled.View`
  background-color: #fff;
`;

const Text = styled.Text``;

const TextInput = styled.TextInput``;

const Button = styled.Button``;

export default Action;
