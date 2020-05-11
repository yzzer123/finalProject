import  React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert
}from 'react-native';

import styles from './styles';
import  {Input,ListItem} from 'react-native-elements';

const getImgH = (link, width)=>{
   

    Image.getSize(link,(w,h)=>{
        
       var ImgH = Math.floor(h/w*width) + 1;
    }).then(()=>{
        
    })
    return 200;
    
}

export default class IssueDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            text:"",
            comments:[],
            issue:this.props.route.params.article,
            updated:true,
            comments:[]
        }
        this.height = [];
        this.imgs = [];
    }
    componentDidMount(){
        
        this.props.route.params.TabNavigation.setOptions({tabBarVisible: false});
        this.imgs = this.state.issue.img.split(";").filter((value)=>(value.length > 10 && (value.startsWith('https://')||value.startsWith('http://'))))
        for(let i =0;i < this.imgs.length;i++){
            Image.getSize(this.imgs[i],(w,h)=>{
                
                this.height.push( Math.floor(h/w*(global.gScreen.WIDTH - 40)) +1) ;
               
                this.setState({updated:!this.state.updated});
            })
        }
        fetch(`${global.server}/issueComments?issueid=${this.state.issue.id}&_sort=time`)
            .then(rep=>rep.json())
            .then(data=>{
                this.setState({comments:data});
            }).catch(e=>{Alert.alert("好像没网啦")})
    }
    componentWillUnmount(){
        this.props.route.params.TabNavigation.setOptions({tabBarVisible: true});
      
    }
    submit = ()=>{
        this.input.blur()
        if(this.state.text !== ""){
            let p = new Promise((resolve,reject)=>{
                return resolve(new Date())
            })
            p.then(timer=>{
                fetch(`${global.server}/issueComments`,{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body:JSON.stringify({
                        issueid:this.state.issue.id,
                        avatar:global.user.usericon_url,
                        username:global.user.username,
                        time:`${timer.getFullYear()}-${timer.getMonth()+1 > 9? timer.getMonth()+1:`0${timer.getMonth()+1}` }-${timer.getDate()+1 > 9? timer.getDate():`0${timer.getDate()}`} ${timer.toLocaleTimeString()}`,
                        content:this.state.text
                    })
                }).then(rep=>{
                    fetch(`${global.server}/issueComments?issueid=${this.state.issue.id}&_sort=time`)
                        .then(rep=>rep.json())
                        .then(data=>{
                            this.setState({comments:data,text:""});
                            setTimeout(()=>{
                                this._view.scrollToEnd()
                            },200)
                        }).catch(e=>{Alert.alert("好像没网啦")})
                })
                fetch(`${global.server}/users/${global.user.id}`,{method:"PATCH",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body:JSON.stringify({
                        comments:++global.user.comments
                    })
                })
            })
        }else{
            Alert.alert("不能发送空字符");
        }
    }
    render(){
        return(
            <>  
               <ScrollView style={styles.ScrollStyle} ref={(view)=>{this._view = view}} >
                 <ListItem
                    containerStyle={styles.titleContainer}
                    leftAvatar={{ rounded: true, source: { uri:this.state.issue.avatar } }}
                    title={this.state.issue.username}
                    titleStyle={{ color: 'skyblue', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'gray' }}
                    subtitle={this.state.issue.time}
                />
                <Text style={styles.content}>{"     "+this.state.issue.content}</Text>
                <View style={styles.ImageContainer}>
                {
                    this.imgs.map((value, index)=>{
                        
                    
                        return (
                            <Image 
                            source={{uri:value}}
                            style={[styles.imgStyle,{height:this.height[index]}]}
                            />
                        )
                    })
                }
                </View>
                {
                    this.state.comments.map((value,index)=>{
                     
                        return(<ListItem
                            containerStyle={styles.commentsStyle}
                            leftAvatar={{ rounded: true, source: { uri:value.avatar } }}
                            title={value.username}
                            titleStyle={{ color: 'skyblue', fontWeight: 'bold' }}
                            subtitleStyle={{ color: 'gray' }}
                            subtitle={`${value.time}\n${value.content}`}
                        />)
                    })
                }
                </ScrollView>
                 <Input
                    ref={(input)=>{this.input = input}}
                    placeholder="comment"
                    returnKeyType="send"
                    containerStyle={styles.inputContainer}
                    rightIcon={{ name: 'send',color:global.gColor.themeColor,onPress:this.submit }}
                    value={this.state.text}
                    onChangeText={(text)=>{this.setState({text:text})}}
                    onSubmitEditing={(event)=>{this.submit()}}
                    />
            </>
        )
    }
}

// export default IssueDetail;
