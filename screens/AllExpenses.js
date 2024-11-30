import { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

const AllExpenses = (params) => {
    const expensesCtx = useContext(ExpensesContext)
    console.log(expensesCtx.expenses)
    
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={"Total"} fallbackText={"No expenses registered "}/>
}

export default AllExpenses