import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './style';

import {WebView} from 'react-native-webview'
const link = "https://www.zybuluo.com/yzzer/note/1616474";
const Find404 = ()=>{

    return (
        <View style={styles.findnoneBox}>
            <Image source={require("../../components/articleList/img/404.png")} style={styles.findnoneIamge} />
            <Text style={styles.findnoneText}>(ŎдŎ；)Oh, here is nothing!</Text>
        </View>

    );
}
export default ArticlePage = ({navigation,route})=>{
    let [animating, setAni] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            route.params.setHide(false);
            
        },200)
        // console.log(route.params.setHide);
        console.log("hello")
    },[])
    navigation.setOptions({ headerStyle: {
        backgroundColor: 'skyblue',
      },})
    return (
        <>
         <StatusBar 
        backgroundColor={'skyblue'} 
        animated={true} 
        hidden={false}
          barStyle="light-content"  
          />
       {animating ? <ActivityIndicator
            size={"large"}
            animating={animating}/>:null}
            <View  style={styles.Web}><WebView
           
            source={{uri: link}}
            bounces={true}
            onLoadStart={()=>{setAni(true)}}
            onLoadEnd={()=>{setAni(false)}}
            domStorageEnabled={true}
            renderError={()=>(<Find404/>)}
            
            mixedContentMode="always"
            /></View>

        <Text>helllo</Text>
        </>
    )

}