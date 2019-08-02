import React from "react";
import PropTypes from "prop-types";
import { Calendar } from "react-native-calendars";

const CalenderScreen = props => (
  <Calendar
    monthFormat={"yyyy MM"}
    markedDates={props.markedDates()}
    markingType={"multi-dot"}
    onDayPress={day => {
      console.log("selected day", day);
    }}
    // onMonthChange={month => {
    //   console.log("month changed", month);
    // }}
  />
);

export default CalenderScreen;
