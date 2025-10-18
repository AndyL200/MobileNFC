import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { ThemedText } from '@/components/themed-text';


import AndroidPrompt from './androidPrompt';

const {HCEModule} = NativeModules


export default function NFC({value})
{
    const val = value;
    let content = null;
    const promptRef = React.useRef();

    if(val && val.FirstName && val.LastName && val.Tnumber)
    {
    content = {"FirstName" : val.FirstName, "LastName" : val.LastName, "Tnumber" : val.Tnumber}
    }


        React.useEffect(() => {
            if(promptRef)
            {
                if(promptRef.current){
                        //If the widget is visible the process is operational
                        HCEModule.start();
                    }
                
                else{
                        if(HCEModule.isOn()){
                            HCEModule.stop();
                        }
                    }
            }  
                
                

                
        });

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


