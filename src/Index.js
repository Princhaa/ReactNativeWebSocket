import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import KeyboardSpacer from './components/KeyboardSpacer'
import ChatBubble from './components/ChatBubble';
var _scrollView;
export default class Index extends Component{
    constructor(){
        super();
        this.state = {
            text: '',
            chats: [],
            messageOwner: []
        }
        this.onReceivedMessage = this.onReceivedMessage.bind(this)
        this.socket = SocketIOClient('https://an-friendly-chat.herokuapp.com/');
        this.socket.on('chat message', this.onReceivedMessage);
    }

    onReceivedMessage(messages){
        // if (messages == this.state.chats[this.state.chats.length-1]){
            this.setState({chats: [...this.state.chats, messages]});
            this.setState({messageOwner: [...this.state.messageOwner, false]});
        // }
    }

    sendMessage(value){
        this.setState({text: ''})
        this.setState({chats: [...this.state.chats, value]});
        this.setState({messageOwner: [...this.state.messageOwner, true]});
        this.socket.emit('chat message', value);
    }

    render(){
        let chats = this.state.chats.map((r, i) => {
            return(
                <ChatBubble key = {i} ownMessage = {this.state.messageOwner[i]} text = {this.state.chats[i]}/>
            )
        })
        return(
            <View style = {{flexDirection: 'column', flex: 1, marginTop: 50}}>
                <View style = {{backgroundColor : '#AAA1', flex: 9}}>
                    <ScrollView ref = {(scrollView) => {_scrollView = scrollView}}>
                        {chats}
                    </ScrollView>
                </View>
                <View style = {{backgroundColor: '#5551', flexDirection: 'row', height: 65}}>
                    <View style = {{flex: 1, padding: 10, flexDirection: 'row'}}>
                        <TextInput style = {{flex: 4}} placeholder = 'Enter text' onChangeText = {(text) => this.setState({text: text})} value = {this.state.text}/>
                        <TouchableOpacity style = {{backgroundColor: 'rgb(0,122,204)', flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}
                                            onPress = {() => this.sendMessage(this.state.text)}>
                            <Text style = {{color: 'white'}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}