import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/ui/IconButton'
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';

/* One way to solve it */
const GlobalStyles =
    Platform.OS === 'android'
    ? require('../constants/styles.android').GlobalStyles
    : require('../constants/styles.ios').GlobalStyles;
/* Another way to solve it */
// // @ts-ignore
// import { GlobalStyles } from '../constants/styles';

const ManageExpense = ({ route, navigation }: any) => {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId  // Converted to a boolean

    const selectedExpense = expensesCtx.expenses.find((expense: any) => expense.id === editedExpenseId)

    /* Mutable Title Option */
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing]);
    
     /* Deleting Expenses via useContext API */
    const deleteExpenseHandler = async () => {
        await deleteExpense(editedExpenseId);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    /* Adding and Updating Expenses via useContext API */
    const confirmHandler = async (expenseData: any) => {
        if(isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData)
            await updateExpense(editedExpenseId,expenseData);
        }else {
            /* With Real Firebase Database */
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                isEditing={isEditing}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon={'trash'} 
                        size={36} 
                        color={GlobalStyles.colors.error500} 
                        onPress={deleteExpenseHandler}/>
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
})

export default ManageExpense