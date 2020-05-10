import  React from 'react';
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
import {createStackNavigator} from '@react-navigation/stack';
// Bottom Tab
import Total from './Total'
import loginAss from './components/login/loginAss'
const Tot = createStackNavigator()

const App = () =>{
  return (
    <NavigationContainer>
      <Tot.Navigator>
        <Tot.Screen  name='Login' component={loginAss} options={{headerShown:false}}/>
        <Tot.Screen name='TotalScreen' component={Total} options={{headerShown:false}}/>
      </Tot.Navigator>
    </NavigationContainer>
  )

}


export default App;