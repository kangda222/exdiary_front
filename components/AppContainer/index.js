import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import RootNavigation from "../../navigation/RootNavigation";

const AppContainer = () => (
  <View style={styles.container}>
    <StatusBar hidden={false} />
    <RootNavigation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default AppContainer;
