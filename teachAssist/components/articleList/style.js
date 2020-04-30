import {
    StyleSheet,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width ;
const SCREEN_HEIGHT = Dimensions.get('window').height ;
const styles = StyleSheet.create({
    articleContainer:{
        height: 260,
        backgroundColor: "white",
        width: SCREEN_WIDTH- 30,
        justifyContent: 'flex-start',
        borderRadius: 10,
        marginLeft:15,
        marginRight: 15,
        marginTop:10,
        marginBottom:15,
        flexDirection:'column'
    },
    articleImage:{
        width:SCREEN_WIDTH- 30,
        flex:5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header:{
        marginLeft: 10,
        flex:2,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical:'center'
    },
    subHeader:{
        marginLeft: 10,
        flex:1,
        color: 'gray',
        fontSize: 15,
        textAlignVertical:'top',
    },
    detailContainer:{
        flex:2,
        borderTopWidth:1,
        borderTopColor: '#f6f5ec',
        width:SCREEN_WIDTH-30,
        flexDirection:'row',
        alignContent:'center'
    },
    detailText:{
        fontSize:12,
        textAlignVertical:'center',
        textAlign:'left',
        marginLeft:-7,
        color:"#999d9c"
    },
    time:{
        flex:3,
        flexDirection:'row',

    },
    view:{
        flex:2,
        flexDirection:'row',
    },
    commend:{
        flex:2,
        flexDirection:'row',
    },
    likes:{
        flex:2,
        flexDirection:'row',
    },
    touch:{
        flex:9,
    },
    findnoneIamge:{
        marginTop: 150,
        height: 190,
        resizeMode:'stretch',
        width: 250
    },
    findnoneBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    findnoneText:{
        fontSize: 18,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop: 20,
        color: 'skyblue'
    },
    footer:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:12,
        lineHeight: 20
    },
    floatButton:{
       borderRadius: 12,
       borderWidth:0,
       display:"none"
    }


});

export default styles;
export {SCREEN_WIDTH,SCREEN_HEIGHT};