import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  Alert
} from 'react-native';

import styles from './styles';

const width = Dimensions.get('window').width
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            UserName:'',
            PassWord:''
        }
    }
    User={
        UserName:'Dzp',
        PassWord:'12345'
    }
    Judge(){
        if(this.state.UserName==this.User.UserName&&this.state.PassWord==this.User.PassWord){
            ToastAndroid.show(`${this.state.UserName},${this.state.PassWord}`,ToastAndroid.SHORT)
        }
        el
            ToastAndroid.show(`Login failed`,ToastAndroid.SHORT)
        }
    login(){
        Alert.alert(
            'LOGIN PROMPT',
            'CONFIRM ACCOUNT NUMBWE AND PASSWORD',
            [
                { text:'cancel',onPress:()=>{}},
                { text:'sure',onPress:()=>{this.Judge()}}
            ],
            {cancelable:true});
    }
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('./image/avatar.jpg')} style={styles.image} />
                <TextInput 
                    placeholder={'User'} 
                    style={styles.textinput}
                    onChangeText = {(UserName)=> this.setState({UserName})}
                />
                <TextInput 
                    placeholder={'Password'} 
                    secureTextEntry = {true} 
                    style={styles.textinput}
                    onChangeText = {(PassWord)=>this.setState({PassWord})}
                />
                <TouchableOpacity style={styles.LoginButton}
                    onPress={()=>this.login()}
                    activeOpacity={0.9}>
                    <Text style={{color:'white'}}>Login</Text>
                </TouchableOpacity>
                <View style={styles.setting}>
                        <Text>LOST PASSWORD</Text>
                        <Text>NEW USER</Text>
                    </View>
            </View>
        )
    }
}

AppRegistry.registerComponent('Login', () => Login);