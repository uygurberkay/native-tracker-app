import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutputs/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../utils/date'

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext)

    const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    })

    return (
        <View style={{flex: 1}}>
            <ExpensesOutput 
                expensesPeriod='Last 7 Days' 
                expenses={recentExpenses} 
                fallbackText={'No expenses registered for the last 7 days'}/>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RecentExpenses