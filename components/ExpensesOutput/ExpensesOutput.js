import { View, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSE} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSE}/>
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    }

})
