
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
global.nowTab = "";
global.StatusBar = "";
global.setHide = "";
global.gColor = {
    themeColor : "skyblue",
    unActiveColor : '#C0C0C0',
}
global.server = "http://yzzer.top:5074"
global.user=[]
global.usernames=[]
global.password=[]

fetch('http://yzzer.top:5074/users')
    .then(response=>response.json())
    .then(data=>{
      for(let i in data){
        global.usernames.push(data[i].username)
        global.password.push(data[i].password)
      }
    })
/* fetch("http://yzzer.top:5074/users/1").then(rep=>rep.json())
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

    }) */



    global.ReadTime=[]
    global.Readtime=[]
        fetch("http://yzzer.top:5074/readTime/1")
        .then(rep=>rep.json())
        .then(data=>{
          for(let i in data)
            if(i!=="id")
            {
              global.Readtime.push(i)
              global.ReadTime.push(data[i]/60)
            }
        })
