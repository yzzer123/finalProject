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
                 <View>
                    <UserCommonItem
                        leftIconName='favorite-border'
                        judge={false}
                        IconColor='#f05b72'
                        leftTitle='Favourite'
                    />
                    <UserCommonItem
                        leftIconName='tag-multiple'
                        judge={true}
                        IconColor='#ffc20e'
                        leftTitle='Tag'
                    />
                    <UserCommonItem
                        leftIconName='timetable'
                        judge={true}
                        IconColor='#b76f40'
                        leftTitle='Reading time'
                    />
                    <UserCommonItem
                        leftIconName='history'
                        judge={false}
                        IconColor='#596032'
                        leftTitle='History'
                    />
                </View>
                <View style={{marginTop:10}}>
                    <UserCommonItem
                        leftIconName='settings'
                        judge={true}
                        IconColor='#33a3dc'
                        leftTitle='Setting'
                    />
                    <UserCommonItem
                        leftIconName='people-outline'
                        judge={false}
                        IconColor='#50b7c1'
                        leftTitle='About us'

                    />

                </View>
            </ScrollView>
    )

}

export default UserScreen;