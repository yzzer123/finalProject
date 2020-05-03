import {
    StyleSheet
} from 'react-native';
export default  styles = StyleSheet.create({
    Web:{
        backgroundColor:'white',
        width:global.gScreen.WIDTH + 20,
        marginLeft: -15,
        marginRight: -20,
        height:500,
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
});