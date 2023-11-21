import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutputs/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext)

    return (
        <View style={{flex: 1}}>
            <ExpensesOutput 
                expensesPeriod='Total' 
                expenses={expensesCtx.expenses} 
                fallbackText={'No registered expenses found!'}/>
        </View>
    )
}

export default AllExpenses