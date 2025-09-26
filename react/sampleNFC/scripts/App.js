import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import AndroidPrompt from './androidPrompt';

function App(props)
{
    const [hasNfc, setHasNfc] = React.useState(null);

    React.useEffect(() => {
        async function checkNfc() {
        const supported = await NfcManager.isSupported();
        if(supported) {
            await NfcManager.start();
        }
        setHasNfc(supported);
        }

        checkNfc();
    }, []);

    if(hasNfc == null) {
        return null;
    }
    else if(!hasNfc) {
        return (
            <View style={styles.wrapper}>
                <Text>Your device doesn't support NFC</Text>
                <AndroidPrompt />
            </View>
        );
    }

    return something else...
}