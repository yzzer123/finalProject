// 2018170056 2020-4-26
import  React from 'react';
import {
    View,
    Text,
   
}from 'react-native';
import styles from './styles';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '../../components/TabBar/tabbar';
import {MtPage,DVPage,PythonPage,AIPage} from'./coursePages';


// create TopTabNavigation
const TopTab = createMaterialTopTabNavigator();


// the main screen of Tutorial
const TutorialScreen = ()=>{

    return (
       
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
            />
            <TopTab.Screen name="Python" component={PythonPage}  
            />
            <TopTab.Screen name="MachineLearn" component={AIPage} 
             />
            <TopTab.Screen name="DataVisual" component={DVPage}     
            />
        </TopTab.Navigator>
       
    )

}

export default TutorialScreen;



