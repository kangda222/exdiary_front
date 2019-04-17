import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CalendarScreen = () => (
  <View style={styles.container}>
    <Text>CalendarScreen</Text>
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

export default CalendarScreen;
