import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator
} from "react-native";

const SignupScreen = props => (
  <View>
    <Text>가입하기</Text>
    <TextInput
      placeholder="Email"
      autoCapitalize={"none"}
      autoCorrect={false}
      value={props.email}
      onChangeText={props.changeEmail}
    />
    <TextInput
      placeholder="Username"
      autoCapitalize={"none"}
      autoCorrect={false}
      value={props.username}
      onChangeText={props.changeUsername}
    />
    <TextInput
      placeholder="Password"
      autoCapitalize={"none"}
      secureTextEntry={true}
      value={props.password}
      onChangeText={props.changePassword}
      returnKeyType={"send"}
      onSubmitEditing={props.submit}
    />
    <TouchableOpacity onPressOut={props.submit}>
      <Text> 가입하기 </Text>
    </TouchableOpacity>
    <TouchableOpacity onPressOut={() => props.navigation.navigate("LogIn")}>
      <Text> 로그인 하기 </Text>
    </TouchableOpacity>
  </View>
);

export default SignupScreen;
