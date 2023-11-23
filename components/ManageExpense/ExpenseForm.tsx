import { View, StyleSheet, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
// @ts-ignore
import { GlobalStyles } from '../../constants/styles'
import Button from '../ui/Button'
import { getFormattedDate } from '../../utils/date'

interface ExpenseFormProps {
    onCancel: () => void;
    onSubmit: (expenseData: any) => void;
    isEditing: boolean;
    defaultValues: any | undefined;
}

const ExpenseForm = ({ onCancel, onSubmit, isEditing, defaultValues } : ExpenseFormProps) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    /* I would rather useState onChangeText couple instead of this, cause its easiest way to handle inputHandler */
    /* Advanced way */
    const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    const submitHandler = () => {
        const expenseData = {
            amount: + inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        /* Validation */
        /*
        Returns true if no validation error occurs
        */
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values')
            setInputs((curInputs) => {
            return {
                amount: { value: curInputs.amount.value, isValid: amountIsValid },
                date: { value: curInputs.date.value, isValid: dateIsValid },
                description: { value: curInputs.description.value, isValid: descriptionIsValid },
            }})
            return;
        }


        /* Getting from parent Component */
        onSubmit(expenseData)
    }

    const formIsInvalid =
        !inputs.amount.isValid || 
        !inputs.date.isValid || 
        !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label={'Amount'} 
                    inValid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                }}/>
                <Input 
                    style={styles.rowInput}
                    label={'Date'}
                    inValid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input 
                label={'Description'}
                inValid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && 
                <Text style={styles.errorText}>Please check your invalid data</Text>
            }
            <View style={styles.buttonsContainer}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button} mode={{}}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800,
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});

export default ExpenseForm