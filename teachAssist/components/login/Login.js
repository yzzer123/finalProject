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
const styles=StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    image:{
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        borderRadius:40,
        marginBottom:30,
        marginTop:60

    },
    textinput:{
        textAlign:'left',
        alignSelf:'center',
        borderWidth:1,
        borderRadius:4,
        borderColor:'lightgrey',
        backgroundColor:'white',
        marginBottom:1,
        width:width*0.9,
        height:40
    },
    LoginButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'skyblue',
        borderRadius:8,
        height:35,
        width:width*0.9,
        marginBottom:20,
        marginTop:30
    },
    setting:{
        flexDirection:'row',
        width:width*0.9,
        justifyContent:'space-between'
    },
    otherway:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        left:20
    }
})
AppRegistry.registerComponent('Login', () => Login);