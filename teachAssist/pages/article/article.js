import React, {useEffect, useState, Component} from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    StatusBar,
    ScrollView
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
  "python":[ "#FF4E50", "#F9D423"],
  "AI":["#11998e","#38ef7d","#78ffd6"],
  "DV":["#12c2e9","#c471ed","#f64f59"]
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
const TopBar = ({title="Python",type="MT",leftaction,rightaction})=>{
    return (
        <Header
        placement="center"
        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress:leftaction }}
        centerComponent={{ text: title, style: { color: '#fff',fontWeight:'bold' } }}
        rightComponent={{ icon: 'refresh', color: '#fff' ,onPress:rightaction}}
        statusBarProps={{ barStyle: 'dark-content',translucent:true,backgroundColor:"rgba(0,0,0,0)" }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
          colors:LinearColors[type],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
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
            commentNum:2,
            LikeNum:3,
            CollectNum:5

        }
       
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
    componentDidMount(){
        setTimeout(()=>{
           this.props.route.params.setHide(false);
          
        },200)
        this._web.reload()

    }
    goBack = ()=>{
      this.props.navigation.goBack();
    }
    refresh = ()=>{
      this._web.reload();
    }
    componentWillUnmount(){
      setTimeout(()=>{
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("white");
        StatusBar.animated = true;
      },200)
     
    }
  commentAction=()=>{
    this.coverLayer.show("bottom")
  }
  likeAction=()=>{
    if(!this.state.isLiked){
      this.setState({isLiked:true,LikeNum:this.state.LikeNum + 1});
    }else{
      this.setState({isLiked:false,LikeNum:this.state.LikeNum - 1});
    }
  }
  collectAction=()=>{
    if(!this.state.isCollected){
      this.setState({isCollected:true,CollectNum:this.state.CollectNum + 1});
    }else{
      this.setState({isCollected:false,CollectNum:this.state.CollectNum - 1});
    }
  }
   render(){
    return (   
      <>  
         <ScrollView style={{flex:1}}
         showsVerticalScrollIndicator={false}
         >
                <TopBar title="Python" leftaction={this.goBack} rightaction={this.refresh} />      
                 <Image source={{uri:imgLink}} style={styles.ImageStyle} />
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
                    source={{ uri: link ,header:
                        "<h1>haha</h1>"}}
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
            renderContent={()=>(<CommentList hide={()=>{this.coverLayer.hide()}} />)}
          />
      </>
        
    )

   }
    
}
// the javascript code put into 

const injectedJavaScript = `
  window.onload=   function () {
        var height = null;
        var divs=document.getElementsByClassName("in-page-preview-buttons"); 
        var divs2=document.getElementsByClassName("icon-chevron-sign-left"); 
        var divs3=document.getElementsByClassName("reader-full-toolbar-shown"); 
        document.getElementById("reader-full-topInfo").style.fontSize = "9px"; 
        
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


