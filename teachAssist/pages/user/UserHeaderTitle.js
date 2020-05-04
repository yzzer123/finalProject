import React,{Component} from 'react';
import{
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles'

import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IIcon from 'react-native-vector-icons/MaterialIcons'
import functions from './UserFunctions'

const FavTitle=()=>{
    return(
        <View style={styles.TitleStyle}>
            <IIcon name={functions[0].leftIconName} style={styles.LogoStyle} size={30} color={functions[0].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[0].leftTitle}</Text>
        </View>
        )
}

const TagTitle=()=>{
    return(
        <View style={styles.leftViewStyle}>
            <CIcon name={functions[1].leftIconName} style={styles.LogoStyle} size={30} color={functions[1].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[1].leftTitle}</Text>
        </View>
        )
}

const RedTitle=()=>{
    return(
        <View style={styles.leftViewStyle}>
            <CIcon name={functions[2].leftIconName} style={styles.LogoStyle} size={30} color={functions[2].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[2].leftTitle}</Text>
        </View>
        )
}

const HisTitle=()=>{
    return(
        <View style={styles.leftViewStyle}>
            <CIcon name={functions[3].leftIconName} style={styles.LogoStyle} size={30} color={functions[3].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[3].leftTitle}</Text>
        </View>
        )
}

const SetTitle=()=>{
    return(
        <View style={styles.leftViewStyle}>
            <CIcon name={functions[4].leftIconName} style={styles.LogoStyle} size={30} color={functions[4].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[4].leftTitle}</Text>
        </View>
        )
}

const AboTitle=()=>{
    return(
        <View style={styles.leftViewStyle}>
            <IIcon name={functions[5].leftIconName} style={styles.LogoStyle} size={30} color={functions[5].IconColor} />
            <Text style={{marginLeft:10,fontSize:20,color:'white',fontWeight:'bold'}}>{functions[5].leftTitle}</Text>
        </View>
        )
}

export {FavTitle,TagTitle,RedTitle,HisTitle,SetTitle,AboTitle}