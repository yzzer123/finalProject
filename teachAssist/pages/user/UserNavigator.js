import React,{Component} from 'react';
import{
    Text,
    View,
    Image,
    TouchableOpacity,
    Vibration,
    Dimensions,
    Alert
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import FIcon from 'react-native-vector-icons/Feather'
import styles from './styles';
import functions from './UserFunctions';
const width =Dimensions.get('window').width

const Set = createStackNavigator()
const SetHome=({navigation})=>{
    return(
        <View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>
                Alert.alert(
                    'SIGNOUT PROMPT',
                    'Are you sure to log out?',
                [
                    { text:'cancel',onPress:()=>{}},
                    { text:'sure',onPress:() => navigation.navigate('UserHome')}
                ],
                    {cancelable:true})}>
                <Text style={{color:'black' ,backgroundColor:'white',width:width,fontSize:20,textAlign:'center'}}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>
                Alert.alert(
                    'CLEAR CACHE',
                    'The action will clear all local data,go on?',
                [
                    { text:'cancel',onPress:()=>{}},
                    { text:'sure',onPress:() => navigation.navigate('UserHome')}
                ],
                    {cancelable:true})}>
                <Text style={{color:'red' ,backgroundColor:'white',width:width,fontSize:20,textAlign:'center'}}>Clear Cache</Text>
            </TouchableOpacity>
        </View>
    )
}
const favourite=({navigation})=>{
    return(
        <View>
            <Text  style={{textAlign:'center'}} onPress={()=>navigation.navigate('UserHome')}>favourite</Text>
        </View>
    )
}

const tag=({navigation})=>{
    return(
        <View>
            <Text style={{justifyContent:'center',textAlign:'center'}} onPress={()=>navigation.navigate('UserHome')}>tag</Text>
        </View>
    )
}

const read_time=({navigation})=>{
    return(
        <View>
            <Text onPress={()=>navigation.navigate('UserHome')}>read_time</Text>
        </View>
    )
}

const history=({navigation})=>{
    return(
        <View>
            <Text onPress={()=>navigation.navigate('UserHome')}>history</Text>
        </View>
    )
}

const setting=({navigation})=>{
    return(
        <Set.Navigator>
            <Set.Screen name='SetHome' component={SetHome} options={{headerShown:false}} />
        </Set.Navigator>
    )
}

const about_us=({navigation})=>{
    return(
    <View>
        <View>
            <Image source={require('./image/Learning.png')} style={{marginLeft:104}}/>
            <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Teaching-Assistant</Text>
            <Text style={{textAlign:'center'}}>V 1.0.0</Text>
        </View>
        <View style={[styles.containStyle,{marginTop:10}]}>
            <View style={styles.leftViewStyle}>
                <SIcon name='people' color='#33a3dc' style={styles.leftImgStyle} size={26} />
                <Text style={{fontSize:20,marginLeft:10,backgroundColor:'white',height:30}}>Developers:  Yzzer&Dzper</Text>
            </View>
        </View>
        <View style={styles.containStyle}>
            <View style={styles.leftViewStyle}>
                <FIcon name='book-open' color='#b76f40' style={styles.leftImgStyle} size={26} />
                <Text style={{fontSize:20,marginLeft:10,backgroundColor:'white',height:30}}>Purpose:</Text>
            </View>
        </View>
        <Text style={{backgroundColor:'white',fontSize:18}}>      The App is to help students to learn  some 
         difficult courses,which are taught in English,
        such as python, React-native and so on. 
        </Text>
</View>
    )
}

export {favourite,tag,read_time,history,setting,about_us}