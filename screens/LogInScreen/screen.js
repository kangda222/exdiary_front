import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LogInScreen = props => (
  <View style={styles.container}>
    <StatusBar barStyle={"light-content"} />
    <View style={styles.header}>
      <Text>교환일기</Text>
    </View>
    <View style={styles.content}>
      <TextInput
        placeholder="Username"
        //style={styles.textInput}
        autoCapitalize={"none"}
        autoCorrect={false}
        value={props.username}
        onChangeText={props.changeUsername}
      />
      <TextInput
        placeholder="Password"
        //style={styles.textInput}
        autoCapitalize={"none"}
        secureTextEntry={true}
        value={props.password}
        onChangeText={props.changePassword}
        returnKeyType={"send"}
        onSubmitEditing={props.submit}
      />
      <TouchableOpacity onPressOut={props.submit}>
        <View style={styles.button}>
          <Text style={styles.btnText}> Log In</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.fbContainer}>
              <View style={styles.fbView}>
                  <Ionicons name="logo-facebook" size={22} color="#3E99EE" />
                  <Text style={styles.fbText}>Log in with Facebook</Text>
              </View>
          </TouchableOpacity> */}
    </View>
  </View>
);

// const LogInScreen = () => (
//   <View style={styles.container}>
//     <Text>LogInScreen</Text>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width
  },
  content: {
    flex: 4,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default LogInScreen;
