import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/ui/IconButton'
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';

/* One way to solve it */
const GlobalStyles =
    Platform.OS === 'android'
    ? require('../constants/styles.android').GlobalStyles
    : require('../constants/styles.ios').GlobalStyles;
/* Another way to solve it */
// // @ts-ignore
// import { GlobalStyles } from '../constants/styles';

const ManageExpense = ({ route, navigation }: any) => {
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId  // Converted to a boolean

    const expensesCtx = useContext(ExpensesContext)

    /* Mutable Title Option */
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing]);
    
    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = () => {
        if(isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                description: 'Test' ,
                amount: 19.99, 
                date : new Date('2023-11-16')
            } )
        }else {
            expensesCtx.addExpense({
                description: 'Test' ,
                amount: 19.99, 
                date : new Date('2023-11-16')
            })
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button mode={'flat'} onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button} mode={{}}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon={'trash'} size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary50,
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
})

export default ManageExpense