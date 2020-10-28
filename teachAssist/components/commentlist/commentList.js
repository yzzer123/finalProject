import React, {Component} from 'react';
import{
    FlatList,
    View,Text,
    Alert,
    BackHandler
} from 'react-native';
import {ListItem,Icon,Input} from 'react-native-elements';
import styles from './style';


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
// const user = {
//     avartar: "http://b-ssl.duitang.com/uploads/item/201703/31/20170331090953_zUcaS.jpeg",
//     name: "pupu",
// }
// const comments = [];
// for(let i=0;i<5;i++){
//     if(i%2)
//     comments.push(comment);
//     else{
//         comments.push(comment2);
        
//     }
// }

const Header = ({action})=>{
    return (
        <View style={styles.header}>
            <Icon 
            onPress={()=>{action()}}
            containerStyle={styles.headerIcon} name="clear" size={30} color={global.gColor.themeColor}/>
            <Text style={styles.headerTitle} >COMMENTS</Text>
        </View>
    )
}


export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments:[],
            updated:false,
            refreshing:true,
            text:""
        }
        this.article = this.props.article;
    }
    
    componentDidMount(){
        setTimeout(()=>{
            fetch(`${global.server}/comments?articleid=${this.article.id}`)
            .then(rep=>rep.json())
            .then(data=>{
                
                this.setState({comments: [...data],refreshing:false})
    
               
            }).catch(e=>{Alert.alert(e)})     
        },200)
    
    }
    reFresh = ()=>{ // do when freshing
        let p = new Promise((resolve,reject)=>{
            this.setState({refreshing: true});
            return resolve();
        })
        p.then(()=>{
            fetch(`${global.server}/comments?articleid=${this.article.id}`)
            .then(rep=>rep.json())
            .then(data=>{
                this.setState({comments: [...data]})
                this.setState({refreshing:false});
            }).catch(e=>{Alert.alert(e)})
        })
    }
    onContentSizeChange(event) {
        this.setState({height: event.nativeEvent.contentSize.height});
    }
    submit = ()=>{
        this.setState({text:""})
        if(this.state.text){
            fetch(`${global.server}/comments`,
            {
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json;charset=utf-8"
                  },
                body:JSON.stringify({
                    user:global.user.username,
                    avartar:global.user.usericon_url,
                    comment:this.state.text,
                    articleid:this.article.id
                })
            }).then((rep)=>{
                fetch(`${global.server}/comments?articleid=${this.article.id}`)
                .then(rep=>rep.json())
                .then(data=>{
                    this.setState({comments: [...data]})
                    this.setState({updated:!this.state.updated})
                    setTimeout(()=>{
                        this._list.scrollToEnd()

                    },100);
                }).catch(e=>{Alert.alert(e)})
                fetch(`${global.server}/users/${global.user.id}`,{
                    method:"PATCH",
                    headers:{
                        'Accept': 'application/json',
                        "Content-Type": "application/json;charset=utf-8"
                      },
                    body:JSON.stringify({
                        comments:++global.user.comments
                    })
                }).catch(e=>{Alert.alert(e)})
                
                fetch(`${global.server}/articles/${this.article.id}`)
                .then(rep=>rep.json())
                .then(data=>{
                    fetch(`${global.server}/articles/${this.article.id}`,{
                        method:"PATCH",
                        headers:{
                            'Accept': 'application/json',
                            "Content-Type": "application/json;charset=utf-8"
                          },
                        body:JSON.stringify({
                            commends:data.commends+1
                        })
                    }).then(()=>{
                        this.props.add();
                    })
                    .catch(e=>{Alert.alert(e)})
                    fetch(`${global.server}/hash/${getId(this.article.type) }`,
                        {method:"PATCH",
                        headers:{
                            'Accept': 'application/json',
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        body:JSON.stringify({
                            hash_value:`${global.user.username}${(new Date()).getTime()%10000000}${Math.floor(Math.random()*10000)}`
                        })}).catch((e)=>{Alert.alert(e)})
                }).catch(e=>{Alert.alert(e)})
            })
            .catch((e)=>{Alert.alert(e)});
        }else{
            Alert.alert("你还什么都没输入呢")
        }
        this.input.blur();
    }
    render(){
        return (
            <View style={styles.container}>
                <Header action={this.props.hide} />
                 <FlatList
                     onRefresh={this.reFresh}
                    refreshing={this.state.refreshing}
                    ref={(flatlist)=>{this._list = flatlist}}
                    data={this.state.comments}
                    keyExtractor={(item,index)=>`${index}`}
                    renderItem={({item})=>{
                        return(
                            <ListItem
                            containerStyle={{alignItems:'flex-start'}}
                            leftAvatar={{ rounded: true, source: { uri: item.avartar } }}
                            title={item.user}
                            titleStyle={{fontSize:20}}
                            subtitle={item.comment}
                            bottomDivider
                            removeClippedSubviews={true}
                            />
                        )
                    }}
                    ListEmptyComponent={()=>(<Text style={{textAlign:'center'}} >暂无评论</Text>)}
                /> 
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
            </View>
        )
    }


}