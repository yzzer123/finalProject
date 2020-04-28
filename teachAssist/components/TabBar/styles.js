

import {
    StyleSheet,
    Dimensions
} from 'react-native';

const styles = StyleSheet.create({
    TopBarContainer:{  // the whole tab style
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor:"white",
        height:50, 
        alignItems: 'center',
    },
    LabBarText:{ // label text
        fontSize: 10,
        fontWeight: "bold",
        textAlignVertical: 'center',
        marginLeft: 5
    },
    BarIconContainer:{ // the container of four tabs
        width: Dimensions.get('window').width*3/4,
        flexDirection:'row',

    },
    search:{ // search button
        position:'absolute',
        right: 16,
        bottom: 8,
    }
    
});
export default styles;