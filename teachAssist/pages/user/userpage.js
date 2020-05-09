// 2018170056 2020-4-26
import  React,{useEffect} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StatusBar
}from 'react-native';
import styles from './styles'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserPages from './UserPages';
import {CoTitle,RedTitle,HisTitle,SetTitle,AboTitle, ColTitle} from './UserHeaderTitle'
import {collect,read_time,history,setting,about_us} from './UserNavigator'


const User = createStackNavigator()


const UserScreen = ({navigation})=>{
    useEffect(() => {  // when focus
        const unsubscribe = navigation.addListener('focus', () => {
        
          StatusBar.setBackgroundColor(global.gColor.themeColor);
          StatusBar.setTranslucent(true)
          StatusBar.setBarStyle("light-content");
          
        });
    
        return unsubscribe;
      });
    return (
        <User.Navigator 
            screenOptions={{
                headerStyle:{
                    backgroundColor:'skyblue',
                },
                headerTintColor:'white',
                headerTitleStyle:{
                    fontWeight:'bold',
                }
            }}>
            <User.Screen name='UserHome' component={UserPages} options={{headerShown:false}}/>
            <User.Screen name='Collect' component={collect} 
                                        initialParams={{
                                            stackNavigation:navigation,
                                        }}
                                        options={{ headerTitle: props => <CoTitle {...props} /> }}/>
            <User.Screen name ='Reading-time' component={read_time} options={{ headerTitle: props => <RedTitle {...props} /> }} /> 
            <User.Screen name ='History' component={history} options={{ headerTitle: props => <HisTitle {...props} /> }} /> 
            <User.Screen name='Setting' component={setting} options={{ headerTitle: props => <SetTitle {...props} /> }} />
            <User.Screen name ='About-us' component={about_us} options={{ headerTitle: props => <AboTitle {...props} /> }} />  
        </User.Navigator>
    )

}

export default UserScreen;