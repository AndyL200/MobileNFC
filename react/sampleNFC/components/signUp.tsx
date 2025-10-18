import React, { useState } from "react";
import AuthService from '../scripts/authService'
import { useRouter } from "expo-router";
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

const SignUp = ()=> {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = () => {
        AuthService.signUp(email, password).then(() => {
            router.push('/')
        })
    }
    return (
        <View>
            <h2>Sign Up</h2>
            <form style={styles.outerbody}>
                <label>Email:</label>
                <TextInput onChangeText={(text)=>{setEmail(text)}}></TextInput>

                <label>Password:</label>
                <TextInput onChangeText={(text)=> {setPassword(text)}}></TextInput>

                <TouchableOpacity onPress={handleSignup}>SignUp</TouchableOpacity>
            </form>
        </View>
    )
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

//For future reference, just use a .css file

export default SignUp