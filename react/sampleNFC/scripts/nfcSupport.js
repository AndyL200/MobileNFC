import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';

import AndroidPrompt from './androidPrompt';




export default function NFC(props)
{
    const val = props.value;
    let content = null;
    const [hasNfc, setHasNfc] = React.useState(false);
    const promptRef = React.useRef();
    let sessionRef = React.useRef(null);

    if(val && val.FirstName && val.LastName && val.Tnumber)
    {
    content = {"FirstName" : val.FirstName, "LastName" : val.LastName, "Tnumber" : val.Tnumber}
    }

    if(Platform.OS == "android")
    {


        const startSession = async () => {
            if(!content)
            {
                return;
            }
        const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        content: JSON.stringify(context),
        writable: false
        });

        const session = await HCESession.getInstance();
        session.setApplication(tag);
        await session.setEnabled(true);
        sessionRef.current = session;
    }

    const stopSession = async () => {
    await sessionRef.current?.setEnabled(false);
    }
        

        React.useEffect(() => {
            if(sessionRef.current != null && sessionRef.current)
            {
                setHasNfc(sessionRef.current?.enabled)
                if(hasNfc)
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


