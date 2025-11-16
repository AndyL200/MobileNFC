import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text.tsx';
import DigitalIdCard from '@/components/digitalID.tsx'
import { NativeModules } from 'react-native';

import AndroidPrompt from './androidPrompt.js';

const {HCEModule} = NativeModules;

export default function NFC({value}) {
    const promptRef = React.useRef();
    const [hasNfc, setHasNfc] = React.useState(false);
    console.log("NFCVAL::", value)
    

        React.useEffect(() => {
        if (HCEModule) {
            //not entirely true
            setHasNfc(true);
        }
        }, []);

        React.useEffect(() => {
        if (value && hasNfc && HCEModule) {
            const content = JSON.stringify(value);
            HCEModule.setAPDUPayload(content);
            console.log('NFC payload updated:', content);
        }
    }, [value, hasNfc]);


        // Start/Stop HCE based on prompt visibility
    React.useEffect(() => {
        if (!hasNfc || !HCEModule) return;

        if (promptRef.current?._visible) {
            // Start HCE when prompt becomes visible
            HCEModule.start(res => console.log('HCE started:', res));
        } else {
            // Stop HCE when prompt is hidden
            if (HCEModule.isOn()) {
                HCEModule.stop();
                console.log('HCE stopped');
            }
        }
    }, [promptRef.current?._visible, hasNfc]);

    const startNFC = () => {
        promptRef.current?._setVisible(true);
    };

    // Create student data
    const studentData = value ? {
        name: `${value.FirstName || ''} ${value.LastName || ''}`.trim() || 'Student',
        stuid: value.TNumber || 'T00000000',
        diningDollars: '45.32',//hardcoded for now
        classification: value.classification || 'Undergraduate',
        photoUrl: null,
        qrCodeUrl: null
    } : null;

        return hasNfc ? (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={startNFC}>
                <ThemedText style={styles.buttonText}>Start NFC</ThemedText>
            </TouchableOpacity>
            
            <AndroidPrompt ref={promptRef} />
            
            {studentData && <DigitalIdCard student={studentData} />}
        </View>
    ) : (
        <View style={styles.container}>
            <Text style={styles.errorText}>Your device doesn't support NFC</Text>
            <ThemedText>NFC functionality is not available</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#667eea',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 16,
    },
});