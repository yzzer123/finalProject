import React,{useEffect, useState} from 'react';
import {
    Alert, View,Text,
    TouchableOpacity,

} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
const  clearHistory = async (data)=>{
    try{
        await AsyncStorage.setItem('searchHistory',JSON.stringify([]));
        data.splice(0,data.length);
        
    }catch (e){
        Alert.alert('已清空');
    }
}

const ListItem = ({item,index,data,update,setText})=>{

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}
            onPress={()=>{setText(item)}}
            >{item+"                          "}</Text>
            <Icon name="delete"
            onPress={()=>{
                data.splice(index,1);
                
                update(Math.random());
            }}
            size={25} style={styles.iconStyle} color="gray" />
        </View>
    )
}

const Header = ({data,update})=>{

    return (
        <View style={styles.headerContainer} >
            <Text style={styles.leftText}>Search Histroy</Text>
           <Text
            onPress={()=>{
                clearHistory(data);
                update(Math.random()); // give a random number to make component re-render
            }}
            style={[styles.rightText,styles.rightButton]}
            >Clear</Text>
        </View>
    )
}

const HistoryList=({data,setText})=>{
   
   
    [update,setUpdate] = useState(12); // make stateless component re-render 
    return (
        <>
      
         {data.length == 0?  (null):(<Header data={data} update={setUpdate} />)}
         {
             data.map((value,index)=>{
               return ( <ListItem  item={value} update={setUpdate} setText={setText} index={index} data={data} />);
             })
         }
         </>
    );
}


export default HistoryList;