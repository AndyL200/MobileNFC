import React from 'react';

import {
    View, 
    Text, 
    Modal, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity,
    Animated
} from 'react-native';


function AndroidPrompt(props, ref) {
    const [_visible, _setVisible] = React.useState(false);
    const [hintText, setHintText] = React.useState('');
    const animValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if(ref) {
            ref.current = {
                _setVisible,
                setHintText,
                _visible,
            };
        }
    }, [ref]);

    React.useEffect(() => {
        if(!_visible) {
            Animated.timing(animValue, {
                duration: 300,
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
        else {
            Animated.timing(animValue, {
                duration: 300,
                toValue: 0,
                useNativeDriver: true,
            }).start()
            setHintText('');
        }
    }, [_visible, animValue])

    const backdropAnimStyle = {
        opacity: animValue
    };
    const promptAnimStyle = {
        transform: [
            {translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 500],
            })}
        ]
    }

    return (
        <Modal visible={_visible} transparent={true}>
            <View style={styles.content}>
                <Animated.View style={[styles.prompt, promptAnimStyle]}>
                <Text>{hintText || "Hello NFC"}</Text>
                <TouchableOpacity style={styles.btn} onPress={()=>{
                    _setVisible(false);
                }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                </Animated.View>
            </View>    
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        flex:1,
    },
    backdrop: {
        backgroundColor: 'rgba(40, 164, 112, 0.3)',
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

export default React.forwardRef(AndroidPrompt);