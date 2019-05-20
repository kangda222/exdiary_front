import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CNRichTextView from "react-native-cn-richtext-editor/src/CNRichTextView";

// 일기 내용 보여주기 
const DiaryContentsScreen = props => (
    <View style={styles.main}>
        <View style={{ flexDirection: 'row' }}>
            <Text>제목 : {props.title} </Text>

            <Text>작성일 : {props.write_date.substring(0,10)} </Text>

            <Text>닉네임 : {props.nickname} </Text>
        </View>
        <CNRichTextView
            text={props.diaryContent}
            style={{ flex: 1 }} />
        <View>
            <TouchableOpacity onPressOut={props.changeContent}><Text>삭제</Text></TouchableOpacity>
            <TouchableOpacity onPressOut={props.deleteContent}><Text>수정</Text></TouchableOpacity>
        </View>
    </View>
);

DiaryContentsScreen.prototypes = {

};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
})

export default DiaryContentsScreen;