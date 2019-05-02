import React, { Component } from "react";
import WritingDiaryScreen from './screen'
import {getInitialObject} from "react-native-cn-richtext-editor";
import {ImagePicker} from 'expo';

class Action extends Component{

    constructor(props){
       super(props);
        this.state = {
            title: '',  
            focused_title:'',
            image:null,
            isModalVisible:null,
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
                focused={this._focused}
                unfocused={this._unfocused}
                toggleModal={this._toggleModal}
        />
        
        );
    }
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      }

    _focused = () => {
        this.setState({
            focused_title : true
        })
    }

    _unfocused = () => {
        this.setState({ 
            focused_title : false
        })
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

    _pickImage = async() => {
        alert('사진 고릅시다')
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect: [4, 3],
        });

        if(!result.cancelled){
            this.setState({image:result.uri})
        }
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