import {
    StyleSheet, Dimensions
} from 'react-native';
const width =Dimensions.get('window').width
const styles=StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    image:{
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        borderRadius:40,
        marginBottom:30,
        marginTop:60

    },
    textinput:{
        textAlign:'left',
        alignSelf:'center',
        borderWidth:1,
        borderRadius:4,
        borderColor:'lightgrey',
        backgroundColor:'white',
        marginBottom:1,
        width:width*0.9,
        height:40
    },
    LoginButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'skyblue',
        borderRadius:8,
        height:35,
        width:width*0.9,
        marginBottom:20,
        marginTop:30
    },
    setting:{
        flexDirection:'row',
        width:width*0.9,
        justifyContent:'space-between'
    },
    otherway:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        left:20
    }
})

export default styles;