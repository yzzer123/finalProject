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
  ActivityIndicator,
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
import './global'
// Bottom Tabs
const Tab = createBottomTabNavigator();

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      UserName:'',
      PassWord:'',
      loginaccount:'',
      loaded:false,
      loading:false,
      status:false
    }
  }

componentDidMount(){
  AsyncStorage.getItem("LoginStatus") // 获取本地登录状态
      .then(value=>JSON.parse(value))
      .then(data=>{
        if (data === null){  // 如果本地未登录
          setTimeout(()=>{ //做延迟效果
            this.setState({loaded:true,status:false})
          },2000)
        }else{ //获取本地用户
          
          AsyncStorage.getItem("LoginUser")
          .then(value=>JSON.parse(value))
          .then(data=>{
            if(!data){ // 如果获取本地用户出错
              setTimeout(()=>{
                this.setState({loaded:false,status:false})
              },2000)
            }else{ //如果获取正常，再从服务器获取最新的用户状态
              console.log("yer");
             let id = data.id;
              fetch(`${global.server}/users/${id}`).then(rep=>rep.json())
                .then(data=>{ //
                    global.user = data;
                    return data;
                })
                .then((data)=>{ //获取喜欢列表和收藏列表
                    fetch(`${global.server}/favorite/${data.id}`).then(rep=>rep.json())
                        .then(Data=>{
                            global.user.favorite = Data.list;
                        })
                    fetch(`${global.server}/Collect/${data.id}`).then(rep=>rep.json())
                        .then(Data=>{
                            global.user.Collect = Data.list;
                        })
                    fetch(`${global.server}/readTime/${data.id}`).then(rep=>rep.json())
                        .then(Data=>{
                            global.user.readTime = new Object()
                            for(let item in Data){
                                if(item !== "createdAt" && item !== "id")
                                    global.user.readTime[item] = Data[item];
                            }
                            
                        })

                }).then(()=>{
                 
                  setTimeout(()=>{ // 更新状态，切换显示界面
                    this.setState({loaded:true, status:true});
                  },3000)
                })
            }
          })
        }
      })
      .catch(e=>{Alert.alert(e)})
    
      this.msgListener=DeviceEventEmitter.addListener('change',(listenerMsg)=>{
        this.setState({status:!this.state.status})
      })
}

Judge(){
  fetch(`${global.server}/users?username=${this.state.UserName}`)
  .then(rep=>rep.json())
  .then(data=>{
    if(data?.length === 0){
      this.setState({loading:false});
      Alert.alert("账户名错误");
    }else{
      if(data[0].password === this.state.PassWord){
        fetch(`${global.server}/favorite/${data[0].id}`).then(rep=>rep.json())
                      .then(Data=>{
                          global.user.favorite = Data.list;
                      })
                  fetch(`${global.server}/Collect/${data[0].id}`).then(rep=>rep.json())
                      .then(Data=>{
                          global.user.Collect = Data.list;
                      })
                  fetch(`${global.server}/readTime/${data[0].id}`).then(rep=>rep.json())
                      .then(Data=>{
                          global.user.readTime = new Object()
                          for(let item in Data){
                              if(item !== "createdAt" && item !== "id")
                                  global.user.readTime[item] = Data[item];
                          }
                          
                      })
        AsyncStorage.setItem("LoginStatus",JSON.stringify(true))
        .then(()=>{
          global.user = data[0];
          AsyncStorage.setItem("LoginUser", JSON.stringify(data[0]))
          .then(()=>{
            this.setState({loading:false,status:true});
          })
        })  
        }else{
          Alert.alert("密码错误")
          this.setState({loading:false})
        }
  
  }
  })
    }
login(){
    Alert.alert(
        'LOGIN PROMPT',
        'CONFIRM ACCOUNT NUMBWE AND PASSWORD',
        [
            { text:'cancel',onPress:()=>{}},
            { text:'sure',onPress:()=>{this.setState({loading:true}),this.Judge()}}
        ],
        {cancelable:true});
}
  componentWillUnmount(){
    AsyncStorage.setItem('LoginUser',JSON.stringify(global.user))
    this.msgListener.remove();
  }
  render(){
    if(this.state.loaded===false){
      return(
        <View style={{alignItems:'center', justifyContent: 'center'}}>
          <Image source={require('./pages/user/image/Learning.png')} style={{marginTop:global.gScreen.HEIGHT/3}} />
          <Text>TeachAssist</Text>
          <ActivityIndicator  />
        </View>
      )
      }
    else{
          if(this.state.status===false){
              return(
                <View style={styles.container}>
                <Image source={require('./components/login/image/Learning.png')} style={styles.image} />
                <TextInput
                    placeholder={'User'} 
                    style={styles.textinput}
                    onChangeText = {(UserName)=> this.setState({UserName})}
                />
                <TextInput 
                    placeholder={'PassWord'} 
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
          else{
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
}
}