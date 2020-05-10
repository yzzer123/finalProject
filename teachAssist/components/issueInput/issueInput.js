import React, {useState} from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableNativeFeedback,
    Alert
}from 'react-native';
import {Icon, Button, Input} from 'react-native-elements';
import styles from './style';
// import IssueDetail from '../../pages/issue/issueDetail';

export default IssueInput = ({submitAction, hide})=>{

    let [content, setContent] = useState("");
    let [img, setImg] = useState("");
    let [loading, setLoading] = useState(false)
    return (
        <View style={styles.container}>
            {/*header */}
            <View style={styles.headerContainer}>
            <Text style={styles.header}>New Issue</Text>
            <Icon name="clear" containerStyle={styles.clearIcon}  
            color={global.gColor.themeColor} 
            onPress={hide}
            raised size={14} />
            </View>
            <Input label="Images Links" 
            labelStyle={{color:global.gColor.themeColor}}
            placeholder="split links with ';'"
                containerStyle={styles.imgsInput}
                onChangeText={(text)=>{setImg(text)}}
                inputStyle={styles.imgInput}
            />
            <Input label="Issue" placeholder="input your content here"
            labelStyle={{color:global.gColor.themeColor}}

            containerStyle={styles.content}
            onChangeText={(text)=>{setContent(text)}}
            inputStyle={styles.input}
            multiline={true} />
            <Button
                icon={{
                    name: "check-circle",
                    size: 15,
                    color: "white"
                }}
                buttonStyle={{ backgroundColor:global.gColor.themeColor}}
                raised
                onPress = {()=>{
                    if(content===""){
                        Alert.alert("you haven't input something!");
                    } else{
                        setLoading(true);
                        submitAction(img, content);
                       
                    }
                    
                }}
                containerStyle={styles.submitButton}
                TouchableComponent={TouchableNativeFeedback}
                loading={loading}
                title="Submit"
                />

        </View>
    )
}