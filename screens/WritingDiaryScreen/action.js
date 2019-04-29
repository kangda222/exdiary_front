import React, { Component } from "react";
import {Alert, Text, View } from "react-native";
import WritingDiaryScreen from './screen'
import {getInitialObject,getDefaultStyles} from "react-native-cn-richtext-editor";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const defaultStyles = getDefaultStyles();
  
class Action extends Component{

    constructor(props){
       super(props);
        this.state = {
            title: '',           
            height: '',
            //편집기 관련 
            selectedTag : 'body',
            selectedStyles : [],
            contents: [getInitialObject()],
        };
        this.editor = null;

    }

    render() {
        return ( 
        <WritingDiaryScreen
                {...this.state}
                onStyleKeyPress={this._onStyleKeyPress}
                onSelectedTagChanged={this._onSelectedTagChanged}
                onSelectedStyleChanged={this._onSelectedStyleChanged}
                onValueChanged={this._onValueChanged}
                onTitleChanged={this._onTitleChanged}
                save={this._save}
                renderImageSelector={this._renderImageSelector}
                renderFontSizeSelector={this._renderFontSizeSelector}
                onRemoveImage={this._onRemoveImage}
                insertImage={this._insertImage}
                inputEditor={this._inputEditor}
            />
        );
    }

    _onStyleKeyPress = (toolType) => {
        this.editor.applyToolbar(toolType);
    }
 
    _onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }
 
    // 적용된 스타일 값이 넘어온다 Bold 클릭 시 styles='bold'
    _onSelectedStyleChanged = (styles) => {
        this.setState({
            selectedStyles: styles,
        })
        return this.state.selectedStyles
    }

    _inputEditor = (input) => {
        this.editor = input; 
    }
    // 텍스트 입력 시 
    _onValueChanged = (value) => {

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

    _onTitleChanged = (value) => {
        this.setState({
            title: value
        })
    }   

    // 글쓰기 저장 
    _save = () => {

    }

     // 이미지 추가 버튼 클릭 시 나타나는 Selector 
     _renderImageSelector() {
        return (
            <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
            <MenuTrigger>
                <Ionicons name="ios-image" size={28} color="#737373" />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1}>
                    <Ionicons name='ios-camera' size={30} style={{paddingRight:10}}/>,
                </MenuOption>
                <View/>
                <MenuOption value={2} >
                    <Text>
                        Photo Library
                    </Text>
                </MenuOption> 
                <View/>
                <MenuOption value={3}>
                    <Text>
                        Cancel
                    </Text>
                </MenuOption>
            </MenuOptions>
            </Menu>
        );
    }

    // 폰트 선택 시 폰트 사이즈 설정 
    _renderFontSizeSelector() {
        return (
            <Menu renderer={SlideInMenu} >
                <MenuTrigger>
                    <Text>F</Text>
                </MenuTrigger>
                <MenuOptions style={{flexDirection:'row'}}>
                    <MenuOption value={1}>
                        <Text>15</Text>
                    </MenuOption>
                    <View/>
                    <MenuOption value={2} >
                        <Text>16</Text>
                    </MenuOption> 
                    <View/>
                    <MenuOption value={3}>
                        <Text>19</Text>
                    </MenuOption>
                    <MenuOption value={4}>
                        <Text>24</Text>
                    </MenuOption>
                    <MenuOption value={5}>
                        <Text>30</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }

    _onRemoveImage = ({url, id}) => {        
        // do what you have to do after removing an image
        console.log(`image removed (url : ${url})`);      
    }

    _insertImage(url) {        
        editor.insertImage(url);
    }


}

export default Action;