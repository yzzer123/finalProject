import React, {Component} from 'react';
import{
    FlatList,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity
}from 'react-native';
import styles from './style';

const testData = {
    pubTime: "1999/10/11",
    viewTimes: 23,
    commends: 27,
    likes: 20,
    backgroundImageUri: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588064309166&di=f293260cfbfab8e478260a0cad98232a&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408",
    title: "测试文章",
    subTitle: "这是一篇测试文章",

}
let datalist = [];
for(let i=0;i<20;i++){
    datalist.push(testData);
}

import {Icon} from 'react-native-elements';

const DetailItem = ({style,name,color="#999d9c",type="material", text})=>{
    return (
        <View style={style}>
            <Icon name={name} raised  color={color}  type={type} size={14} containerStyle={{padding:0}}  />
            <Text style={styles.detailText}> {text} </Text>
        </View>
        
    )
}

const ArticleItem = ({item, index=1})=>{

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
       
    )

}




  
// 
class ArticleList extends Component{

    constructor(props){
        super(props)


    }

    dataQequest(){

    }
    render(){
        return (
           <FlatList
           data={datalist}
           renderItem={({item,index})=>(<ArticleItem index={index} item={testData}/>)}
           keyExtractor={(item,index)=>`${index}`}
           />
        )
    }

}


export default ArticleList;