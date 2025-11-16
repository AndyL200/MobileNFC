import React, { useState, useContext } from "react";
import { AuthContext } from "@/components/contexts/AuthContext.tsx";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from 'react-native';
import authService from "@/scripts/authService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


const StudentForm = () => {
  const navi = useNavigation();
  const { session, user, refreshUser } = useContext(AuthContext);
  const [tnumber, setTnumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async () => {
    if(user){
      try {
        const setter = await authService.setFields(user, tnumber, firstName, lastName);
        if(setter && 'error' in setter){
          Alert.alert("Error", setter.error);
        } else {
          await refreshUser(); // Refresh user data after setting fields
          Alert.alert("Success", "Profile updated successfully!");
          navi.navigate('index');
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update profile");
      }
    } else {
      Alert.alert("Error", "User not found - please log in again");
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Enter Student Information</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>TNumber</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTnumber}
            placeholder="Enter your TNumber"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#667eea",
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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
  submitBtn: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#667eea",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StudentForm;