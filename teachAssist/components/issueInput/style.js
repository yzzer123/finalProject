import{
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        width: global.gScreen.WIDTH - 40,
        // height: 350,
        borderRadius:15,
        alignItems:'center'
    },
    content:{
        marginTop: 10,
    },
    header:{
        width:global.gScreen.WIDTH - 40,
        textAlign:"center",
       color:'white',

    },
    imgsInput:{
        marginTop:10,
        
    },
    submitButton:{
        width: global.gScreen.WIDTH/2 - 20,
        marginTop:20,
       marginBottom:20,
    },
    headerContainer:{
        flexDirection:'row',
        backgroundColor:'skyblue',
        width: global.gScreen.WIDTH - 40,
        alignItems:'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 40,
    },
    clearIcon:{
        position:'absolute',
        zIndex: 999,
        right:0
    },
    imgInput:{
        borderWidth:2,
        borderColor:'skyblue',
        fontSize: 15
    },
    input:{
        height:150,
        borderWidth:2,
        borderColor:'skyblue',
        textAlignVertical: 'top',
        fontSize: 15

    }

});