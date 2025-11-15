import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
//This page will be for signing users in

export default function createNewUser() {
    const navi = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleReset = ()=> {
      //TODO
    }

  return (
    <View style={styles.body}>
                    <View style={styles.loginContainer}>
                      <Text style={styles.heading}>Reset Password</Text>
          
                      <View style={styles.formGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={(text)=>setPassword(text)}
                          placeholder="Enter your password"
                          secureTextEntry
                        />
                      </View>
          
                      <TouchableOpacity style={styles.loginBtn} onPress={handleReset}>
                        <Text style={styles.loginBtnText}>Reset</Text>
                      </TouchableOpacity>
                      </View>
                  </View>
  );

}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#667eea", // React Native doesn't support gradients directly
    padding: 16,
  },
  loginContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, // for Android shadow
    width: "100%",
    maxWidth: 360,
  },
  heading: {
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
    fontSize: 20,
    fontWeight: "600",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#555",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#667eea",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  extraLinks: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#667eea",
  }

});
