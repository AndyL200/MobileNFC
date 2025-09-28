import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import { useContext } from 'react';

import AndroidPrompt from './androidPrompt';
import { NFC_Context } from '@/components/contexts/nfcContext';




export default function NFC(props)
{
    const context = useContext(NFC_Context);

    if(Platform.OS == "android")
    {
    let session;


    const startSession = async () => {
    const tag = new NFCTagType4({
    type: NFCTagType4NDEFContentType.Text,
    content: JSON.stringify(context),
    writable: false
     });

    session = await HCESession.getInstance();
    session.setApplication(tag);
    await session.setEnabled(true);
}

const stopSession = async () => {
  await session.setEnabled(false);
}
    const [hasNfc, setHasNfc] = React.useState(false);
    const promptRef = React.useRef();

    React.useEffect(() => {
        setHasNfc(HCESession.Events.HCE_STATE_ENABLED);
        if(promptRef)
        {
            let session_is_on = promptRef.current.session;
            if(session_is_on)
            {
                startSession();
            }
            else
            {
                stopSession();
            }
            

        }
    }, [hasNfc]);

        return (
        <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {hasNfc ? (

            <>
                <TouchableOpacity onPress={()=>{
                    promptRef.current?._setVisible(true);
                }}>
                <ThemedText>Testing 123</ThemedText>
                </TouchableOpacity>
                <AndroidPrompt ref={promptRef}/>


                <View style={{width:200,height:200,backgroundColor:'green'}}>
                    <ThemedText>Generated ID</ThemedText>
                </View>
            </>
        ) : (
            <>
                <Text>Your device doesn't support NFC</Text>
    
                <ThemedText>Test</ThemedText>
        
                <AndroidPrompt ref={promptRef}/>
                </>
        )}
            </View>
        );           
    }
    return (<></>);
}


