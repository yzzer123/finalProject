import {
    StyleSheet,
    Dimensions
} from 'react-native';

const width=Dimensions.get('window').width
const styles = StyleSheet.create({
    bottomViewStyle:{
        flexDirection:'row',
        position:'absolute',
        bottom:0
    }
    ,
    bottomInnerStyle:{
        width:(width/3)+1,
        backgroundColor:'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'white'
    },
    centerViewStyle:{
        flexDirection: 'row',
        width: width*0.75,
        alignItems: 'center',
        marginLeft:15
    }
    ,
    leftIconStyle:{
        width:70,
        height: 70,
        borderRadius:35,
        borderWidth:3,
        borderColor:'rgba(255,255,255,1)'
    },
    topViewStyleView:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-around",
        marginTop: 20,
        marginLeft:15
    },
    HeadcontainStyle:{
        height:150,
        backgroundColor:'skyblue',

    },
    leftImgStyle:{
        width:30,
        height:30,
        marginLeft:6,
        borderRadius:12
    }
    ,
    leftViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:8,
    },

    containStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        alignItems:'center',
        height:40,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth:0.5,
    },
    scrollViewStyle:{
        backgroundColor:'#e8e8e8',
    },
    TitleStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:1,
    },
    LogoStyle:{
        width:30,
        height:30,
        marginLeft:63,
        borderRadius:12
    }
});

export default styles;
