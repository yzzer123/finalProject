// 2018170056 2020-4-26
import  React from 'react';
import {
    View,
    ScrollView,
}from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserPages from './UserPages';
import {favourite,tag,read_time,history,setting,about_us} from './UserNavigator'

const User = createStackNavigator()

const UserScreen = ({navigation})=>{

    return (
        <>
        <User.Navigator>
            <User.Screen name='UserHome' component={UserPages} options={{headerShown:false}}/>
            <User.Screen name='Favourite' component={favourite} />
            <User.Screen name ='Tag' component={tag} />
            <User.Screen name ='Reading-time' component={read_time} /> 
            <User.Screen name ='History' component={history} /> 
            <User.Screen name='Setting' component={setting} />
            <User.Screen name ='About-us' component={about_us} />  
        </User.Navigator>
        </>
    )

}

export default UserScreen;