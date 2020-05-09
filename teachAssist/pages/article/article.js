import React, {useEffect, useState, Component} from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    Alert,
    AppState
} from 'react-native';
import CommentList from '../../components/commentlist/commentList';
import styles from './style';
import CoverLayer from '../../components/bottomLayer/bottomLayer';
import {Header,Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {WebView} from 'react-native-webview'
const link = "https://www.zybuluo.com/yzzer/note/1616474";
const  link2 = "https://www.baidu.com";
const imgLink = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588527640699&di=e92f68a76c8605365c13e75275296e10&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408"

const LinearColors = {
  "MT":['skyblue', '#12d8fa',"#a6ffcb"],
  "PY":[ "#FF4E50", "#F9D423"],
  "AI":["#11998e","#38ef7d","#78ffd6"],
  "DV":["#12c2e9","#c471ed","#f64f59"]
} 
//check the date is defined
const getReadTime=(enterTime,preActiveTime)=>{
    let timer = new Date();
    let date = timer.toLocaleDateString();
    let timeSpan = Math.floor((timer.getTime() - enterTime + preActiveTime )/1000);
    // console.log(global.user.readTime)
    // console.log(date)
    if(global.user.readTime[date] !== undefined){
      global.user.readTime[date] =  global.user.readTime[date] + timeSpan;
    }else{
      global.user.readTime[date] = timeSpan;
    }
    return global.user.readTime[date];
}
const Find404 = ()=>{

    return (
        <View style={styles.findnoneBox}>
            <Image source={require("../../components/articleList/img/404.png")} style={styles.findnoneIamge} />
            <Text style={styles.findnoneText}>(ŎдŎ；)Oh, 404 error</Text>
        </View>

    );
}
const Loading = ()=>{
    return (
        <ActivityIndicator
        style={styles.Loading}
        animating={true}
        color="skyblue"
        size="large"
        />
    )
}
const getId = (type)=>{
  switch(type){
    case "MT":
      return  1;
    case "PY":
      return  2;
    case "AI":
      return  3;
    case "DV":
      return  4;
                
  }
}
const TopBar = ({title,type="MT",leftaction,rightaction})=>{
    return (
        <Header
        placement="center"
        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:leftaction }}
        centerComponent={{ text: title, style: { color: '#fff',fontWeight:'bold' } }}
        rightComponent={{ icon: 'refresh', color: '#fff' ,onPress:rightaction}}
        containerStyle={{height:85
        }}
        statusBarProps={{ barStyle: 'light-content',translucent:true,backgroundColor:"rgba(0,0,0,0)" }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
          colors:LinearColors[type],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          }}
          /> 
    )
}
const CommentBar = ({CommentAction,likeAction,CollectsAction,CollectsStatus=false,commentNum = 0,LikesNum = 0,CollectNum=0,LikeStatus=false})=>{
 
  return (
    <View style={styles.commentBarContainer}>
      <View style={styles.commentIcon}>
    <Icon   name="textsms" color="skyblue" size={27} 
      onPress={CommentAction}
      /><Text style={{color:"skyblue"}}>({commentNum})</Text></View>
        <View style={styles.likeIcon}>
      <Icon   name={`${LikeStatus? "favorite":"favorite-border"}`} color="#f05b72" size={27} 
      onPress={likeAction}/>
      <Text style={{color:"#f05b72"}}>({LikesNum})</Text>
      </View>
      <View style={styles.collectIcon}>
      <Icon   name={`${CollectsStatus ? "star":"star-border"}`} color="#fdb933" size={32}
      onPress={CollectsAction} />
      <Text style={{color:"#fdb933"}}>({CollectNum})</Text>
      </View>
    </View>
  )
}
export default class ArticlePage extends Component{
  
    constructor(props){
        super(props)
        this.state = {
            height: 1001,
            isCollected: false,
            isLiked:false,
            commentNum:this.props.route.params.article.commends,
            LikeNum:this.props.route.params.article.likes,
            CollectNum:this.props.route.params.article.collects,
            article:this.props.route.params.article,
            enterPageTime:0,
            preActiveTime:0,

        }
       this.type = this.props.route.params.type;
       this.isActive = true;
    }
    setHeight=(height)=>{
      // console.log("done")
      this.setState({ height: height });
    }
    onMessage=(event)=> {
      // console.log(this.state.height)
      try {
        const action = JSON.parse(event.nativeEvent.data);
        if (action.type === 'setHeight' && action.height > 0) {
          this.setHeight(action.height-50);
         
          // console.log("123")
        }
      } catch (error) {
        // pass
      }
    }
    setArticle = (article)=>{
      this.setState({
        commentNum:article.commends,
            LikeNum:article.likes,
            CollectNum:article.collects,
            article:article,
      });
    }
    setServerDataUpdated=(data)=>{
      fetch(`${global.server}/hash/${getId(this.props.route.params.article.type) }`,
      {method:"PATCH",
      headers:{
        'Accept': 'application/json',
        "Content-Type": "application/json;charset=utf-8"
      },
      body:JSON.stringify({
        hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
      })}).catch((e)=>{Alert.alert(e)})
      this.setArticle(data);
    }
    _handleAppStateChange = (nextAppState) =>{
      if (nextAppState!= null && nextAppState === 'active') {
        
        if (!this.isActive) {
         
          this.state.enterPageTime = (new Date()).getTime();
        }
        this.isActive = true;
      }else if(nextAppState != null && nextAppState === 'background'){
        if(this.isActive){
         
          let timer = new Date()
          this.state.preActiveTime = (timer.getTime() - this.state.enterPageTime);
        }
        
        this.isActive = false;
      }
   
    }
    componentDidMount(){
        this.setState({enterPageTime:(new Date()).getTime()})
        AppState.addEventListener('change',this._handleAppStateChange);
        fetch(`${global.server}/articles/${this.props.route.params.article.id}`,
            {method:"PATCH",
            headers:{
              'Accept': 'application/json',
              "Content-Type": "application/json;charset=utf-8"
            },
            body:JSON.stringify({
              viewTimes:this.props.route.params.article.viewTimes + 1
            })})
        .then((responese)=>responese.json())
        .then(data=>{
          this.setServerDataUpdated(data);
        }).catch(e=>{Alert.alert(e)})
        fetch(`${global.server}/users/${global.user.id}`,
            {method:"PATCH",
            headers:{
              'Accept': 'application/json',
              "Content-Type": "application/json;charset=utf-8"
            },
            body:JSON.stringify({
              viewTimes: global.user.viewTimes + 1
            })})
        .then((responese)=>{
          global.user.viewTimes += 1
        }).catch(e=>{Alert.alert(e)})
        
        if(global.user.favorite.indexOf(this.state.article.id)!==-1){
          this.setState({isLiked:true});
        }
        if(global.user.Collect.indexOf(this.state.article.id)!==-1){
          this.setState({isCollected:true});
        }

        setTimeout(()=>{
           this.props.route.params.setHide(false);
          
        },200)
        // console.log(this.state.article.backgroundImageUri)
     
        this._web.reload()
        

    }
   
    goBack = ()=>{
     
      setTimeout(()=>{
        
        
        StatusBar.animated = true;
      },200)
      this.props.navigation.goBack();
    }
    refresh = ()=>{
      this._web.reload();
    }
    componentWillUnmount(){
      this.props.route.params.setHide(true);
      StatusBar.animated = true;
      
      StatusBar.animated = true;
      let getTime = new Promise((resolve,reject)=>{
        
        let obj = new Object();
        obj[(new Date()).toLocaleDateString()]= getReadTime(this.state.enterPageTime,this.state.preActiveTime);
        
        return resolve(obj)
      })
      getTime.then(obj=>{
        fetch(`${global.server}/readTime/${global.user.id}`,{
          method:"PATCH",
          headers:{
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8"
          },
          body:JSON.stringify(obj)
        }).catch(e=>{Alert.alert(e)})
  
      })
      }
  commentAction=()=>{
    this.coverLayer.show("bottom")
  
  }
  
  likeAction=()=>{
    if(!this.state.isLiked){
      // make a promice to resolve the async problem
      let p = new Promise((resolve,reject)=>{
        this.setState({isLiked:true,LikeNum:this.state.LikeNum + 1})
        global.user.favorite.push(this.state.article.id);
        return resolve();
      })  
     
      p.then(()=>{
        //update the favorite list in server
        fetch(`${global.server}/favorite/${global.user.id}`,
        {method:"PATCH",
              headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json;charset=utf-8"
              },
              body:JSON.stringify({
                list:global.user.favorite
        })}).catch(e=>{Alert.alert(e)})
        // update the articles data
        fetch(`${global.server}/articles/${this.props.route.params.article.id}`,
        {method:"PATCH",
        headers:{
          'Accept': 'application/json',
          "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify({
          likes:this.state.LikeNum
        })}).catch(e=>{Alert.alert(e)})
        // update the hash value
        fetch(`${global.server}/hash/${getId(this.props.route.params.article.type) }`,
        {method:"PATCH",
        headers:{
          'Accept': 'application/json',
          "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify({
          hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
        })}).catch(e=>{Alert.alert(e)})

    })
      
    }else{
    
      let p = new Promise((resolve,reject)=>{
        this.setState({isLiked:false,LikeNum:this.state.LikeNum - 1})
        global.user.favorite.splice(global.user.favorite.indexOf(this.state.article.id),1);
        return resolve();
      })  
      p.then(()=>{
        //update the favorite list in server
        fetch(`${global.server}/favorite/${global.user.id}`,
        {method:"PATCH",
              headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json;charset=utf-8"
              },
              body:JSON.stringify({
                list:global.user.favorite
        })}).catch(e=>{Alert.alert(e)})
            // update the articles data
        fetch(`${global.server}/articles/${this.props.route.params.article.id}`,
          {method:"PATCH",
          headers:{
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8"
          },
          body:JSON.stringify({
            likes:this.state.LikeNum
        })}).catch(e=>{Alert.alert(e)})
         // update the hash value
        fetch(`${global.server}/hash/${getId(this.props.route.params.article.type) }`,
      {method:"PATCH",
      headers:{
        'Accept': 'application/json',
        "Content-Type": "application/json;charset=utf-8"
      },
      body:JSON.stringify({
        hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
      })}).catch(e=>{Alert.alert(e)})
      })
      
    }
  }
  //logic like likeaction()
  collectAction=()=>{
    if(!this.state.isCollected){
       
      let p = new Promise((resolve,reject)=>{
        this.setState({isCollected:true,CollectNum:this.state.CollectNum + 1});
        global.user.Collect.push(this.state.article.id);
        return resolve();
      })  
      
      p.then(()=>{
         //update the collect list in server
        fetch(`${global.server}/Collect/${global.user.id}`,
        {method:"PATCH",
              headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json;charset=utf-8"
              },
              body:JSON.stringify({
                list:global.user.Collect
        })}).catch(e=>{Alert.alert(e)})
         // update the articles data
        fetch(`${global.server}/articles/${this.props.route.params.article.id}`,
        {method:"PATCH",
        headers:{
          'Accept': 'application/json',
          "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify({
          collects:this.state.CollectNum
        })}).catch(e=>{Alert.alert(e)})
        // update the hash value
        fetch(`${global.server}/hash/${getId(this.props.route.params.article.type) }`,
      {method:"PATCH",
      headers:{
        'Accept': 'application/json',
        "Content-Type": "application/json;charset=utf-8"
      },
      body:JSON.stringify({
        hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
      })}).catch(e=>{Alert.alert(e)})
      
      })
      
    }else{
        
      let p = new Promise((resolve,reject)=>{
        this.setState({isCollected:false,CollectNum:this.state.CollectNum - 1})
        global.user.Collect.splice(global.user.Collect.indexOf(this.state.article.id),1)
        return resolve();
      })  
      
      
      p.then(()=>{
        //update the collect list in server
        fetch(`${global.server}/Collect/${global.user.id}`,
        {method:"PATCH",
              headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json;charset=utf-8"
              },
              body:JSON.stringify({
                list:global.user.Collect
        })}).catch(e=>{Alert.alert(e)})
        fetch(`${global.server}/articles/${this.props.route.params.article.id}`,
        {method:"PATCH",
        headers:{
          'Accept': 'application/json',
          "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify({
          collects:this.state.CollectNum
        })}).catch((e)=>{alert(e)})
        fetch(`${global.server}/hash/${getId(this.props.route.params.article.type) }`,
      {method:"PATCH",
      headers:{
        'Accept': 'application/json',
        "Content-Type": "application/json;charset=utf-8"
      },
      body:JSON.stringify({
        hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
      })}).catch(e=>{Alert.alert(e)})
      })
    }
  }
   render(){
    return (   
      <>  
       <TopBar  leftaction={this.goBack} rightaction={this.refresh} type={this.type} title={this.state.article.title} />
         <ScrollView style={{flex:1}}
         showsVerticalScrollIndicator={false}
         >
                     
                 <Image source={{uri:this.state.article.backgroundImageUri}} style={styles.ImageStyle} />
                  <WebView
                  scalesPageToFit={false}
                  injectedJavaScriptBeforeContentLoadedForMainFrameOnly={true}
                  
                    ref={(web)=>{this._web = web}}
                     style={{ height:this.state.height}}     
                     containerStyle={styles.Web}
                     bounces={true}
                     domStorageEnabled={true}
                     renderLoading={()=>(<Loading/>)}
                     renderError={()=>(<Find404/>)}    
                     mixedContentMode="always"
                     startInLoadingState={true}
                      injectedJavaScript={injectedJavaScript}
                    source={{ uri: this.state.article["articleLink "]}}
                    javaScriptEnabled={true}
                    onMessage={this.onMessage}    
                    />
                
        </ScrollView>
          <CommentBar
          CommentAction={this.commentAction}
          likeAction={this.likeAction}
          CollectsAction={this.collectAction} 
          CollectsStatus={this.state.isCollected}
          LikeStatus={this.state.isLiked}
          commentNum={this.state.commentNum}
          LikesNum={this.state.LikeNum}
          CollectNum={this.state.CollectNum}
          
          />
          <CoverLayer ref={ref => this.coverLayer = ref}
            coverLayerEvent={()=>{this.coverLayer.hide()}}
            coverLayerColor="rgba(0,0,0,0.3)"
            renderContent={()=>(<CommentList article={this.state.article} hide={()=>{this.coverLayer.hide()}} />)}
          />
      </>
        
    )

   }
    
}
// the javascript code put into the webview

const injectedJavaScript = `
  window.onload=   function () {
        var height = null;
        var divs=document.getElementsByClassName("in-page-preview-buttons"); 
        var divs2=document.getElementsByClassName("icon-chevron-sign-left"); 
        var divs3=document.getElementsByClassName("reader-full-toolbar-shown"); 
        document.getElementById("reader-full-topInfo").style.visibility = "hidden"; 
        
        document.body.style.backgroundColor="white";    
        for(var i=0;i<divs2.length;i++){
          divs2[i].style.visibility="hidden";
        }
        for(var i=0;i<divs.length;i++){
          divs[i].style.visibility="hidden";
        }
        
        for(var i=0;i<divs3.length;i++){
          divs3[i].style.visibility="hidden";
        }
        function changeHeight() {
          if (document.body.scrollHeight != height) {
       
            height = document.body.scrollHeight;
            if (window.postMessage) {
               window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
      }();
      `;


