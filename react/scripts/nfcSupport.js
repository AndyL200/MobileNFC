import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import {DigitalIdCard} from '@/components/digitalID'
import { NativeModules } from 'react-native';

import AndroidPrompt from './androidPrompt';

const {HCEModule} = NativeModules;


 


export default function NFC({value})
{
    const val = value;
    const promptRef = React.useRef();
    const [hasNfc, setHasNfc] = React.useState(false);
    const content = "\0";

    if(val && val.FirstName && val.LastName && val.Tnumber)
    {
    content = JSON.stringify({"FirstName" : val.FirstName, "LastName" : val.LastName, "Tnumber" : val.Tnumber})
    //set HCEModule shared content
    }
    if (HCEModule){
    HCEModule?.setAPDUPayload(content)
    setHasNfc(true)
    }


        React.useEffect(() => {
            if(promptRef && hasNfc)
            {
                if(promptRef.current){
                        //If the widget is visible the process is operational
                        HCEModule?.start(res=>console.log(res));
                    }
                
                else{
                        if(HCEModule?.isOn()){
                            HCEModule?.stop();
                        }
                    }
            }  
                
                

                
        });

            return (hasNfc)? (
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
                    <DigitalIdCard/>
                    </View>
            ) :
            (
                <View>
                    <Text>Your device doesn't support NFC</Text>
        
                    <ThemedText>Test</ThemedText>
            
                    <AndroidPrompt ref={promptRef}/>
                    <View/>
                </View>
            );           
        }


