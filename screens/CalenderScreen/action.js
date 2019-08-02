import React, { Component } from "react";
import CalenderScreen from "./screen";
import PropTypes from "prop-types";

class Action extends Component {
  static propTypes = {
    diaryListCal: PropTypes.array,
    myDNum: PropTypes.number,
    exDNum: PropTypes.number,
    exDiary: PropTypes.array,
    getDiaryListForCal: PropTypes.func.isRequired
  };
  render() {
    // console.log(`calender!!!!!!!!!!!!!!!!!!!!!!`);
    // console.log(this.props);
    return <CalenderScreen {...this.props} markedDates={this._markedDates} />;
  }
  _markedDates = () => {
    const mydiary = { key: "mydiary", color: "red" };
    const exdiary01 = { key: "exdiary01", color: "blue" };
    const exdiary02 = { key: "exdiary02", color: "green" };
    const exdiary03 = { key: "exdiary03", color: "pink" };
    //console.log(this.props.diaryListCal);
    // console.log(this.props.myDNum);
    //console.log(this.props.exDNum);
    //console.log(this.props.exDiary);
    const dates = {};
    const exdiaryNum = {};
    for (let i = 0; i < this.props.exDNum; i++) {
      exdiaryNum[i] = this.props.exDiary[i].diary_num;
    }
    //console.log("///////////////////exdiaryNum////////////////");
    //console.log(exdiaryNum);
    this.props.diaryListCal.forEach(element => {
      //console.log(element.diary_type);
      if (element.diary_type === "default") {
        if (dates[element.write_date.substring(0, 10)]) {
          dates[element.write_date.substring(0, 10)].dots.push(mydiary);
        } else {
          dates[element.write_date.substring(0, 10)] = {
            dots: [mydiary]
          };
        }
      } else {
        if (dates[element.write_date.substring(0, 10)]) {
          for (let i = 0; i < this.props.exDNum; i++) {
            if (exdiaryNum[i] === element.diary_num) {
              if (i === 0) {
                dates[element.write_date.substring(0, 10)].dots.push(exdiary01);
                break;
              } else if (i === 1) {
                dates[element.write_date.substring(0, 10)].dots.push(exdiary02);
                break;
              } else {
                dates[element.write_date.substring(0, 10)].dots.push(exdiary03);
                break;
              }
            }
          }
        } else {
          for (let i = 0; i < this.props.exDNum; i++) {
            if (exdiaryNum[i] === element.diary_num) {
              if (i === 0) {
                dates[element.write_date.substring(0, 10)] = {
                  dots: [exdiary01]
                };
                break;
              } else if (i === 1) {
                dates[element.write_date.substring(0, 10)] = {
                  dots: [exdiary02]
                };
                break;
              } else {
                dates[element.write_date.substring(0, 10)] = {
                  dots: [exdiary03]
                };
                break;
              }
            }
          }
        }
      }
    });
    //console.log("#######################");
    //console.log(dates);
    return dates;
  };
}

export default Action;
