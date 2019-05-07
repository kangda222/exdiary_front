import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import DiaryBox from "../../components/Diarybox";
import Modal from 'react-native-modal';
import { TextInput } from "react-native-gesture-handler";
import {CheckBox} from 'react-native-elements';

const DiaryboxScreen = props => (
  <View style={styles.container}>
    {props.myDiary.length === 0 && props.exDiary.length === 0 ? (
      <>
        <Text>내일기</Text>
        <Text>일기장을 생성 하세요</Text>
        <TouchableOpacity
          // onPressOut={() => props.navigation.navigate("WritingScreen")}
          onPressOut={props.toggleModal}
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
    {props.isModalVisible ? 
      <Modal isVisible={props.isModalVisible}
        animationInTiming={500}
        onSwipeComplete={props.toggleModal}
       >
        <View style={{ backgroundColor: 'white', alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={{marginBottom:5}}>제목</Text>
            <TextInput maxLength={20} 
                      style={styles.modalTextInput} 
                      placeholder='일기장 제목을 입력해주세요'
                      value={props.diary_title}
                      onChangeText={props.onTitleChanged}
                      />
            <Text style={{marginBottom:5}}>이 일기는..</Text>
            <TextInput multiline={true} maxLength={40} numberOfLines = {2}
              style={styles.modalTextInput} 
              placeholder='일기장에 대한 설명을 적어주세요 (최대 40자 까지 가능)'
              value={props.explanation}
              onChangeText={props.onExplanationChanged}
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>교환일기 여부</Text>
            <Switch onValueChange={props.handleToggleSwitch}
                    value={props.switchValue}
            />
          </View>
          <View style={{ flexDirection:'row'}}>
            <TouchableOpacity onPressOut={props.toggleModal}
              style={styles.modalbutton}
            >
              <Text>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={props.submitDiaryInfo}
              style={styles.modalbutton}
            >
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  modalbutton:{
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  modalTextInput:{
    width:'50%',
    borderRadius:5,
    marginBottom:2,
    marginRight:5,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },

});

DiaryboxScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  myDiary: PropTypes.array.isRequired,
  exDiary: PropTypes.array.isRequired
};

export default DiaryboxScreen;
