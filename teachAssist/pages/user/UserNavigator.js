import React,{Component, useState} from 'react';
import{
    Text,
    View,
    Image,
    TouchableOpacity,
    Vibration,
    Dimensions,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import {Echarts} from 'react-native-secharts'
import {NavigationContainer, useScrollToTop} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import FIcon from 'react-native-vector-icons/Feather'
import styles from './styles';
import functions from './UserFunctions';
import CollectScr from './CollectScr';
import AsyncStorage from '@react-native-community/async-storage';
import HistoryShow from './HistoryShow'
import ReadChart from './ReadChart'

const width =Dimensions.get('window').width
const Set = createStackNavigator()
var list=[]

const GetHistory = async ()=>{
    try{
      let  history =  await AsyncStorage.getItem('History');
      if(history){
        history = JSON.parse(history);
        list=history
      }

    }catch(e){

    }
    
}
const SetHome=({navigation})=>{
    return(
        <View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>
                Alert.alert(
                    'SIGNOUT PROMPT',
                    'Are you sure to log out?',
                [
                    { text:'cancel',onPress:()=>{}},
                    { text:'sure',onPress:() =>{DeviceEventEmitter.emit('change','修改')}}
                ],
                    {cancelable:true})}>
                <Text style={{color:'black' ,backgroundColor:'white',width:width,fontSize:20,textAlign:'center'}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}
const collect=({navigation,route})=>{
    return(
        <View>
            <CollectScr 
                stackNavigation={route.params.stackNavigation}
            />
        </View>
    )
}

const read_time=({navigation})=>{
    const option={
        title:{
            left:'center',
          text:'Reading time',
          textStyle:{
              fontSize:25,
              
          },
          subtext:"分钟",
          subtextStyle:{
              fontSize:15,
          }
        },
        tooltip:{},
        legend:{
          right:'right',
          data:['time'],
          textStyle:{
              fontSize:'15'
          }
        },
        xAxis:{
          data:global.Readtime,
          axisLabel:{
            fontSize:'15',
        }
        },
        yAxis:{
          type:'value',
          axisLabel:{
              fontSize:'15',
          }
        },
        series:[{
          name:'time',
          type:'line',
          data:global.ReadTime,
          areaStyle:{}
        }]
      }
    return(
        <ReadChart />
    )
}

const history=({navigation,route})=>{
    // GetHistory()
    //console.log(list)
    return(
        <View>
            <HistoryShow stackNavigation={route.params.stackNavigation}/>
        </View>
    )
}

const setting=({navigation})=>{
    return(
        <Set.Navigator>
            <Set.Screen name='SetHome' component={SetHome} options={{headerShown:false}} />
        </Set.Navigator>
    )
}

const about_us=({navigation})=>{
    return(
    <View>
        <View>
            <Image source={require('./image/Learning.png')} style={{marginLeft:104}}/>
            <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Teaching-Assistant</Text>
            <Text style={{textAlign:'center'}}>V 1.0.0</Text>
        </View>
        <View style={[styles.containStyle,{marginTop:10}]}>
            <View style={styles.leftViewStyle}>
                <SIcon name='people' color='#33a3dc' style={styles.leftImgStyle} size={26} />
                <Text style={{fontSize:20,marginLeft:10,backgroundColor:'white',height:30}}>Developers:  Yzzer&Dzper</Text>
            </View>
        </View>
        <View style={styles.containStyle}>
            <View style={styles.leftViewStyle}>
                <FIcon name='book-open' color='#b76f40' style={styles.leftImgStyle} size={26} />
                <Text style={{fontSize:20,marginLeft:10,backgroundColor:'white',height:30}}>Purpose:</Text>
            </View>
        </View>
        <Text style={{backgroundColor:'white',fontSize:18}}>      The App is to help students to learn  some 
         difficult courses,which are taught in English,
        such as python, React-native and so on. 
        </Text>
</View>
    )
}

export {collect,read_time,history,setting,about_us}
