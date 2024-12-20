import { View, StyleSheet, TextInput } from "react-native";
import { useContext, useLayoutEffect,useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error,setError] = useState()
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true)
    try {
        await deleteExpense(editedExpenseId);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }catch(error) {
        setError('Could nto delete expense - Please try a gain later!')
        setIsSubmitting(false)
    }




  }

  const cancelHandler = () => {
    navigation.goBack();
  };

  async function confirmHandler(expenseData) {
    setIsSubmitting(true)
    try {
        if (isEditing) {
          expensesCtx.updateExpense(editedExpenseId, expenseData);
          await updateExpense(editedExpenseId, expenseData);
        } else {
          const id = await storeExpense(expenseData);
          expensesCtx.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack();
    } catch(error) {
        setError('Could not save data - please try again later')
        setIsSubmitting(false)
    }

  }

  const errorHandler = () => {
    setError(null)
    
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isSubmitting) {
    return <LoadingOverlay/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
