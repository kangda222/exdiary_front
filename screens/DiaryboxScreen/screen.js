import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

const DiaryboxScreen = props => (
  <View style={styles.container}>
    {props.myDiary.length === 0 && props.exDiary.length === 0 ? (
      <>
        <Text>내일기</Text>
        <Text>일기를 써주세요...</Text>
        <TouchableOpacity
          onPressOut={() => props.navigation.navigate("WritingDiaryScreen")}
        >
          <Feather name={"plus-circle"} size={30} />
        </TouchableOpacity>
      </>
    ) : (
      <>
        <Text>{props.myDiary.length !== 0 ? "내일기" : ""}</Text>
        <Text>{props.exDiary.length !== 0 ? "교환일기" : ""}</Text>
      </>
    )}
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

DiaryboxScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  myDiary: PropTypes.array.isRequired,
  exDiary: PropTypes.array.isRequired
};

export default DiaryboxScreen;
