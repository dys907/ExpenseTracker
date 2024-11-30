import { View, StyleSheet } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesContext)


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

  const confirmHandler = () => {
    navigation.goBack()
    if(isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,
        {
        description:"TestUpdate",
        amount: 29.99,
        date: new Date('2024-11-28')
      })
    } else {
      expensesCtx.addExpense({
        description:"TestAdd",
        amount: 19.99,
        date: new Date('2024-11-27')
      })
    }
    

  }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'center',
    },
    button: {
        minWidth:120,
        marginHorizontal: 8
    },
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
