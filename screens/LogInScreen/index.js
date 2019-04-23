import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LogInScreen = () => (
  <View style={styles.container}>
    <Text>LogInScreen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LogInScreen;
