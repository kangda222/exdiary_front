import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

// 일기 리스트 목록 그리기 
const DiarylistScreen = props => (
  <View style={{alignItems:'center',justifyContent:'center'}}>
    <Text style={styles.titleFont}>{props.diary_title}</Text>
    {props.diaryList.length !== 0 ?
      (<>
        <FlatList
          data={props.diaryList}
          keyExtractor={item => item.page_num.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPressOut={() => {
              props.getDiaryContents(item.diary_num.toString(), item.page_num.toString());
              props.navigation.navigate("DiaryContentsScreen", {
                title: item.title,
                write_date: item.write_date,
                nickname: item.nickname,
                page_num: item.page_num,
                diary_num: item.diary_num
              });
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>{item.title} </Text>
                <Text>{item.write_date.substring(0, 10)}</Text>
              </View>
              {props.diary_type == 'exchange' && userlist.length > 0 ?
                <View>
                  <Text>{props.userlist}</Text>
                  <Text>함께 할 친구를 추가하세요!</Text>
                </View>
                : null
              }
            </TouchableOpacity>
          )}
        />
      </>) : (<>
        <Card containerStyle={{
          borderRadius: 5,
          borderWidth: 3,
          borderStyle: 'dashed',
          width: '80%',
          height: '80%'
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '45%' }}>
            {props.diary_type == 'default' ? <Text style={styles.addFont}>당신의 일기를 추가하세요!</Text> : <Text style={styles.addFont}>친구와의 교환일기를 추가하세요!</Text>}
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPressOut={() => {
                props.navigation.navigate("WritingDiaryScreen", {
                  diary_num: props.diary_num,
                });
              }}>
              <Feather name={"plus-circle"} size={35} color='grey' />
            </TouchableOpacity>
          </View>
        </Card>
      </>)
    }

  </View>
);

const styles = StyleSheet.create({
  titleFont: {
    paddingTop: 10,
    fontSize: 23,
    fontWeight: "900",
    color: '#263238',
  },
  addFont: {
    color: 'grey', fontWeight: 'bold', fontSize: 18
  }
})

export default DiarylistScreen;
