import {
     StyleSheet,
     Dimensions,
} from 'react-native';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        height: 30,
        marginTop: 10,
    },
    leftText:{
        fontSize:15,
        color: 'skyblue',
        left: 20
    },
    rightButton:{
        position: 'absolute',
        right: 20,
        width: 50,
        height: 40
    },
    rightText:{
       right:0,
        fontSize:15,
        color: 'skyblue',
    },
    itemContainer:{
        borderBottomColor:'#d3d7d4',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        height: 40,
        paddingBottom: 4,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent:'space-between'

    },
    itemText:{
        color:'gray',
        fontSize: 16
    },
    iconStyle:{
        marginLeft:2,
        position:'absolute'
    }
});
export default styles;