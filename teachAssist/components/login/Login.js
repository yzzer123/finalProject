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
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
const _savedata=async()=>{
    AsyncStorage.setItem(global.login,'True')
}
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            UserName:'',
            PassWord:''
        }
    }
    User={
        UserName:global.user.username,
        PassWord:global.user.password
    }
    _reqdata2=async(setStatus)=>{
        let value= await AsyncStorage.getItem(global.login)
        this.props.Set[1](value)
        
      }
    Judge(){
        if(this.state.PassWord==this.User.PassWord){
            AsyncStorage.setItem(global.login,'True')
            ToastAndroid.show(`${this.state.UserName},${this.state.PassWord}`,ToastAndroid.SHORT)
            this._reqdata2()
            console.log(this.props.Set[0])
        }
        else
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

            <>
                    <View style={styles.container}>
                        <Image source={require('./image/avatar.jpg')} style={styles.image} />
                        <Text style={styles.textinput}>{this.User.UserName}</Text>
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
                    </View>
            </>
        )
    }
}

export default Login
