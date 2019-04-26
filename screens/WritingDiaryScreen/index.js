import React, {Component} from 'react';
import {StyleSheet,Text, View,Keyboard, Button, TouchableWithoutFeedback, KeyboardAvoidingView,Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import  CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles} from "react-native-cn-richtext-editor";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuContext,
    MenuProvider,
    renderers
  } from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const defaultStyles = getDefaultStyles();

export default class WritingDiaryScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            title: this.title,           
            height: this.height,
            //편집기 관련 
            selectedTag : 'body',
            selectedStyles : [],
            contents: [getInitialObject()]
        };
        this.editor = null;
    }

    onStyleKeyPress = (toolType) => {
        this.editor.applyToolbar(toolType);
    }
 
    onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }
 
    onSelectedStyleChanged = (styles) => { 
        this.setState({
            selectedStyles: styles,
        })
    }
    
    // 텍스트 입력 시 
    onValueChanged = (value) => {

        /*
        value 데이터 형태 
        value = [{
            "id":"y0Jek8b7X",
            "component":"text",
            "content":[{'id':'EdaYCD42Q',
                        'text':'T',
                        'len':1,
                        'stype':[],
                        'styleList':[{"fontSize":20}],'tag':'body','NewLine':true
        }]}]
        
        형태로 쌓여나간다. 
        */
        this.setState({
            contents: value
        });
    }

    save = () => {
        
    }

    // 이미지 추가 버튼 클릭 시 나타나는 Selector 
    renderImageSelector() {
        return (
            <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
            <MenuTrigger>
                <Ionicons name="ios-image" size={28} color="#737373" />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1}>
                    <Ionicons name='ios-camera' size={30} style={{paddingRight:10}}/>,
                </MenuOption>
                <View style={styles.divider}/>
                <MenuOption value={2} >
                    <Text style={styles.menuOptionText}>
                        Photo Library
                    </Text>
                </MenuOption> 
                <View style={styles.divider}/>
                <MenuOption value={3}>
                    <Text style={styles.menuOptionText}>
                        Cancel
                    </Text>
                </MenuOption>
            </MenuOptions>
            </Menu>
        );
    }

    // 폰트 선택 시 폰트 사이즈 설정 
    renderFontSizeSelector() {
        return (
            <Menu renderer={SlideInMenu} >
                <MenuTrigger>
                    <Text style={styles.toolbarButton}>F</Text>
                </MenuTrigger>
                <MenuOptions style={{flexDirection:'row'}}>
                    <MenuOption value={1}>
                        <Text style={styles.menuOptionText}>15</Text>
                    </MenuOption>
                    <View style={styles.divider}/>
                    <MenuOption value={2} >
                        <Text style={styles.menuOptionText}>16</Text>
                    </MenuOption> 
                    <View style={styles.divider}/>
                    <MenuOption value={3}>
                        <Text style={styles.menuOptionText}>19</Text>
                    </MenuOption>
                    <MenuOption value={4}>
                        <Text style={styles.menuOptionText}>24</Text>
                    </MenuOption>
                    <MenuOption value={5}>
                        <Text style={styles.menuOptionText}>30</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }

    onRemoveImage = ({url, id}) => {        
        // do what you have to do after removing an image
        console.log(`image removed (url : ${url})`);      
    }

    insertImage(url) {        
        this.editor.insertImage(url);
    }

    render(){
      return (       
        <MenuProvider style={styles.container}>
            <View style={{flexDirection:'row', padding:5}}>
                <Text style={{padding:5, fontSize:15}}>제목 : </Text>
                <TextInput placeholder='제목을 입력해주세요' value={this.state.title} name='title' maxLength={50}
                style={{width:'70%', marginRight:13, fontSize:15}}
                onChangeText={(text) => this.setState({title:text})}/>
                <Button style={styles.button} title='저장' onPress={this.save.bind(this)}/>
            </View>         
            
            <View style={styles.line}></View> 
            
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80} style={styles.editorArea}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
                    <View style={styles.main}>
                        <CNRichTextEditor                   
                            ref={input => this.editor = input}
                            onSelectedTagChanged={this.onSelectedTagChanged}
                            onSelectedStyleChanged={this.onSelectedStyleChanged}
                            value={this.state.contents}
                            style={{ backgroundColor : '#fff'}}
                            styleList={defaultStyles}
                            onValueChanged={this.onValueChanged}
                            onRemoveImage={this.onRemoveImage}
                        />                        
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <CNToolbar
                        size={28}
                        bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
                        italic={<Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>}
                        underline={<Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>}
                        lineThrough={<Text style={[styles.toolbarButton, styles.lineThroughButton]}>S</Text>}
                        body={<Text style={styles.toolbarButton}>T</Text>}
                        title={this.renderFontSizeSelector()}
                        ul={<Text style={styles.toolbarButton}>ul</Text>}
                        ol={<Text style={styles.toolbarButton}>ol</Text>}
                        image={ <Ionicons name="ios-image" size={28} color="#737373" />}     
                        selectedTag={this.state.selectedTag}
                        selectedStyles={this.state.selectedStyles}
                        onStyleKeyPress={this.onStyleKeyPress} />
                </View>
            </KeyboardAvoidingView>
        </MenuProvider>
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
