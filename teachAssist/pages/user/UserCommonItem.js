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

export default class UserCommonItem extends Component{

    render(){
        return(
            <View style={styles.containStyle}>
            <TouchableOpacity>
                <View style={styles.leftViewStyle}>
                    <Image style={styles.leftImgStyle} source={this.props.leftIcon} />
                    <Text style={{marginLeft:10}}>
                        {this.props.leftTitle}
                    </Text>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image 
                        style={{width:8,height:13,marginLeft:8,marginRight:10}}
                        source={require('./image/arrows.png')}
                    />
                </View>
            </View>
        )
    }
}
