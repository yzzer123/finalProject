import React, {Component} from 'react';
import{
    FlatList,
    Platform,
    LayoutAnimation,
    UIManager
}from 'react-native';
import styles,{SCREEN_HEIGHT,SCREEN_WIDTH} from './style';
import  {FLoatButton,Footer,Find404,ArticleItem,SearchBar} from './article_components';
import ActionButton from 'react-native-action-button';
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

class ArticleList extends Component{

    constructor(props){
        super(props)
        this.state={
            displayButton:false,
            refreshing:true,
            showSearchBar:false,
            updated: false,
        }
        if(Platform.OS === 'android'){
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
          }
        this.articleList = [];
        this.virsualList=[];
        this.offsetY = 0;
        this.barHideState=true;
        this.setHide = props.setHide; // to hide the bottom bar
        this.stackNavigation = props.stackNavigation;
        this.stackRoute = props.stackRoute;
        
    }
    componentDidMount(){
        this.articleList = datalist;
        this.virsualList=[...this.articleList];
        this.setState({refreshing:false});
        // setInterval(()=>{
        //     console.log(this.state.search);
        // },5000)
        
    }
    goToArticleScreen = this.props.stackNavigation.navigate
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.keyWord !== nextProps.keyWord){
            if(nextState.updated === true){
                
                if(nextProps.keyWord !== ""){
                    LayoutAnimation.easeInEaseOut()
                    this.state.showSearchBar = true;
                    let key = nextProps.keyWord.toLowerCase();
                    this.virsualList = this.articleList.filter((item)=>{
                        return (item.title.toLowerCase().indexOf(key)!==-1 || item.subTitle.toLowerCase().indexOf(key)!==-1 );
                    });
                    this._FlatList.scrollToOffset({offset:1, animated:false});
                }else{
                    this.virsualList = this.articleList;
                }
            }else{
                
                if(nextProps.keyWord === "" && this.virsualList.length !== this.articleList.length){
                    this.virsualList = this.articleList;
                }else if(nextProps.keyWord !== "" ){
                    LayoutAnimation.easeInEaseOut()
                    this.state.showSearchBar = true;
                    // console.log(nextProps.keyWord)
                    let key = nextProps.keyWord.toLowerCase();
                    this.virsualList = this.articleList.filter((item)=>{
                        return (item.title.toLowerCase().indexOf(key)!==-1 || item.subTitle.toLowerCase().indexOf(key)!==-1 );
                    });
                    
                }
            }
            return true;
        }
        if(nextState.updated){
            return true;
        }
        if(this.state.displayButton !== nextState.displayButton){
            return true;
        }
        if (this.state.refreshing !== nextState.refreshing){
            return true;
        }
        if (this.state.showSearchBar !== nextState.showSearchBar){
            return true;
        }
       
        return false;
    }
    componentDidUpdate(){
        
        this.state.updated = false;
       
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
            LayoutAnimation.easeInEaseOut()
            this.setHide(true);
            this.barHideState = true;
        }else if (nowOffsetY > this.offsetY && this.barHideState ){
            LayoutAnimation.easeInEaseOut()
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
       
    }
    scrollToTop=()=>{
        this._FlatList.scrollToOffset({offset:0, animated:true});
    }
    dataQequest(){

    }
    resetKeyWord = ()=>{
        
        LayoutAnimation.easeInEaseOut()
        
        global.search.searchTabPage = this.props.type;
        global.search.keyWord = "";
        this.props.resetkeyWord();
        this.setState({showSearchBar:false});

    }
    render(){
        return (
            <>
           <FlatList
           ListHeaderComponent={()=>(this.state.showSearchBar ? <SearchBar  keyWord={this.props.keyWord}   action={this.resetKeyWord} /> :(<></>))}
           refreshing={this.state.refreshing}
           onRefresh={this.reFresh}
           ref={(flatlist)=>{this._FlatList = flatlist}}
           data={this.virsualList}
           onScroll={(event)=>{this.judgeIsDisplay(event)}}
           removeClippedSubviews={true}
           //if list is empty
           ListEmptyComponent={<Find404 />}
           renderItem={({item,index})=>(<ArticleItem type={this.props.type} action={this.goToArticleScreen} index={index} item={item}/>)}
           keyExtractor={(item,index)=>`${index}`}
           ListFooterComponent={()=>(this.virsualList.length !== 0 ?<Footer/>: <></>)}
           />
            {this.state.displayButton ? (<ActionButton
            buttonColor="rgba(0,0,0,0)"
            onPress={this.scrollToTop}
            offsetX={5}
            offsetY={SCREEN_HEIGHT*2/3}
            verticalOrientation="down"
            renderIcon={()=><FLoatButton />}
            hideShadow={true}
            />):null}
           </>
        )
    }

}


export default ArticleList;