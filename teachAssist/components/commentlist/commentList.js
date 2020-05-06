import React, {Component} from 'react';
import{
    FlatList,
    View,Text,
    Alert,
    BackHandler
} from 'react-native';
import {ListItem,Icon,Input} from 'react-native-elements';
import styles from './style';

const comment = {
    avartar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg",
    user: "yzzer",
    comment: "这是一个测试评论".repeat(10)
}
const comment2 = {
    avartar: "http://imgsrc.baidu.com/forum/w=580/sign=a9714efaaf86c91708035231f93c70c6/ddd3ab59d109b3dea0394e6ac4bf6c81810a4c48.jpg",
    user: "yzzer",
    comment: "这是一个测试评论".repeat(15)

}
const user = {
    avartar: "http://b-ssl.duitang.com/uploads/item/201703/31/20170331090953_zUcaS.jpeg",
    name: "pupu",
}
const comments = [];
for(let i=0;i<5;i++){
    if(i%2)
    comments.push(comment);
    else{
        comments.push(comment2);
        
    }
}

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
    }
    
    componentDidMount(){
        this.setState({comments:[...comments]});
        
        
        setTimeout(()=>{
           
            this.setState({refreshing:false});
        },2000);
    }
    reFresh = ()=>{ // do when freshing
        this.setState({refreshing: true}); 
       
        setTimeout(()=>{
            this.setState({refreshing:false});   
        }, 5000)
       
    }
    onContentSizeChange(event) {
        this.setState({height: event.nativeEvent.contentSize.height});
    }
    submit = ()=>{
        if(this.state.text){
            this.state.comments.push(
                {
                    user:user.name,
                    avartar:user.avartar,
                    comment:this.state.text
                }
            )
           
            this.setState({text:""})
            setTimeout(()=>{

                this._list.scrollToEnd()
            },200)
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
                    style={[styles.input,]}
                    value={this.state.text}
                    onChangeText={(text)=>{this.setState({text:text})}}
                    />
            </View>
        )
    }


}