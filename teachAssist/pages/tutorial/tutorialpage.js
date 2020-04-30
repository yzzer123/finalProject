// 2018170056 2020-4-26
import  React,{useState, useEffect} from 'react';
import {
    View,
    Text,
   StatusBar
}from 'react-native';
import styles from './styles';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '../../components/TabBar/tabbar';
import {MtPage,DVPage,PythonPage,AIPage} from'./coursePages';
import SearchPage from '../search/search';
import {Icon} from 'react-native-elements';
// create TopTabNavigation
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// the main screen of Tutorial

const TabScreen = ({navigation,route})=>{
    const {setHide,getbarState} = route.params;
    // TODO get search words from route
    return (
        <TopTab.Navigator  
                    tabBarOptions={{
                        labelStyle: { fontSize: 10 },
                        tabStyle: { height: 50, backgroundColor: 'skyblue'},
                        showIcon: true,
                        showLabel: false,
                    }}
                    tabBar={props=><MyTabBar stackNavigation={navigation} {...props}/>}     
                    >
                    {/*four pages of the our courses */}
                    <TopTab.Screen name="MobileTech" component={MtPage}  
                    initialParams={{setHide:setHide,
                        stackNavigation:navigation,
                        stackRoute:route,
                    }}
                    />
                    <TopTab.Screen name="Python" component={PythonPage}  
                    initialParams={{setHide:setHide,
                        stackNavigation:navigation,
                        stackRoute:route,
                    }}
                    />
                    <TopTab.Screen name="MachineLearn" component={AIPage} 
                   initialParams={{setHide:setHide,
                    stackNavigation:navigation,
                    stackRoute:route,
                }}
                        />
                    <TopTab.Screen name="DataVisual" component={DVPage}   
                    initialParams={{setHide:setHide,
                        stackNavigation:navigation,
                        stackRoute:route,
                    }}
                    />
       </TopTab.Navigator>
    );
}

const TutorialScreen = ({navigation, route})=>{

    
    [barState, setBarState] = useState(true);
   
    useEffect(()=>{   // do not hide the bar directly
        navigation.setOptions({tabBarVisible: barState});
       
    },[barState]) 
    const setrealHide = (bool)=>{
        navigation.setOptions({tabBarVisible: bool});
    }
    
    return (
       <>
       <StatusBar 
        backgroundColor={'white'} 
        animated={true} 
        hidden={false}
          barStyle="dark-content"  
          />
        <Stack.Navigator>
        
            <Stack.Screen
                name="TabScreen"
                component={TabScreen}
                initialParams={{
                    setHide:setBarState,
                    getbarState:barState
                }}
                options={{
                    headerShown:false,
                }}
            />
           <Stack.Screen 
                name="SearchScreen"
                component={SearchPage}
                options={{
                   headerShown:false,
                }}
                initialParams={{

                    setHide:setrealHide,
                    getbarState:barState,
                }}
            />
        </Stack.Navigator>
       </>
    )

}

export default TutorialScreen;



