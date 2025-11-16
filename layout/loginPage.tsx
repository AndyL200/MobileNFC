import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import Protected from '@/components/protectedLoginConf.tsx';
import Login from '@/components/login.tsx';
import AuthService from '@/scripts/authService.js';
import { AuthContext } from '@/components/contexts/AuthContext';

//This page will be for signing users in

export default function LoginPage() {
  const {session, user} = useContext(AuthContext)
  console.log(user)
  // useEffect(() => {
  //   const isLoggedIn = async () => {
  //     setLogin(await AuthService.isLoggedIn())
  //   }
  //   isLoggedIn();
  // }, [login])

  return (
   <>
   <View style={styles.all}>
    {user && session ? <Protected/> : <Login/>}
    </View>
   </> 

  );

}

const styles = StyleSheet.create({
  all : {
    width: '100%',
    height: '100%',
    backgroundColor:'#2d000cff'
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