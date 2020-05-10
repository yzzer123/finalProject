import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Login from './Login'

const loginAss=({navigation})=>{
    return(
            <Login stackNavigation={navigation} />
    )
}

export default loginAss