import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles'

class HistoryShow extends Component{
    constructor(props){
        super(props);
        this.state={
            HisArt:[],
            HisList:[]
        }
        this.stackNavigation=props.stackNavigation
    }
      ReturnItem(item){
        if(item.title!==undefined)
            return(
                <View>
                        <View style={styles.item}>
                        <Image style={styles.image} source={{uri:item.backgroundImageUri}} />
                            <Text style={styles.item}>{item.title}</Text>
                        </View>
                </View>
            )
    }
    componentWillMount(){
        AsyncStorage.getItem("History")
        .then((value)=>{
        if(value!==null){
        this.setState({HisList:value});
        }
    })
    .then(()=>{
        for(let i=0;i<this.state.HisList.length;i++){
            fetch(`http://yzzer.top:5074/articles/${this.state.HisList[i]}`)
            .then((repsonse)=>repsonse.json())
            .then((data)=>{
                this.setState({HisArt:this.state.HisArt.concat(data)})
            })
        }
    })
    .catch((error)=>{
      console.warn(error)
    }).done();
    }
    render(){
        if(this.state.HisArt!==0)
        {
        
            return(
                <View>
                    <FlatList 
                        data={this.state.HisArt}
                        keyExtractor={(item,index)=>index}
                        renderItem={({item})=>this.ReturnItem(item)}
                    />
                </View>
        )
        }
        else
        return(
            <View>
                <Text style={styles.findnoneText}>(ŎдŎ；)Oh, here is nothing!</Text>
            </View>
        )
    }
}


export default HistoryShow;