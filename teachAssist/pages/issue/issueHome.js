import  React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Alert
}from 'react-native';
import styles from './styles';
import {Icon,ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import CoverLayer from '../../components/bottomLayer/bottomLayer';
import IssueInput from '../../components/issueInput/issueInput';
import {Find404} from '../../components/articleList/article_components';

// const data = [
//     {
//         content: "test".repeat(40),
//         username: "yzzer",
//         time: (new Date()).toLocaleString(),
//         avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
//     },
//     {
//         content: "test1".repeat(50),
//         username: "测试",
//         time: (new Date()).toLocaleTimeString(),
//         avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
//     },
//     {
//         content: "test2".repeat(20),
//         username: "测试",
//         time: (new Date()).toLocaleTimeString(),
//         avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
//     },
//     {
//         content: "test3".repeat(40),
//         username: "pupu",
//         time: (new Date()).toLocaleTimeString(),
//         avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
//     },
//     {
//         content: "test".repeat(30),
//         username: "pupu",
//         time: (new Date()).toLocaleTimeString(),
//         avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
//     },
// ]


// const linearColors = [
//    [ "skyblue","#12D8FA","#1FA2FF"]
// ]


class  IssueHome extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            issueList:[],
            freshing:true,
        }
        this.props.navigation.setOptions({
            headerRight:()=>(
                <Icon name="add" raised color="skyblue" size={15} onPress={this.addIssue} />
            )
        })
        // this.setHide = (bool)=>{
        //     this.props.route.params.TabNavigation.setOptions({tabBarVisible: bool});
            
        // }
       
    }
    componentDidMount(){
        fetch(`${global.server}/issue?_sort=time&_order=desc`)
            .then(rep=>rep.json())
            .then(data=>{
                this.setState({issueList:[...data]})
                this.setState({freshing: false});
            })
            .catch(e=>{
                Alert.alert("好像没有网了")
                this.setState({freshing: false});
            })
        
    }
    addIssue = ()=>{
        // console.log("addissue");
        this.coverLayer.show("center")
    }
    Fresh = ()=>{
        // this.setState({freshing:true});

        let p = new Promise((resolve,reject)=>{
            this.setState({freshing: true});
            return resolve();
        })
        p.then(()=>{
            fetch(`${global.server}/issue?_sort=time&_order=desc`)
            .then(rep=>rep.json())
            .then(data=>{
                this.setState({issueList:[...data]})
                this.setState({freshing: false});
            })
            .catch(e=>{
                Alert.alert("好像没有网了")
                this.setState({freshing: false});
            })
        })
    }
    enterArticle = (index)=>{
        this.props.navigation.navigate("detail",{article:
            this.state.issueList[index]
            
        })


    }
    submitIssue = (imgLinks, content)=>{
        let p = new Promise((resolve,reject)=>{
            var timer = new Date()
            return resolve(timer);
            
        })
        p.then((timer)=>{
            
            fetch(`${global.server}/issue`,{
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json;charset=utf-8"
                },
                body:JSON.stringify({
                    content:content,
                    img:imgLinks,
                    avatar:global.user.usericon_url,
                    time:`${timer.getFullYear()}-${timer.getMonth()+1 > 9? timer.getMonth()+1:`0${timer.getMonth()+1}` }-${timer.getDate()+1 > 9? timer.getDate():`0${timer.getDate()}`} ${timer.toLocaleTimeString()}`,
                    username:global.user.username
                })
            }).then(rep=>{
                
                this.Fresh();
                setTimeout(()=>{
                    this.coverLayer.hide();
                },200)
                
            }).catch(e=>{
                Alert.alert("好像没有网了")
                this.setState({freshing: false});
            })
        })
            fetch(`${global.server}/users/${global.user.id}`,{
                method:"PATCH",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json;charset=utf-8"
                },
                body:JSON.stringify({
                    issues:++global.user.issues
                })
            })
        }
    render(){
        return (
            <View style={{backgroundColor:'white'}}>
           <FlatList 
           ListEmptyComponent={()=>(<Find404 />)}
           style={{backgroundColor:"white"}}
           refreshing={this.state.freshing}
           onRefresh={this.Fresh}
           showsVerticalScrollIndicator = {false}
            removeClippedSubviews={true}
           data={this.state.issueList}
           renderItem={({item,index})=>(
                    <ListItem
                    Component={TouchableScale}
                    onPress={()=>{
                        setTimeout(()=>{

                            this.enterArticle(index);
                        },100)
                    }}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                    colors: ["#33a3dc","#50b7c1"],
                    start: { x: 0.2, y: 0 },
                    end: { x: 1, y: 1 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    leftAvatar={{ rounded: true, source: { uri:item.avatar } }}
                    title={item.username}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    subtitle={`${item.time}\n\n${item.content.length>70? item.content.slice(0,70)+"......":item.content}`}
                    containerStyle={{borderRadius:10,margin:5,alignItems:'flex-start'}}
                    chevron={{ color: 'white' }}
                />
           )}
           keyExtractor={(item,index)=>index}
           ListHeaderComponent={<Image source={{uri:"https://s1.ax1x.com/2020/05/09/YQOOOI.png"}} style={styles.Image} />}
           ListFooterComponent={<Text style={{textAlign:'center'}} >no more ...</Text>}
           />
            <CoverLayer ref={ref => this.coverLayer = ref}
            coverLayerEvent={()=>{this.coverLayer.hide()}}
            coverLayerColor="rgba(0,0,0,0.3)"
            renderContent={()=>(<IssueInput  submitAction={this.submitIssue} hide={()=>{this.coverLayer.hide()}} />)}
          />

           </View>
        )
    }
}

export default IssueHome;