import { View, StyleSheet, TextInput } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;


  const expensesCtx = useContext(ExpensesContext)

  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  };

  const cancelHandler = () => {

    navigation.goBack()
    
  }

  const confirmHandler = (expenseData) => {
    navigation.goBack()
    if(isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,
        expenseData)
    } else {
      expensesCtx.addExpense(expenseData)
    }
    

  }

  return (
    <View style={styles.container}>
        <ExpenseForm 
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing ? "Update": "Add"}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
        />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'


    }
});
