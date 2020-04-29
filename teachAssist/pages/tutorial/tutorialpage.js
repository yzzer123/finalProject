// 2018170056 2020-4-26
import  React from 'react';
import {
    View,
    Text,
   StatusBar
}from 'react-native';
import styles from './styles';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '../../components/TabBar/tabbar';
import {MtPage,DVPage,PythonPage,AIPage} from'./coursePages';


// create TopTabNavigation
const TopTab = createMaterialTopTabNavigator();


// the main screen of Tutorial
const TutorialScreen = ({navigation, route})=>{

    const setHide = (bool)=>{
        navigation.setOptions({tabBarVisible: bool})
    }


    return (
       <>
       <StatusBar 
        backgroundColor={'white'} 
        animated={true} 
        hidden={false}
          barStyle="dark-content"  
          />
        <TopTab.Navigator  
        tabBarOptions={{
            labelStyle: { fontSize: 10 },
            tabStyle: { height: 50, backgroundColor: 'skyblue'},
            showIcon: true,
            showLabel: false,
          }}
          tabBar={props=><MyTabBar {...props}/>}
          
        >
            
            {/*four pages of the our courses */}
            <TopTab.Screen name="MobileTech" component={MtPage}  
            initialParams={{setHide:setHide}}
            />
            <TopTab.Screen name="Python" component={PythonPage}  
            initialParams={{setHide:setHide}}
            />
            <TopTab.Screen name="MachineLearn" component={AIPage} 
            initialParams={{setHide:setHide}}
             />
            <TopTab.Screen name="DataVisual" component={DVPage}   
            initialParams={{setHide:setHide}}  
            />
        </TopTab.Navigator>
       </>
    )

}

export default TutorialScreen;



