import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import DiaryBox from "../../components/Diarybox";

const DiaryboxScreen = props => (
  <View style={styles.container}>
    {props.myDiary.length === 0 && props.exDiary.length === 0 ? (
      <>
        <Text>내일기</Text>
        <Text>일기를 써주세요...</Text>
        <TouchableOpacity
          onPressOut={() => props.navigation.navigate("WritingScreen")}
        >
          <Feather name={"plus-circle"} size={30} />
        </TouchableOpacity>
      </>
    ) : (
      <>
        {props.myDiary.length !== 0 ? (
          <>
            <Text>내일기</Text>
            <DiaryBox {...props.myDiary[0]} />
          </>
        ) : null}
        <Text>{props.exDiary.length !== 0 ? "교환일기" : ""}</Text>
        <FlatList
          data={props.exDiary}
          keyExtractor={item => item.id.toString()}
          refreshing={props.isFetching}
          onRefresh={props.refresh}
          renderItem={({ item }) => <DiaryBox {...item} />}
        />
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
