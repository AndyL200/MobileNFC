import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

import {NFC_Context} from '@/components/contexts/nfcContext';
import {NFC_Ready} from '@/components/contexts/nfcContext';


function processData(fn : string, ln : string, Tnum : string)
{
  <>
  <NFC_Context value={{"FirstName" : fn, "LastName": ln, "Tnumber": Tnum}} />
  <NFC_Ready value={true} />
  </>
}
//This page will be for user input

export default function TabTwoScreen() {
  const [fn, onChangeFn] = React.useState('')
  const [ln, onChangeLn] = React.useState('')
  const [num, changeNum] = React.useState('')





  return (
   <>
   <View style={styles.all}>
   <View style={styles.outerbody}>
   <div style={styles.tView}>
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
    

    </div>
    <Button
    title="Submit"
    onPress={() => {processData(fn, ln, num)}}
    
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