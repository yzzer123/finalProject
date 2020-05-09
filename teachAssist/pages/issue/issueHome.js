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

const data = [
    {
        content: "test".repeat(40),
        username: "yzzer",
        time: (new Date()).toLocaleString(),
        avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
    },
    {
        content: "test1".repeat(50),
        username: "测试",
        time: (new Date()).toLocaleTimeString(),
        avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
    },
    {
        content: "test2".repeat(20),
        username: "测试",
        time: (new Date()).toLocaleTimeString(),
        avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
    },
    {
        content: "test3".repeat(40),
        username: "pupu",
        time: (new Date()).toLocaleTimeString(),
        avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
    },
    {
        content: "test".repeat(30),
        username: "pupu",
        time: (new Date()).toLocaleTimeString(),
        avatar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg"
    },
]


const linearColors = [
   [ "skyblue","#12D8FA","#1FA2FF"]
]


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
    }
    componentDidMount(){
        fetch(`${global.server}/issue`)
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
        console.log("addissue");
    }
    Fresh = ()=>{
        // this.setState({freshing:true});

        let p = new Promise((resolve,reject)=>{
            this.setState({freshing: true});
            return resolve();
        })
        p.then(()=>{
            fetch(`${global.server}/issue`)
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
    enterArticle = ()=>{
        console.log("hello")
    }
    render(){
        return (
           <FlatList 
           refreshing={this.state.freshing}
           onRefresh={this.Fresh}
           showsVerticalScrollIndicator = {false}
            removeClippedSubviews={true}
           data={data}
           renderItem={({item,index})=>(
                    <ListItem
                    Component={TouchableScale}
                    onPress={()=>{
                        setTimeout(()=>{

                            this.enterArticle();
                        },100)
                    }}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                    colors: ["#00dbde","#00c7ff"],
                    start: { x: 1, y: 1 },
                    end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    leftAvatar={{ rounded: true, source: { uri:item.avatar } }}
                    title={item.username}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    subtitle={`${item.time}\n${item.content.length>50? item.content.slice(0,50)+"......":item.content}`}
                    containerStyle={{borderRadius:10,margin:5,alignItems:'flex-start'}}
                    chevron={{ color: 'white' }}
                />
           )}
           keyExtractor={(item,index)=>index}
           ListHeaderComponent={<Image source={{uri:"https://s1.ax1x.com/2020/05/09/YQOOOI.png"}} style={styles.Image} />}
           ListFooterComponent={<Text style={{textAlign:'center'}} >no more ...</Text>}
           />
        )
    }
}

export default IssueHome;