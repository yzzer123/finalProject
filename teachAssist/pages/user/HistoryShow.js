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
/*     GetHistory = async ()=>{
        try{
          let  history =  await AsyncStorage.getItem('History');
          if(history){
            history = JSON.parse(history);
            this.setState({Lhistory:history})
          }
  
        }catch(e){
  
        }
        
      } */
      ReturnItem(item){
        return(
            <View>
                    <View style={styles.item}>
                 
                       <Image style={styles.image} source={{uri:item.backgroundImageUri}} />
                        <Text style={styles.item}>{item.title}</Text>
                    </View>
            </View>
        )
    }
    GetHistory = async ()=>{
        try{
          let  history =  await AsyncStorage.getItem('History');
          if(history){
            history = JSON.parse(history);
            this.setState({HisList:history})
          }
    
        }catch(e){
    
        }
        
    }
    componentDidMount(){
        for(let i=0;i<this.props.HisList.length;i++){
            fetch(`http://yzzer.top:5074/articles/${this.props.HisList[i]}`)
            .then((repsonse)=>repsonse.json())
            .then((data)=>{
                this.setState({HisArt:this.state.HisArt.concat(data)})
            })
        }
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