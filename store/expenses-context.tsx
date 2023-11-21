import { createContext, useReducer } from "react";

interface ExpenseProps {
    description: string;
    amount: number;
    date: any;
}

interface ContextType {
    expenses: string[];
    addExpense: ({description, amount, date}: ExpenseProps) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, {description, amount, date}: ExpenseProps) => void;
}
/* Initial Dummy Data */
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-11-19')
    },
    {
        id: 'e2',
        description: 'A pair of socket',
        amount: 29.99,
        date: new Date('2023-10-01')
    },
    {
        id: 'e3',
        description: 'A book',
        amount: 79.29,
        date: new Date('2023-11-15')
    },
    {
        id: 'e4',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
]


export const ExpensesContext = createContext<ContextType>({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

const expensesReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id: id} ,...state]
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
        case 'DELETE':
            return state.filter((expense : any) => expense.id !== action.payload)
        default: 
            return state;
    }
}

const ExpensesContextProvider = ({children}: any) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

    const addExpense = (expenseData: any) => {
        dispatch({ type: 'ADD', payload: expenseData });
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
        updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;