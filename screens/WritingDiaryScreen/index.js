import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';


const diaryList = false;

export default class WritingDiaryScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:''
        }
    }

    render(){
        return (<View styles={styles.container}>
            <View style={{flexDirection:'row', padding:5}}>
                <Text style={{padding:10}}>제목 : </Text>
                <TextInput placeholder='제목을 입력해주세요' value={this.state.title} name='title' onChangeText={(text) => this.setState({title:text})}></TextInput>
            </View>
            <View style={styles.line}></View> 
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
    )}
};

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
