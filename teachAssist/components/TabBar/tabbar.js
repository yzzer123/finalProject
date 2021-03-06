import React,{Fragment} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import FofIcon from 'react-native-vector-icons/FontAwesome5';
import MtIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles';
import Animated from 'react-native-reanimated';
function MyTabBar({ state, descriptors, navigation, stackNavigation,position,getBarState }) {
    return (
        <View style={styles.TopBarContainer}>
  
      
      <View style={styles.BarIconContainer}>   
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
          });
          
          let nowColor = global.gColor.themeColor;
          if (isFocused){
              nowColor = global.gColor.themeColor;
          }
  
          let TabIcon = "";
          let labelName = "";
          switch(label){
              case "MobileTech":
                  labelName = "MT";
                  nowColor = '#009ad6'
                  TabIcon =()=> ( <MtIcon  name="react"  size={25} color={nowColor}/>);
                  break;
              case "Python":
                  labelName = "PY"
                  nowColor = '#faa755'
                 TabIcon =()=>(<FofIcon name="python"  size={23} color={nowColor}/>);
                  break;
              case "MachineLearn":
                  labelName = "AI"
                  nowColor = "#45b97c"
                  TabIcon =()=> ( <FofIcon name="brain"  size={23} color={nowColor}/>);
                  break;
              case "DataVisual":
                  labelName = "DV"
                  nowColor="#6f599c"
                  TabIcon =()=> ( <FofIcon name="chart-pie"  size={23} color={nowColor}/>);
                  break;       
              
          }
          
          return (
             <Fragment key={index} > 
  
            <TouchableOpacity
              
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
                
              <Animated.View style={[{flexDirection:'row'},{opacity}]} >
                  <TabIcon/>
                  <Text style={[styles.LabBarText,{color:nowColor}]}>{labelName}</Text>
              </Animated.View>
            </TouchableOpacity>
           </Fragment>
          );
        })}
      </View>
      <FofIcon 
       name="search" 
        size={20}
         color= "white"
         style={styles.search}
         onPress={()=>{
           global.search.searchTabPage = global.nowTab;
           stackNavigation.navigate('SearchScreen',{getBarState:getBarState});
           
         }}
      
         />
      </View>
    );
  }
  
  export default MyTabBar;