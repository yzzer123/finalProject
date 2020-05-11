import  React, { useState } from 'react';
import './global';
import { 
  View,
  StatusBar
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import  FontIcon  from 'react-native-vector-icons/FontAwesome';
import  FounIcon  from 'react-native-vector-icons/Foundation';
import IssueScreen from './pages/issue/issuepage';
import TutorialScreen from './pages/tutorial/tutorialpage';
import UserScreen from './pages/user/userpage';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './components/login/Login';
// Bottom Tabs
const Tab = createBottomTabNavigator();

const _reqdata=async(setStatus)=>{
  AsyncStorage.setItem(global.login,'False')
  let value= await AsyncStorage.getItem(global.login)
  if(value==='False')
    setStatus(false)
  else
   setStatus(true)
}

const App=()=>{
  let [status,setStatus]=useState(false)
  _reqdata(setStatus)
    return(
      <>
      {
        status===true?
        <NavigationContainer>
          <Tab.Navigator
            
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                // different icons for each tab
                if (focused){
                  size = 30
                }
                if (route.name === 'Tutorial') {
                        
                    return <FontIcon name={"book"} size={size} color={color}/>
                  } else if (route.name === 'Issue') {
                    return <FounIcon name={"comments"} size={size} color={color}/>
                  } else if (route.name === 'User'){
                    return <FontIcon name={"user"} size={size} color={color}/>        
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: global.gColor.themeColor,
              inactiveTintColor: '#C0C0C0',
            }}
            animationEnabled={true}
            swipeEnabled={true}
          >
            {/* the three main screens in home screen */}
            <Tab.Screen name="Tutorial" component={TutorialScreen}  />
            <Tab.Screen name="Issue" component={IssueScreen} />
            <Tab.Screen name="User" component={UserScreen} />
            </Tab.Navigator>
          </NavigationContainer>
          :
          <Login Set={[status,setStatus]} />
      }
      </>
    )
}

export default App