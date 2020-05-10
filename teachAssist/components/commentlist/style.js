import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container:{
        width:global.gScreen.WIDTH,
        height:global.gScreen.HEIGHT * 5/6 ,
        backgroundColor:'white',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    header:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height: 50
    },
    headerIcon:{
        marginLeft: 10
    },
    headerTitle:{
        marginLeft: 20
    },
    inputContainer:{
        
        borderTopWidth:1,
        borderColor:"#f6f5ec",
        flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',
       
        
    }
});