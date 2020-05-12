import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import styles from './styles'
const width=Dimensions.get('window').width
export default class UserHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            issues:'',
            comments:'',
            favorite:''
        }
        setInterval(() => {
            fetch("http://yzzer.top:5074/users/1")
            .then(rep=>rep.json())
            .then(data=>{this.setState({issues:data.issues,comments:data.comments})})
            .then(()=>{
                fetch("http://yzzer.top:5074/favorite/1")
                .then(rep=>rep.json())
                .then(data=>{
                    this.setState({favorite:data.list.length})
                })
            })
        },240);
    }

    componentDidMount(){
        fetch("http://yzzer.top:5074/users/1").then(rep=>rep.json())
        .then(data=>{
            this.setState({issues:data.issues,comments:data.comments})
        })
        .then(()=>{
            fetch("http://yzzer.top:5074/favorite/1").then(rep=>rep.json())
            .then(data=>{
                this.setState({favorite:data.list.length})
            })
        }
        )
    }
    render(){
        return(
            <View style={styles.HeadcontainStyle}>
                {this.TopView()}
                {this.BottomView()}
            </View>
        )
    }
    TopView(){
        return(
            <View style={[styles.topViewStyleView,{marginTop:35}]} >
                <Image 
                    style={styles.leftIconStyle}
                    source={require('./image/avatar.jpg')}
                />
                <View style={styles.centerViewStyle}>
                    <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                        {global.user.username}
                    </Text>

                </View>
            </View>
        )
    }
    BottomItem(){
        var Array=[]
        var num=[this.state.issues,this.state.comments,this.state.favorite]
        var data=[
                    {'number':num[0],'title':'issues'},
                    {'number':num[1],'title':'commments'},
                    {'number':num[2],'title':'favourite'}
                ]
                for(var i =0;i<data.length;i++){
                    var item = data[i];
                    Array.push(
                        <View key={i} style={styles.bottomInnerStyle}>
                            <Text  style={{color:'black'}}>{item.number}</Text>
                            <Text style={{color:'black'}}>{item.title}</Text>
                        </View>
                    )
                }
        return Array
    }
    BottomView(){
        return (
            <View style={styles.bottomViewStyle}>
                {this.BottomItem()}
            </View>
        )
    }
}

