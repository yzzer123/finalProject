import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StyleSheet
} from 'react-native'
const height=Dimensions.get('window').height
import styles from './styles'

class CollectScr extends Component{
    constructor(props){
        super(props)
        this.state={
            coll:[]
        }
        this.stackNavigation = props.stackNavigation
    }
    componentDidMount(){
        for(let i=0;i<global.user.Collect.length;i++){
            fetch(`http://yzzer.top:5074/articles/${global.user.Collect[i]}`)
            .then((rep)=>rep.json())
            .then((data)=>{
                this.setState({coll:this.state.coll.concat(data)})
            })

    }
    }
    ReturnItem(item){
        return(
            <View>
                <TouchableOpacity onPress={()=>{this.props.stackNavigation.navigate("ArticleScreen",{type:item.type, article:item})}} style={{width:Dimensions.get('window').width}}>
                    <View style={styles.item}>
                 
                       <Image style={styles.image} source={{uri:item.backgroundImageUri}} />
                        <Text style={styles.item}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    
    render(){
        return(
            <View>
                <FlatList 
                    data={this.state.coll}
                    keyExtractor={(item,index)=>index}
                    renderItem={({item})=>this.ReturnItem(item)}
                />
            </View>
        )
    }
}


export default CollectScr