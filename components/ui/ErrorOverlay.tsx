import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
// @ts-ignore
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

interface LoadingOverlayProps {
    message: string;
}


const ErrorOverlay = ({message}: LoadingOverlayProps) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary100,
    },
    text: {
        color: GlobalStyles.colors.primary300,
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold' ,
    },
})

export default ErrorOverlay