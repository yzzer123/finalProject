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

import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IIcon from 'react-native-vector-icons/MaterialIcons'


export default class UserCommonItem extends Component{

    render(){
        return(
            <View style={styles.containStyle}>
            <TouchableOpacity style={{width:Dimensions.get('window').width}}>
                {
                    this.props.judge==true?
                    <View style={styles.leftViewStyle}>
                        <CIcon 
                            style={styles.leftImgStyle} 
                            name={this.props.leftIconName}
                            color={this.props.IconColor}
                            size={30}
                            />
                        {/* <Image style={styles.leftImgStyle} source={this.props.leftIcon} /> */}
                        <Text style={{marginLeft:10}}>
                            {this.props.leftTitle}
                        </Text>
                    </View> 
                    :
                    <View style={styles.leftViewStyle}>
                        <IIcon 
                            style={styles.leftImgStyle}
                            name={this.props.leftIconName}
                            color={this.props.IconColor}
                            size={30}  
                        />
                       {/*  <Image style={styles.leftImgStyle} source={this.props.leftIcon} /> */}
                        <Text style={{marginLeft:10}}>
                            {this.props.leftTitle}
                        </Text>
                    </View> 
                }
            </TouchableOpacity>
            </View>
// {/*                 <View style={styles.leftViewStyle}>
//                     <Image style={styles.leftImgStyle} source={this.props.leftIcon} />
//                     <Text style={{marginLeft:10}}>
//                         {this.props.leftTitle}
//                     </Text>
//                 </View>
//                 </TouchableOpacity>

//                 <View style={{flexDirection:'row',alignItems:'center'}}>
//                     <Image 
//                         style={{width:8,height:13,marginLeft:8,marginRight:10}}
//                         source={require('./image/arrows.png')}
//                     />
//                 </View> */}
        )
    }
}
