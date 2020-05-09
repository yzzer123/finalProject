// 2018170056 2020-4-26
import  React,{useState, useEffect} from 'react';
import {
    View,
    Text,
   StatusBar
}from 'react-native';
import styles from './styles';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTabBar from '../../components/TabBar/tabbar';
import {MtPage,DVPage,PythonPage,AIPage} from'./coursePages';
import SearchPage from '../search/search';
import ArticlePage from '../article/article';
// import {Icon} from 'react-native-elements';
// create TopTabNavigation
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator(); // stack

// the main screen of Tutorial
// tab
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



// stack
const TutorialScreen = ({navigation, route})=>{

    
    [barState, setBarState] = useState(true);
    useEffect(() => {  // when focus
        const unsubscribe = navigation.addListener('focus', () => {
       
          StatusBar.setBackgroundColor("white")
          StatusBar.setBarStyle("dark-content")
          StatusBar.animated = true
          StatusBar.setTranslucent(true)
        return unsubscribe;
      });
     return unsubscribe;
  });
    useEffect(()=>{   // do not hide the bar directly
        navigation.setOptions({tabBarVisible: barState});
       
    },[barState]) 
    const setrealHide = (bool)=>{
        navigation.setOptions({tabBarVisible: bool});
    }
   global.setHide = setBarState;
    return (
       
        <Stack.Navigator
        // initialRouteName="TabScreen"
        >
             
            
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
                //    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}
                initialParams={{

                    setHide:setrealHide,
                    getbarState:barState,
                }}
            />
            <Stack.Screen 
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
        </Stack.Navigator>
       
    )

}

export default TutorialScreen;



