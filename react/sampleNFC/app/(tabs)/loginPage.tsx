import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

import Protected from '@/components/protectedLoginConf';
import Login from '@/components/login';
import AuthService from '@/scripts/authService';

//This page will be for signing users in

export default function TabTwoScreen() {


  return (
   <>
   <View style={styles.all}>
    {AuthService.isLoggedIn() ? <Login/> : <Protected/>}
    </View>
   </> 

  );

}

const styles = StyleSheet.create({
  all : {
    width: '100%',
    height: '100%',
    backgroundColor:'#0e3950ff'
  },
  input : {
  backgroundColor: 'white',
  margin:20,
  padding:5,
  display:'flex'    
  },
  tView : {
    padding: 20,
    flex: 1,
    flexDirection:'row',
    gap:1,
  },
  outerbody: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  }

});