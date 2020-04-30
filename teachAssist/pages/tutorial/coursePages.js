import React,{useState, useEffect} from 'react';
import{
    View
}from 'react-native';
import { Icon } from 'react-native-elements';
import ArticleList from '../../components/articleList/articleList';

const MtPage = ({navigation,route})=>{
    // React.useEffect(() => {  // when focus
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       console.log("MT");
    //     });
    
    //     return unsubscribe;
    //   });
    // TODO get search words from route
    return (
        <View>
            <ArticleList setHide={route.params.setHide}  
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}
            />
            
        </View>
    )
}
const PythonPage = ({navigation,route})=>{
   // TODO get search words from route
     
    return (
        <View>
            <ArticleList setHide={route.params.setHide}
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute} />
        </View>
    )
}
const AIPage = ({navigation,route})=>{
// TODO get search words from route
    return (
        <View>
            <ArticleList setHide={route.params.setHide} 
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}/>
        </View>
    )
}
const DVPage = ({navigation,route})=>{
// TODO get search words from route
    return (
        <View>
            <ArticleList setHide={route.params.setHide} 
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}/>
        </View>
    )
}
export  {MtPage,PythonPage,AIPage,DVPage};