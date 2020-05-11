
import React from 'react';
import {
    Dimensions
} from 'react-native';
global.search = {
    searchTabPage: "",
    keyWord:""
};
global.gScreen = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
}
global.login='status'
global.nowTab = "";
global.StatusBar = "";
global.setHide = "";
global.gColor = {
    themeColor : "skyblue",
    unActiveColor : '#C0C0C0',
}
global.server = "http://yzzer.top:5074"
fetch("http://yzzer.top:5074/users/1").then(rep=>rep.json())
    .then(data=>{
        global.user = data;
    })
    .then(()=>{
        fetch("http://yzzer.top:5074/favorite/1").then(rep=>rep.json())
            .then(data=>{
                global.user.favorite = data.list;
            })
        fetch("http://yzzer.top:5074/Collect/1").then(rep=>rep.json())
            .then(data=>{
                global.user.Collect = data.list;
            })
        fetch("http://yzzer.top:5074/readTime/1").then(rep=>rep.json())
            .then(data=>{
                global.user.readTime = new Object()
                for(let item in data){
                    if(item !== "createdAt" && item !== "id")
                        global.user.readTime[item] = data[item];
                }
                
            })

    })
