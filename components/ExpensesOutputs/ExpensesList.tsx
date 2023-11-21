import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
    expenses: any;
}

const ExpensesList = ({expenses}: ExpensesListProps) => {
    const renderExpenseItem = (itemData : any) => {
        return <ExpenseItem {...itemData.item}/>
    }

    return (
        <>
            <FlatList 
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id}
            />
        </>
    )
}

const styles = StyleSheet.create({

})

export default ExpensesList