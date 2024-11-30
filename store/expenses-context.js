import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description,amount,date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description,amount,date}) => {}

})



const DUMMY_EXPENSE = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 58.99,
        date: new Date('2024-11-27'),     
    },
    {
        id: 'e2',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2024-11-28'),     
    },
    {
        id: 'e3',
        description: 'Trousers',
        amount: 25.99,
        date: new Date('2024-11-28'),     
    },
    {
        id: 'e4',
        description: 'Bible',
        amount: 18.99,
        date: new Date('2024-11-29'),

    },
    {
        id: 'e5',
        description: 'cigarettes',
        amount: 20.99,
        date: new Date('2024-11-29'),     
    },
]

function expensesReducer(state, action) {
    switch(action.type){
        case 'ADD':
            const id =  Math.random().toString();
            return [{...action.payload, id: id},...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = { ...updatableExpense, ...action.payload.data} //overwrites existing data this way
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload)
        default:
            return state
    }
}


const ExpensesContextProvider = ({children}) => {
    const [expenseState,  dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE );

    const addExpense = (expenseData) => {
        dispatch({type: 'ADD', payload: expenseData})
    }

    const deleteExpense = (id) => {
        dispatch({type: 'DELETE', payload: id})
    }

    const updateExpense = (id, expenseData) => {
        dispatch({type: 'UPDATE',payload: {id: id, data: expenseData}})
        
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider