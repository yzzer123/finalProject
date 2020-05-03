
import React from 'react';
import{
    FlatList,
    View,
    Text,
    Image,
    TouchableOpacity,
}from 'react-native';

import styles,{SCREEN_HEIGHT,SCREEN_WIDTH} from './style';
import {Icon} from 'react-native-elements';

const DetailItem = ({style,name,color="#999d9c",type="material", text})=>{
    return (
        <View style={style}>
            <Icon name={name} raised  color={color}  type={type} size={14} containerStyle={{padding:0}}  />
            <Text style={styles.detailText}> {text} </Text>
        </View>
        
    )
}

const ArticleItem = ({item,type, index})=>{
  
    return (
       
           <View style={styles.articleContainer}>
            <TouchableOpacity
            style={styles.touch}
            onPress={()=>{console.log("passage")}}
            >
            <Image style={styles.articleImage}  source={{uri:item.backgroundImageUri}}/> 
                {/*background Image */}
                <Text style={styles.header} >{item.title}</Text>  
                {/*the title of article */}
                <Text style={styles.subHeader} >{item.subTitle}</Text> 
                {/*the subtitle of article */}
            </TouchableOpacity>
            <View style={styles.detailContainer}> 
            
            {/* detail informaiton*/}
            <DetailItem name="watch-later" color="#fab27b" style={styles.time} text={item.pubTime} />
            <DetailItem name="visibility" color="#8a8c8e" style={styles.view} text={item.viewTimes} />
            <DetailItem name="textsms" color="#33a3dc" style={styles.commend} text={item.commends} />
            <DetailItem name="favorite"color="#d71345"  style={styles.likes} text={item.likes} />
            </View> 
            </View>
       
    );

}
// if list has nothing will return 
const Find404 = ()=>{

    return (
        <View style={styles.findnoneBox}>
            <Image source={require("./img/404.png")} style={styles.findnoneIamge} />
            <Text style={styles.findnoneText}>(ŎдŎ；)Oh, here is nothing!</Text>
        </View>

    );
}
// the footer of list
const Footer = ()=>{
    return (
        <Text style={styles.footer}>{"o(▼皿▼メ;)oI have a end line!!!"}</Text>
    )
}
const FLoatButton = ()=>{
    
    
    return (
        <Icon name="arrow-upward"   size={24} reverse raised color="skyblue"/>

    )
}

// the bar for canceling search
const SearchBar = ({keyWord,action})=>{
    return (
        <View style={styles.searchHeader}>
            <Text
            style={styles.searchKeyWord}
            >{"the results for "+( keyWord?.length >4? (keyWord.slice(0,4)+"..."):keyWord)}</Text>
            <Icon name="clear" 
            iconStyle={styles.clearButton}
            
            onPress={()=>{action()}}
            size={20} color={"orange"} />
        </View>
    )
}

export {FLoatButton,Footer,Find404,ArticleItem,SearchBar};