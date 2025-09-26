import React from 'react';
import {View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

function AndroidPrompt(props) {
    return (
        <Modal visible={true} transparent={true}>
            <View style={styles.content}>
                <View style={[styles.backdrop, StyleSheet.absoluteFill]}/>
                <View style={styles.prompt}>
                <Text>HELLO NFC</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>    
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        flex:1,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    prompt: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        width: Dimensions.get('window').width - 40,
        backgroundColor: 'pink',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hint: {
        fontSize: 24,
        marginBottom: 10,
    },
    btn: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
    }

});

export default AndroidPrompt;