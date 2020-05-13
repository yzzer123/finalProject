// 2018170056 2020-4-26
import  React,{useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StatusBar
}from 'react-native';
import styles from './styles'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import UserPages from './UserPages';
import {CoTitle,RedTitle,HisTitle,SetTitle,AboTitle, ColTitle} from './UserHeaderTitle'
import {collect,read_time,history,setting,about_us} from './UserNavigator'
import ArticlePage from '../article/article'

const User = createStackNavigator()


const UserScreen = ({navigation})=>{
    [barState,setBarState]=useState(true)
    useEffect(() => {  // when focus
        const unsubscribe = navigation.addListener('focus', () => {
        
          StatusBar.setBackgroundColor(global.gColor.themeColor);
          StatusBar.setTranslucent(true)
          StatusBar.setBarStyle("light-content");
          
        });
    
        return unsubscribe;
      });
      useEffect(()=>{ 
        navigation.setOptions({tabBarVisible: barState}); 
       
    },[barState]) 
    const setrealHide = (bool)=>{
        navigation.setOptions({tabBarVisible: bool});
    }
   global.setHide = setBarState;
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
            <User.Screen name='UserHome' component={UserPages} options={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>
            <User.Screen name='Collect' component={collect} 
                                        initialParams={{
                                            stackNavigation:navigation,
                                        }}
                                        options={{ headerTitle: props => <CoTitle {...props} /> ,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>
            <User.Screen name ='Reading-time' component={read_time} options={{ headerTitle: props => <RedTitle {...props} /> ,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} /> 
            <User.Screen name ='History' component={history}
                                                        initialParams={{
                                                            stackNavigation:navigation,
                                                        }}
            options={{ headerTitle: props => <HisTitle {...props} /> ,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} /> 
            <User.Screen name='Setting' component={setting} options={{ headerTitle: props => <SetTitle {...props} /> ,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} />
            <User.Screen name ='About-us' component={about_us} options={{ headerTitle: props => <AboTitle {...props} />,cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }} />  
            <User.Screen 
                name="ArticleScreen"
                component={ArticlePage}
                options={{
                    headerShown:false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialParams={{
                    setHide:setrealHide,
                    getbarState:barState,
                }}
            />
        </User.Navigator>
    )

}

export default UserScreen;