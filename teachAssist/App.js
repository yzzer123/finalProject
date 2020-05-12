import  React, {Component} from 'react';
import './global';
import { 
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import  FontIcon  from 'react-native-vector-icons/FontAwesome';
import  FounIcon  from 'react-native-vector-icons/Foundation';
import IssueScreen from './pages/issue/issuepage';
import TutorialScreen from './pages/tutorial/tutorialpage';
import UserScreen from './pages/user/userpage';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './components/login/styles'
// Bottom Tabs
const Tab = createBottomTabNavigator();

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      UserName:'',
      PassWord:'',
      password1:'',
      loginaccount:'',
      loaded:false,
    }
  }
  componentWillMount(){
    AsyncStorage.getItem("Logaa")
    .then((value)=>{
      if(value!==null){
        this.setState({loginaccount:value});
      }
    })
    .catch((error)=>{
      console.warn(error)
    }).done();

    AsyncStorage.getItem("pasaa")
            .then((value) => {
      if (value !== null){

              this.setState({password1:value});

                }
                })
                  .catch((error) => {
                console.warn(error);
                }).done();
    
  }
  User={
    UserName:global.user.username,
    PassWord:global.user.password
}
componentWillUnmount(){
   this.msgListener.remove();
}
Judge(){
    if(this.state.UserName==this.User.UserName&&this.state.PassWord==this.User.PassWord){
        ToastAndroid.show(`${this.state.UserName},${this.state.PassWord}`,ToastAndroid.SHORT)
        AsyncStorage.setItem("Logaa",'Dzp');
        AsyncStorage.setItem("pasaa","12345")
        this.Fetch()
    }
    else
        ToastAndroid.show(`Login failed`,ToastAndroid.SHORT)
    }
login(){
    Alert.alert(
        'LOGIN PROMPT',
        'CONFIRM ACCOUNT NUMBWE AND PASSWORD',
        [
            { text:'cancel',onPress:()=>{}},
            { text:'sure',onPress:()=>{this.Judge()}}
        ],
        {cancelable:true});
}
  componentDidMount(){
    this.msgListener=DeviceEventEmitter.addListener('change',(listenerMsg)=>{
      this.setState({loginaccount:'',password1:''})
    })
  }

  Fetch(){
    AsyncStorage.getItem("Logaa")
    .then((value)=>{
      console.log(value);
      if(value!==null){
        this.setState({loginaccount:value});
      }
    })
    .catch((error)=>{
      console.warn(error)
    }).done();

    AsyncStorage.getItem("pasaa")
            .then((value) => {
              console.log(value);
      if (value !== null){
              this.setState({password:value});
                }
                })
                  .catch((error) => {
                console.warn(error);
                }).done();
  }
  
  render(){
    if(this.state.loginaccount===''&&this.state.password1===''){
      return(
        <View style={styles.container}>
        <Image source={require('./components/login/image/avatar.jpg')} style={styles.image} />
        <TextInput
            placeholder={`User:${this.User.UserName}`} 
            style={styles.textinput}
            onChangeText = {(UserName)=> this.setState({UserName})}
        />
        <TextInput 
            placeholder={'Password'} 
            secureTextEntry = {true} 
            style={styles.textinput}
            onChangeText = {(PassWord)=>this.setState({PassWord})}
        />
        <TouchableOpacity style={styles.LoginButton}
            onPress={()=>this.login()}
            activeOpacity={0.9}>
            <Text style={{color:'white'}}>Login</Text>
        </TouchableOpacity>
    
    </View>
      )
             }
    else
      return(
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
      )
  }
}