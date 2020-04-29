import React, {Component} from 'react';
import{
    FlatList,
    View,
    Text,
    Image,
    Platform,
    TouchableOpacity,
    LayoutAnimation,
    UIManager
}from 'react-native';
import styles,{SCREEN_HEIGHT,SCREEN_WIDTH} from './style';
import ActionButton from 'react-native-action-button';
import{useFocusEffect} from '@react-navigation/native';
const testData = {
    pubTime: "1999/10/11",
    viewTimes: 23,
    commends: 27,
    likes: 20,
    backgroundImageUri: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588064309166&di=f293260cfbfab8e478260a0cad98232a&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408",
    title: "测试文章",
    subTitle: "这是一篇测试文章",
    commendId:1,
    articleLink:"",

}
let datalist = [];
for(let i=0;i<5;i++){
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
// 

class ArticleList extends Component{

    constructor(props){
        super(props)
        this.state={
            articleList:[],
            displayButton:false,
            refreshing:false,
            
        }
        if(Platform.OS === 'android'){
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
          }
        this.offsetY = 0;
        this.barHideState=true;
        this.setHide = props.setHide; // to hide the bottom bar
        
    }
    judgeIsDisplay=(event)=>{ // react to the scroll steate
        let nowOffsetY = event.nativeEvent.contentOffset.y;
       
        if(nowOffsetY == 0){
        
            this.setState({displayButton:false})
        }else if(!this.state.displayButton){
          
            this.setState({displayButton:true})
        }
        if (nowOffsetY<40||(nowOffsetY < this.offsetY && !this.barHideState)){
            // LayoutAnimation.configureNext(LayoutAnimation.create(170,'linear','opacity'))
            this.setHide(true);
            this.barHideState = true;
        }else if (nowOffsetY > this.offsetY && this.barHideState ){
            LayoutAnimation.configureNext(LayoutAnimation.create(170,'linear','opacity'))
            this.setHide(false);
            this.barHideState = false;
        }
        
        this.offsetY = nowOffsetY;
    }
    reFresh = ()=>{ // do when freshing
        this.setState({refreshing: true}); 
       this.setHide(this.barHideState)
        setTimeout(()=>{
            this.setState({refreshing:false});   
        }, 5000)
        console.log("hello");
    }
    scrollToTop=()=>{
        this._FlatList.scrollToOffset({offset:0, animated:true});
    }
    dataQequest(){

    }
    render(){
        return (
            <>
           <FlatList
           refreshing={this.state.refreshing}
           onRefresh={this.reFresh}
           ref={(flatlist)=>{this._FlatList = flatlist}}
           data={datalist}
           onScroll={(event)=>{this.judgeIsDisplay(event)}}
           removeClippedSubviews={true}
           //if list is empty
           ListEmptyComponent={<Find404 />}
           renderItem={({item,index})=>(<ArticleItem index={index} item={testData}/>)}
           keyExtractor={(item,index)=>`${index}`}
           ListFooterComponent={<Footer/>}
           />
            {this.state.displayButton ? (<ActionButton
            buttonColor="rgba(0,0,0,0)"
            onPress={this.scrollToTop}
            offsetX={5}
            offsetY={SCREEN_HEIGHT-120}
            verticalOrientation="down"
            renderIcon={()=><FLoatButton />}
            hideShadow={true}
            />):null}
           </>
        )
    }

}


export default ArticleList;