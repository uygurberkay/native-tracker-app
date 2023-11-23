import { StyleSheet, Text, TextInput, View } from 'react-native';
// @ts-ignore
import { GlobalStyles } from '../../constants/styles';

interface InputProps {
    label: string;
    textInputConfig?: any;
    style?: any;
    inValid: boolean;
}

function Input({ label, style, textInputConfig, inValid }: InputProps) {

    /* Adjust line height for Description input */
    let inputStyles: any = [styles.input];
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if(inValid) {
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, inValid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary500,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary600,
        padding: 6,
        borderRadius: 6,
        fontSize: 14,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: { 
        backgroundColor: GlobalStyles.colors.error50,
    },
})

export default Input;