import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => (
  <View style={styles.container}>
    <Calendar />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  }
});

export default CalendarScreen;
