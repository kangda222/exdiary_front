import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const diaryList = false;

const WritingDiaryScreen = () => (
    <View styles={styles.container}>
        <View style={{flexDirection:'column', padding:5}}>
            <Text style={{padding:10}}>나의 일기</Text>
            <View style={styles.line}></View> 
        </View>
        <View>
            { !diaryList ? // 일기 리스트가 존재하지 않으면
                <View style={styles.container2}>
                    <Text style={styles.text}>일기를 작성해봅시다!</Text>
                    <Ionicons name='ios-add-circle-outline' size={50} onPress={()=>alert('일기쓰러가자')}/>
                </View>
                : <Text> 일기장에 해당하는 일기 리스트를 보여주도록 개발 </Text>
            }
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:'33%'
    },
    line: { 
        backgroundColor:'powderblue',
        height:2,
        width:'95%',
        marginLeft:6,
    },
    text: {
        fontSize: 35,
        fontWeight:'bold',
        padding:20
    }
});

export default WritingDiaryScreen;