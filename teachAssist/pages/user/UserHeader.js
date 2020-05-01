import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import styles from './styles'
const width=Dimensions.get('window').width
export default class UserHeader extends Component{
    constructor(Props){
        super(Props)
        this.state={
            name:'Dzper'
        }
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
            <View style={styles.topViewStyleView} >
                <Image 
                    style={styles.leftIconStyle}
                    source={require('./image/avatar.jpg')}
                />
                <View style={styles.centerViewStyle}>
                    <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                        {this.state.name}
                    </Text>

                </View>
                <TouchableOpacity>
                    <Image 
                        style={{marginRight:15,height:30,width:10}}
                        source={require('./image/arrows.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    BottomItem(){
        var Array=[]
        var data=[
                    {'number':'33','title':'articles'},
                    {'number':'133','title':'commments'},
                    {'number':'133','title':'collect'}
                ]
                for(var i =0;i<data.length;i++){
                    var item = data[i];
                    Array.push(
                        <View key={i} style={styles.bottomInnerStyle}>
                            <Text style={{color:'white'}}>{item.number}</Text>
                            <Text style={{color:'white'}}>{item.title}</Text>
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

