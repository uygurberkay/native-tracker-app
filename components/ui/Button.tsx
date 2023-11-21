import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
// @ts-ignore
import { GlobalStyles } from '../../constants/styles'

interface ButtonProps {
    children: any;
    onPress: any;
    mode: any;
    style: any;
}

const Button = ({children, onPress, mode ,style}: ButtonProps) => {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]} >
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary300,
    },
    flat: {
        backgroundColor: GlobalStyles.colors.primary100,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary300,
    },
    pressed: {
        opacity: .75,
        backgroundColor: GlobalStyles.colors.primary100,
    }
})

export default Button