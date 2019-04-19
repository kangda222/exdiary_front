import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
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
                <TextInput style={{width:'70%', marginRight:17}} placeholder='제목을 입력해주세요' value={this.state.title} name='title' onChangeText={(text) => this.setState({title:text})}></TextInput>
                <Button style={styles.button} title='저장'/>
            </View>
            <View style={styles.line}></View> 
            <View>
                
            </View>
        </View>
    )}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        width:40,
        height:25,
        backgroundColor:'powderblue',
        borderRadius: 10,
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
