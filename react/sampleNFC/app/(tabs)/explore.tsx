import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

import { useRouter } from 'expo-router';


//This page will be for user input

export default function TabTwoScreen() {

    const router = useRouter();

  const [fn, onChangeFn] = React.useState('')
  const [ln, onChangeLn] = React.useState('')
  const [num, changeNum] = React.useState('')


  const processData = ()=> {
    router.push({ pathname: '/', params: {FirstName: fn, LastName: ln, Tnumber: num}});
  }


  return (
   <>
   <View style={styles.all}>
   <View style={styles.outerbody}>
   <View style={styles.tView}>
    <TextInput 
    style={styles.input}
    onChangeText={onChangeFn}
    value={fn}
    placeholder='First Name'
    />
    <TextInput
    style={styles.input}
    onChangeText={onChangeLn}
    value={ln}
    placeholder='Last Name'
    />

    <TextInput
    style={styles.input}
    onChangeText={changeNum}
    value={num}
    placeholder='T Number'
    keyboardType='numeric'
    />
    

    </View>
    <Button
    title="Submit"
    onPress={processData}
    
    />   
   </View>
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