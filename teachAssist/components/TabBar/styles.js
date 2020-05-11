

import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    TopBarContainer:{  // the whole tab style
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor:"skyblue",
        height:87, 
        alignItems: 'flex-end',
    },
    LabBarText:{ // label text
        fontSize: 10,
        fontWeight: "bold",
        textAlignVertical: 'center',
        marginLeft: 5
    },
    BarIconContainer:{ // the container of four tabs
        width: global.gScreen.WIDTH*3/4,
        flexDirection:'row',
        marginBottom: 13
    },
    search:{ // search button
        position:'absolute',
        right: 16,
        bottom: 8,
    }
    
});
export default styles;