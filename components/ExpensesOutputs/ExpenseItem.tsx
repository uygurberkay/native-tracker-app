import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { GlobalStyles } from '../../constants/styles'

interface ExpenseItemProps {
    id: string;
    description: string;
    amount: number;
    date: any;
}

const ExpenseItem = ({id, description, amount, date} : ExpenseItemProps ) => {
    const navigation = useNavigation<any>();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', {
            expenseId: id,
        })
    }


    return (
        <Pressable
            style={({pressed}) => pressed && styles.pressed}
            onPress={expensePressHandler}
        >
            <View style={styles.expenseItem}>
                <View >
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 8,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1,},
        shadowOpacity: .4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 60,
    },
    amount: {
        color: GlobalStyles.colors.primary400,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: .7,
    },
})

export default ExpenseItem