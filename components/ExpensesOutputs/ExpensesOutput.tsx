import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
// @ts-ignore
import { GlobalStyles } from '../../constants/styles'; 

interface ExpensesOutputProps {
    expenses : any;
    expensesPeriod: string;
    fallbackText: string;
}


const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: ExpensesOutputProps) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses}/>
    }

    return (
        <View style={styles.container}>
            {/* Summary of Expenses */}
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {/* List of Expenses */}
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary50,
    },
    infoText: {
        color: GlobalStyles.colors.primary300 ,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
})


export default ExpensesOutput