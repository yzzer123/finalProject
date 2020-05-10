// 2018170056 2020-4-26

import {
    StyleSheet,
    Dimensions
} from 'react-native';

const styles = StyleSheet.create({
    testContainer:{
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "skyblue"
    },
    Image:{
        width:global.gScreen.WIDTH,
        height:140,
    },
    inputContainer:{
        borderTopWidth:1,
        borderColor:"#f6f5ec",
        flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',
       backgroundColor:'white',
      
        
    },
    titleContainer:{
        marginHorizontal:15,
        marginTop:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },  
    detailContainer:{
        flex:1
    },
    content:{
        width:global.gScreen.WIDTH-30,
        backgroundColor:"white",
        paddingHorizontal:20,
        fontSize: 18,
        marginHorizontal:15,
        paddingBottom:10,
    },
    imgStyle:{
        width:global.gScreen.WIDTH-40,
        marginBottom:5,
        marginHorizontal:5,
    },
    ImageContainer:{
        backgroundColor:"white",
        width:global.gScreen.WIDTH-30,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginHorizontal:15,
        paddingBottom:15,
    },
    ScrollStyle:{
      
    },
    commentsStyle:{
        alignItems:'flex-start',
        marginHorizontal:15,
        marginVertical:5,
        borderRadius: 15,
    }

});

export default styles;