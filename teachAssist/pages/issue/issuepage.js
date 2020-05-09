// 2018170056 2020-4-26
import  React,{useEffect} from 'react';
import {
    View,
    StatusBar
}from 'react-native';
import styles from './styles';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Home from './issueHome';
import Detail from './issueDetail';
const Stack = createStackNavigator();

const IssueScreen = ({navigation})=>{
    useEffect(() => {  // when focus
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor("skyblue")
            StatusBar.setBarStyle("light-content")
            StatusBar.animated = true
            StatusBar.setTranslucent(true)
            return unsubscribe;
            });
        return unsubscribe;
    });
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home}
            options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle:{
                    backgroundColor: "skyblue",
                },
                title: "Issues",
                headerTintColor: '#fff',
                headerTitleStyle: {
                    },
                headerTitleAlign:"center"
            }}
            />
            <Stack.Screen name="detail" component={Detail} 
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            />
        </Stack.Navigator>
    )

}

export default IssueScreen;