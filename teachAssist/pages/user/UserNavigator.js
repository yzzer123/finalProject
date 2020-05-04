import React,{Component} from 'react';
import{
    Text,
    View,
    Image,
    TouchableOpacity,
    Vibration
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './styles';

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
            <Text onPress={()=>navigation.navigate('UserHome')}>tag</Text>
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
        <View>
            <Text onPress={()=>navigation.navigate('UserHome')}>setting</Text>
        </View>
    )
}

const about_us=({navigation})=>{
    return(
        <View >
            <Text onPress={()=>navigation.navigate('UserHome')}>About us</Text>
        </View>
    )
}

export {favourite,tag,read_time,history,setting,about_us}
