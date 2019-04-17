import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DiaryboxScreen = () => (
  <View style={styles.container}>
    <Text>DiaryboxScreen</Text>
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

export default DiaryboxScreen;
