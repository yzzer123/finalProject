import React,{useState, useEffect} from 'react';
import{
    View,
    StatusBar
}from 'react-native';
import { Icon } from 'react-native-elements';
import ArticleList from '../../components/articleList/articleList';

const MtPage = ({navigation,route})=>{
    let [keyWord,setkeyWord] = useState("");
    useEffect(() => {  // when focus
        const unsubscribe = navigation.addListener('focus', () => {
        //   console.log(global.nowTab)
        //   console.log("MT");
          global.nowTab = "MT";
          if(global.search.searchTabPage === "MT" && global.search.keyWord !== keyWord){
              setkeyWord(global.search.keyWord);
          }
         
        });
   
        return unsubscribe;
      });
      const resetkeyWord = ()=>{
        setkeyWord("");
    }
    // TODO get search words from route
    return (
        <View>
            <ArticleList
            type="MT"
            resetkeyWord={resetkeyWord}
            keyWord={keyWord}
            setHide={route.params.setHide}  
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}
            />
            
        </View>
    )
}
const PythonPage = ({navigation,route})=>{
   // TODO get search words from route
   let [keyWord,setkeyWord] = useState("");
   useEffect(() => {  // when focus
       const unsubscribe = navigation.addListener('focus', () => {
       //   console.log(global.nowTab)
       //   console.log("MT");
         global.nowTab = "PY";
         
         if(global.search.searchTabPage === "PY" && global.search.keyWord !== keyWord){
             setkeyWord(global.search.keyWord);
         }
       });
   
       return unsubscribe;
     });
     const resetkeyWord = ()=>{
        setkeyWord("");
    }
    return (
        <View>
            <ArticleList 
            type="PY"
            resetkeyWord={resetkeyWord}
            keyWord={keyWord}
            setHide={route.params.setHide}
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute} />
        </View>
    )
}
const AIPage = ({navigation,route})=>{
// TODO get search words from route
let [keyWord,setkeyWord] = useState("");
useEffect(() => {  // when focus
    const unsubscribe = navigation.addListener('focus', () => {
    //   console.log(global.nowTab)
    //   console.log("MT");
      global.nowTab = "AI";
      
      if(global.search.searchTabPage === "AI" && global.search.keyWord !== keyWord){
          setkeyWord(global.search.keyWord);
      }
    });

    return unsubscribe;
  });
  const resetkeyWord = ()=>{
    setkeyWord("");
}
    return (
        <View>
            <ArticleList
            type="AI"
            keyWord={keyWord}
            resetkeyWord={resetkeyWord}
            setHide={route.params.setHide} 
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}/>
        </View>
    )
}
const DVPage = ({navigation,route})=>{
// TODO get search words from route
let [keyWord,setkeyWord] = useState("");
useEffect(() => {  // when focus
    const unsubscribe = navigation.addListener('focus', () => {
    //   console.log(global.nowTab)
    //   console.log("MT");
      global.nowTab = "DVT";
      
      if(global.search.searchTabPage === "DV" && global.search.keyWord !== keyWord){
          setkeyWord(global.search.keyWord);
      }
    });

    return unsubscribe;
  });
  const resetkeyWord = ()=>{
    setkeyWord("");
}
    return (
        <View>
            <ArticleList 
            type="DV"
            keyWord={keyWord}
            resetkeyWord={resetkeyWord}
            setHide={route.params.setHide} 
            stackNavigation={route.params.stackNavigation}   
            stackRoute={route.params.stackRoute}/>
        </View>
    )
}
export  {MtPage,PythonPage,AIPage,DVPage};
