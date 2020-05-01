// 2018170056 2020-4-26
import  React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StatusBar
}from 'react-native';
import styles from './styles'
import UserCommonItem from './UserCommonItem'
import UserHeader from './UserHeader'

const UserScreen = ()=>{

    return (
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <StatusBar
                    backgroundColor={'skyblue'}
                    animated={true}
                    hidden={false}
                    barStyle=''
                />
                <UserHeader/>
{/*                 <View>
                    <UserCommon />
                </View> */}
                 <View>
                    <UserCommonItem
                        leftIcon={require('./image/favourite.png')}
                        leftTitle='Favourite'
                    />
                    <UserCommonItem
                        leftIcon={require('./image/post.png')}
                        leftTitle='Post'
                    />
                    <UserCommonItem
                        leftIcon={require('./image/attention.png')}
                        leftTitle='Attention'
                    />
                </View>
                <View>
                    <UserCommonItem
                        leftIcon={require('./image/github.png')}
                        leftTitle='Friends'
                    />
                    <UserCommonItem
                        leftIcon={require('./image/footprint.png')}
                        leftTitle='Footprint'
                    />
                    <UserCommonItem
                        leftIcon={require('./image/email.png')}
                        leftTitle='Email'

                    />

                </View>
                <View >
                    <UserCommonItem
                        leftIcon={require('./image/setting.png')}
                        leftTitle='Setting'
                    />
                </View> 
            </ScrollView>
    )

}

export default UserScreen;