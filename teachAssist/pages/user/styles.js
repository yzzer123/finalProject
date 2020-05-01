import {
    StyleSheet,
    Dimensions
} from 'react-native';

const width=Dimensions.get('window').width
const styles = StyleSheet.create({
    bottomViewStyle:{
        flexDirection:'row',
        //绝对定位，距离父控件底部距离为0，
        // 注意绝对定位是相对于父组件，而不是相对于屏幕
        position:'absolute',
        bottom:0
    }
    ,
    bottomInnerStyle:{
        //宽度是三分之一宽度+分割线；不能写flex=1；
        //flex是填充剩余的宽度，比如我们有一个控件，那么
        //flex=1就会match_parent;
        //如果另外的控件距离都已经确定，那么flex=1就是
        //填充整个剩余的空间
        width:(width/3)+1,
        height:40,
        backgroundColor:'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems:'center',
        //边距
        borderRightWidth:1,
        borderRightColor:'white'
    },
    centerViewStyle:{
        //横向
        flexDirection: 'row',
        //屏幕宽的的0.75倍
        width: width*0.75,
        alignItems: 'center',
        marginLeft:15
    }
    ,
    leftIconStyle:{
        width:70,
        height: 70,
        //设置圆角
        borderRadius:35,
        //环状效果
        borderWidth:3,
        borderColor:'rgba(255,255,255,1)'
    },
    topViewStyleView:{
        //主轴从左向右
      flexDirection: "row",
        //交叉轴居中
        alignItems:"center",
        //子元素的间距
        justifyContent:"space-around",
        //距离上面有一段距离
        marginTop: 20,
        marginLeft:15
    },
    HeadcontainStyle:{
        height:150,
        //红色，绿色，蓝色以及透明度
        backgroundColor:'skyblue',

    },
    leftImgStyle:{
        width:30,
        height:30,
        marginLeft:6,
        //圆形图片
        borderRadius:12
    }
    ,
    leftViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:8,
    },

    containStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        alignItems:'center',
        height:40,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth:0.5,
    },
    MidcontainStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        alignItems:'center',
        height:60,
        paddingLeft: 20,
        paddingRight: 20,

    },
    scrollViewStyle:{
        backgroundColor:'#e8e8e8',
    }
    ,
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

export default styles;
