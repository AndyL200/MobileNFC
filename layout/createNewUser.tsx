import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { ThemedText } from '@/components/themed-text';

import SignUp from '@/components/signUp';

//This page will be for signing users in

export default function CreateNewUser() {


  return (
   <>
   <View style={styles.all}>
    <SignUp/>
    </View>
   </> 

  );

}

const styles = StyleSheet.create({
  all : {
    width: '100%',
    height: '100%',
    backgroundColor: '#667eea'
  },
  input : {
    backgroundColor: '#fff',
    margin: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  tView : {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  outerbody: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }

});