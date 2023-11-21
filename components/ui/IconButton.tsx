import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { GlobalStyles } from '../../constants/styles';

interface IconButtonProps {
    icon: any;
    size: number;
    color: string;
    onPress : any;
}

const IconButton = ({icon, size, color, onPress}: IconButtonProps) => {
    return (
        <Pressable 
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 4,
    },
    pressed: {
        opacity: .75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 100,
    },
})

export default IconButton