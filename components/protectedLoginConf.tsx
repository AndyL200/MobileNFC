import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthService from '@/scripts/authService';
import { AuthContext } from '@/components/contexts/AuthContext';

const Protected = () => {
    const { user: contextUser, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // User is already loaded from context, just stop loading
        setLoading(false);
    }, [contextUser]);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setUser(null); // Clear user from context
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.body}>
                <View style={styles.loginContainer}>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </View>
        );
    }

    if (contextUser) {
        return (
            <View style={styles.body}>
                <View style={styles.loginContainer}>
                    <Text style={styles.heading}>Welcome Back</Text>
                    <Text style={styles.welcome}>Hello, {contextUser?.FirstName}!</Text>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
                        <Text style={styles.loginBtnText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <View style={styles.loginContainer}>
                <Text style={styles.heading}>Access Required</Text>
                <Text style={styles.errorText}>User not found. Please log in again.</Text>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogout}>
                        <Text style={styles.loginBtnText}>Logout</Text>
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
    loginContainer: {
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
    welcome: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
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
    errorText: {
        color: "#FF3B30",
        fontSize: 16,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
});

export default Protected;