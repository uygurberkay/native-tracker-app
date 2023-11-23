import { createContext, useReducer } from "react";

interface ExpenseProps {
    description: string;
    amount: number;
    date: any;
}

interface ContextType {
    expenses: string[];
    addExpense: ({description, amount, date}: ExpenseProps) => void;
    setExpenses: (expenses: any) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, {description, amount, date}: ExpenseProps) => void;
}



export const ExpensesContext = createContext<ContextType>({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
    setExpenses:(expenses) => {},
});

const expensesReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            /*
            Returns index that search id, in this example expense.id , matches the payload.id
            if its matches return its index, if not it return -1
            */
            const updatableExpenseIndex = state.findIndex(
                (expense: any) =>  expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpsenses = [...state];
            updatedExpsenses[updatableExpenseIndex] = updatedItem;
            return updatedExpsenses;
        case 'SET': 
            const inverted = action.payload.reverse();
            return inverted;
        case 'DELETE':
            return state.filter((expense : any) => expense.id !== action.payload)
        default: 
            return state;
    }
}

const ExpensesContextProvider = ({children}: any) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const addExpense = (expenseData: any) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    const setExpenses = (expenses: any) => {
        dispatch({ type: 'SET', payload: expenses });
    }

    const updateExpense = (id: any, expenseData: any) => {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const deleteExpense = (id: any) => {
        dispatch({ type: 'DELETE', payload: id})

    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        setExpenses,
        updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;