import React,{useState} from 'react';
import{
    View
}from 'react-native';
import { Icon } from 'react-native-elements';
import ArticleList from '../../components/articleList/articleList';


const MtPage = ({navigation,route})=>{

    return (
        <View>
            <ArticleList setHide={route.params.setHide} />
            
        </View>
    )
}
const PythonPage = ({navigation,route})=>{

    return (
        <View>
            <ArticleList setHide={route.params.setHide} />
        </View>
    )
}
const AIPage = ({navigation,route})=>{

    return (
        <View>
            <ArticleList setHide={route.params.setHide} />
        </View>
    )
}
const DVPage = ({navigation,route})=>{

    return (
        <View>
            <ArticleList setHide={route.params.setHide} />
        </View>
    )
}
export  {MtPage,PythonPage,AIPage,DVPage};