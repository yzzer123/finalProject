import React,{Component} from 'react';
import { 
    Dimensions ,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import styles from './styles';
import CIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IIcon from 'react-native-vector-icons/MaterialIcons'
import functions from './UserFunctions'
import UserHeader from './UserHeader'

const UserPages = ({navigation})=>{
    const list=functions
    return (
        <View Style={styles.scrollViewStyle}>
                <UserHeader/>
                <View style={[styles.containStyle,{marginTop:10}]}>
                <TouchableOpacity  onPress={() => navigation.navigate('Collect')} style={{width:Dimensions.get('window').width}}>
                   <View style={styles.leftViewStyle}>
                        <IIcon 
                            style={styles.leftImgStyle} 
                            name={list[0].leftIconName}
                            color={list[0].IconColor}
                            size={35}
                            />
                        <Text style={{marginLeft:15,fontSize:20}} >
                            {list[0].leftTitle}
                        </Text>
                    </View> 
                 </TouchableOpacity>
            </View>
            <View style={styles.containStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Reading-time')} style={{width:Dimensions.get('window').width}}>
                   <View style={styles.leftViewStyle}>
                        <CIcon 
                            style={styles.leftImgStyle} 
                            name={list[1].leftIconName}
                            color={list[1].IconColor}
                            size={35}
                            />
                        <Text style={{marginLeft:15,fontSize:20}}>
                            {list[1].leftTitle}
                        </Text>
                    </View> 
                 </TouchableOpacity>
            </View>
            <View style={styles.containStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('History')} style={{width:Dimensions.get('window').width}}>
                   <View style={styles.leftViewStyle}>
                        <CIcon 
                            style={styles.leftImgStyle} 
                            name={list[2].leftIconName}
                            color={list[2].IconColor}
                            size={35}
                            />
                        <Text style={{marginLeft:15,fontSize:20}}>
                            {list[2].leftTitle}
                        </Text>
                    </View> 
                 </TouchableOpacity>
            </View>
            <View style={styles.containStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={{width:Dimensions.get('window').width}}>
                   <View style={styles.leftViewStyle}>
                        <CIcon 
                            style={styles.leftImgStyle} 
                            name={list[3].leftIconName}
                            color={list[3].IconColor}
                            size={35}
                            />
                        <Text style={{marginLeft:15,fontSize:20}}>
                            {list[3].leftTitle}
                        </Text>
                    </View> 
                 </TouchableOpacity>
            </View>
            <View style={styles.containStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('About-us')} style={{width:Dimensions.get('window').width}}>
                   <View style={styles.leftViewStyle}>
                        <IIcon 
                            style={styles.leftImgStyle} 
                            name={list[4].leftIconName}
                            color={list[4].IconColor}
                            size={35}
                            />
                        <Text style={{marginLeft:15,fontSize:20}}>
                            {list[4].leftTitle}
                        </Text>
                    </View> 
                 </TouchableOpacity>
            </View>
            <Text style={{textAlign:'center',marginTop:20}}>Teaching-Assistant</Text>
        </View>
    )

}

export default UserPages;