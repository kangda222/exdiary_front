import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const vacation = { key: "vacation", color: "red" };
const massage = { key: "massage", color: "blue" };
const workout = { key: "workout", color: "green" };

const CalendarScreen = () => (
  <View style={styles.container}>
    <Calendar
      monthFormat={"yyyy MM"}
      markedDates={{
        "2019-07-16": { marked: true, dotColor: "red" },
        "2019-07-17": {
          dots: [vacation, massage, workout],
          selected: true
        }
        //'2019-06-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        // '2012-05-19': {disabled: true, disableTouchEvent: true}
      }}
      markingType={"multi-dot"}
      onDayPress={day => {
        console.log("selected day", day);
      }}
      onMonthChange={month => {
        console.log("month changed", month);
      }}
    />
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
