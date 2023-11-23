import axios from 'axios';

axios.defaults.baseURL = 'https://native-tracker-app-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expenseData : any)=> {
    const response = await axios.post(
        '/expenses.json',
        {
            expenseData
        });
    const id = response.data.name;
    return id;
};

export const fetchExpenses = async () => {
    const response = await axios.get('/expenses.json');

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObj);
    }

    return expenses;
};

export const updateExpense = async (id: string, expenseData: any) => {
    return axios.put(`/expenses/${id}.json`, expenseData)
}

export const deleteExpense = async (id: string) => {
    return axios.delete(`/expenses/${id}json`)
}