import React, { Component } from "react";
import CalenderScreen from "./screen";
import PropTypes from "prop-types";

class Action extends Component {
  static propTypes = {
    diaryListCal: PropTypes.array,
    myDNum: PropTypes.number,
    exDNum: PropTypes.number,
    getDiaryListForCal: PropTypes.func.isRequired
  };
  render() {
    // console.log(`calender!!!!!!!!!!!!!!!!!!!!!!`);
    // console.log(this.props);
    return <CalenderScreen {...this.props} markedDates={this._markedDates} />;
  }
  _markedDates = () => {
    const vacation = { key: "vacation", color: "red" };
    const massage = { key: "massage", color: "blue" };
    const workout = { key: "workout", color: "green" };
    // console.log(this.props.diaryListCal);
    // console.log(this.props.myDNum);
    // console.log(this.props.exDNum);
    const dates = {};
    this.props.diaryListCal.forEach(element => {
      dates[element.write_date.substring(0, 10)] = {
        marked: true,
        dotColor: "red"
      };
    });
    //console.log(dates);
    return dates;
  };
}

export default Action;
