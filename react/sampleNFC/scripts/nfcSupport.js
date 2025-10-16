import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text';

//import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';

import AndroidPrompt from './androidPrompt';

const {HCEModule} = NativeModules


export default function NFC({value})
{
    const val = value;
    let content = null;
    let hasNfc = HCEModule.check();
    const promptRef = React.useRef();

    if(val && val.FirstName && val.LastName && val.Tnumber)
    {
    content = {"FirstName" : val.FirstName, "LastName" : val.LastName, "Tnumber" : val.Tnumber}
    }

/*
        const startSession = async () => {
            if(!content)
            {
                return;
            }
        const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        content: JSON.stringify(content),
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
        
*/
        React.useEffect(() => {
                if(hasNfc)
                {
                HCEModule.start();
                }
                else
                {
                HCEModule.stop();
                }

                if(promptRef && promptRef.current)
                {
                    //If the widget is visible the process is operational
                    hasNfc = promptRef.current
                }
        }, [hasNfc]);

            return (
            <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <TouchableOpacity onPress={()=>{
                        promptRef.current?._setVisible(true);
                    }}>
                    <ThemedText>Start NFC</ThemedText>
                    </TouchableOpacity>
                    <AndroidPrompt ref={promptRef}/>


                    <View style={{width:200,height:200,backgroundColor:'green'}}>
                        <ThemedText>Generated ID</ThemedText>
                    </View>
                    </View>
            )
            return (
                <View>
                    <Text>Your device doesn't support NFC</Text>
        
                    <ThemedText>Test</ThemedText>
            
                    <AndroidPrompt ref={promptRef}/>
                    <View/>
                </View>
            );           
        }


