import React from 'react';
import {StyleSheet,Text, View,Keyboard,TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView,Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TextInput} from 'react-native-gesture-handler';
import  CNRichTextEditor , { CNToolbar,  getDefaultStyles} from "react-native-cn-richtext-editor";


const defaultStyles = getDefaultStyles();

const WritingDiaryScreen = props => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 15 }}>제목 : </Text>
                <TextInput placeholder='제목을 입력해주세요' value={props.title} name='title' maxLength={50}
                    style={{ width: '70%', marginRight: 13, fontSize: 15 }}
                    onChangeText={props.onTitleChanged}
                    onFocus={props.focused}
                    onEndEditing={props.unfocused}
                   />
                <TouchableOpacity style={styles.button} onPressOut={props.save}><Text>저장</Text></TouchableOpacity>
            </View>

            <View style={styles.line}></View>
            
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : null} keyboardVerticalOffset={80} style={styles.editorArea}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.main}>
                    <CNRichTextEditor
                    ref={props.inputEditor}
                    onSelectedTagChanged={props.onSelectedTagChanged}
                    onSelectedStyleChanged={props.onSelectedStyleChanged}
                    value={props.contents}
                    style={{backgroundColor: '#fff' }}
                    styleList={defaultStyles}
                    onValueChanged={props.onValueChanged}
                    onRemoveImage={props.onRemoveImage}
                    />
                </View>
                </TouchableWithoutFeedback>
                <View>
                    {props.focused_title ? 
                        null : 
                        <CNToolbar
                        size={28}
                        bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
                        italic={<Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>}
                        underline={<Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>}
                        lineThrough={<Text style={[styles.toolbarButton, styles.lineThroughButton]}>S</Text>}
                        body={<Text style={styles.toolbarButton}>T</Text>}
                        ul={<Text style={styles.toolbarButton}>ul</Text>}
                        ol={<Text style={styles.toolbarButton}>ol</Text>}
                        image={<Ionicons name="ios-image" size={28} color="#737373" onPress={props.toggleModal}/>}
                        selectedTag={props.selectedTag}
                        selectedStyles={props.selectedStyles}
                        onStyleKeyPress={props.onStyleKeyPress} />
                } 
                </View>
            </KeyboardAvoidingView>
            {props.isModalVisible ?
                <View style={{ height: '40%' }}>
                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 50, }}>
                        <Text>갤러리</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 50, }}>
                        <Text>카메라</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity
                        onPressOut={props.toggleModal}
                        style={{ alignSelf: 'center', marginTop: 50, }}>
                        <Text>취소</Text>
                    </TouchableOpacity>
                </View> : null 
            }
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        width:40,
        height:30,
        backgroundColor:'powderblue',
        borderRadius: 10,
        alignItems:'center', justifyContent:'center'
    },
    line: { 
        backgroundColor:'powderblue',
        height:2,
        width:'95%',
        marginLeft:6,
        marginBottom:10
    },
    text: {
        fontSize: 35,
        fontWeight:'bold',
        padding:20
    },
    // 편집기 관련 CSS 
    editorArea: {
        flex: 1,
        backgroundColor:'#eee',
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
    },
    main: {
        flex: 1,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    toolbarButton: {
        fontSize: 20,
        width: 28,
        height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic'
    },
    boldButton: {
        fontWeight: 'bold'
    },
    underlineButton: {
        textDecorationLine: 'underline'
    },
    lineThroughButton: {
        textDecorationLine: 'line-through'
    },
});

export default WritingDiaryScreen;