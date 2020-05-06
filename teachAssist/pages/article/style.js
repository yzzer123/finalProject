import {
    StyleSheet,
    Dimensions
} from 'react-native';
export default  styles = StyleSheet.create({
    Web:{
        backgroundColor:'white',
        width:global.gScreen.WIDTH,
        marginTop: -120,
        zIndex: -2,
        
    },
    findnoneIamge:{
        marginTop: 150,
        height: 190,
        resizeMode:'stretch',
        width: 250
    },
    findnoneBox:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        position: 'absolute',
        width: global.gScreen.WIDTH ,
        top:0,
        left:0,
    },
    findnoneText:{
        fontSize: 18,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop: 20,
        color: 'skyblue'
    },
    safeAreaView:{
        flex:1,
        backgroundColor:'white'
    },
    Loading:{
        position: 'absolute',
        width: global.gScreen.WIDTH ,
        top: global.gScreen.HEIGHT /2 -30,
        left:0,
    },
    ImageStyle:{
        width: global.gScreen.WIDTH,
        height: 170,
    
  
    },
    commentBarContainer:{
        flexDirection:'row',
        alignItems:'center',
        height: 50,
        width:global.gScreen.WIDTH,
        justifyContent:'space-around',
        backgroundColor: 'white',
        borderColor: '#f6f5ec',
        borderTopWidth:1,
    },
    commentIcon:{
        justifyContent:'center',
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        textAlign: 'center',
    },
    likeIcon:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        textAlign: 'center',
        alignItems:'center',
    },
    collectIcon:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        flex:1,
    }
});