import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ThemedText } from '@/components/themed-text';
//import NfcManager from 'react-native-nfc-manager'; Doubt this is still necessary
import AndroidPrompt from './androidPrompt';

export default function NFC(props)
{
    const [hasNfc, setHasNfc] = React.useState(false);
    const promptRef = React.useRef();

    React.useEffect(() => {
        async function checkNfc() {
        var supported = true;
        //await NfcManager.isSupported();
        if(supported) {
            //await NfcManager.start();
        }
        setHasNfc(supported ?? false);
        }

        checkNfc();
    }, []);

    if(hasNfc) {
        return (
        <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity onPress={()=>{
                    promptRef.current?.setVisible(true);
                }}>
                <ThemedText>Testing 123</ThemedText>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>
            </View>
        );
    }
    else {
        return (
            <View style={    
                {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>Your device doesn't support NFC</Text>
                <TouchableOpacity onPress={()=>{
                    promptRef.current?.setVisible(true);
                }}>
                <ThemedText>Test</ThemedText>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>
            </View>
        );
    }

}