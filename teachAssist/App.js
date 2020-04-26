import * as React from 'react';
import { View, Text, Button,
  TextInput,
  
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Tab = createBottomTabNavigator();

const HomeScreen=({navigation, route})=>{
  

  return (
    <View  style={{flex:1, justifyContent:'center', alignItems: 'center'}}>

    <Text>Home</Text>
    </View>
  );
}
const Command=({navigation, route})=>{
  

  return (
    <View  style={{flex:1, justifyContent:'center', alignItems: 'center'}}>

    <Text>Command</Text>
    </View>
  );
}
const UserSetting =({navigation, route})=>{
  

  return (
    <View  style={{flex:1, justifyContent:'center', alignItems: 'center'}}>

    <Text>UserSetting</Text>
    </View>
  );
}
const App = () =>{


  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Command') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons size={40} name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2894FF',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Command" component={Command} />
      <Tab.Screen name="UserSetting" component={UserSetting} />
    </Tab.Navigator>
  </NavigationContainer>
  );

}

export default App;