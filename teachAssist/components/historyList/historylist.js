import React,{useEffect, useState} from 'react';
import {
    FlatList, Alert, View,Text,
    TouchableOpacity
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

const ListItem = ({item,index,data,update})=>{

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText} >{item}</Text>
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
            <TouchableOpacity 
            style={styles.rightButton}
            onPress={()=>{
                clearHistory(data);
                update(Math.random()); // give a random number to make component re-render
            }}
            ><Text
            style={styles.rightText}
            >Clear</Text></TouchableOpacity>
        </View>
    )
}

const HistoryList=({data})=>{
   
   
    [update,setUpdate] = useState(12); // make stateless component re-render 

    return (
        <FlatList
            keyExtractor={(item)=>item}
            data={data}
            renderItem={({item,index})=><ListItem  item={item} update={setUpdate} index={index} data={data} />}
            ListHeaderComponent={()=>{return (data.length == 0?  ( <></>):(<Header data={data} update={setUpdate} />))}}
         />
    );
}


export default HistoryList;