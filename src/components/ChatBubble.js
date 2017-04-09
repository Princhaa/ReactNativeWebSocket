import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ChatBubble extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var backgroundColor;
        var alignSelf;
        var textColor;
        if (this.props.ownMessage){
            backgroundColor = 'rgb(31,202,79)';
            alignSelf = 'flex-end';
            textColor = 'white'
        } else {
            backgroundColor = '#DDD';
            alignSelf = 'flex-start';
            textColor = 'black'
        }
        return(
            <View style = {{backgroundColor: backgroundColor, maxWidth: 250, padding: 10, margin: 10, borderRadius: 10, alignSelf: alignSelf}}>
                <Text style = {{color: textColor}}>{this.props.text}</Text>
            </View>
        )
    }
}