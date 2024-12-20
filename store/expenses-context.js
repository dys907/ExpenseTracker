import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description,amount,date}) => {},
    setExpenses: ({expenses})=> {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description,amount,date}) => {}

})





function expensesReducer(state, action) {
    switch(action.type){
        case 'ADD':

            return [{...action.payload},...state]
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted
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
    const [expenseState,  dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => {
        dispatch({type: 'ADD', payload: expenseData})
    }

    const setExpenses = (expenses) => {
        dispatch({type: 'SET', payload: expenses})
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
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider