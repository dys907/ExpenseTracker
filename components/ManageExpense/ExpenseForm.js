import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";


const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, defaultValue}) => {
    const [inputValue, setInputValue] = useState({
        amount: defaultValue ? defaultValue.amount.toString(): '',
        date: defaultValue?.date.toISOString().slice(0,10) || '',
        description: defaultValue?.description || ''
    })


  const inputChangedHandler = ( inputIdentifier, enteredValue) => {

    setInputValue((currentInputValues)=> {
        return {...currentInputValues,
            [inputIdentifier]: enteredValue //dynamically target input, its not used as an array

        }
    })
  };

  const submitHandler = () => {
    const expenseData = {
        amount: +inputValue.amount, //this is like parseInt 
        date: new Date(inputValue.date),
        description: inputValue.description
    }

    onSubmit(expenseData)



  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          typeInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this,'amount'),
            value: inputValue.amount
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          typeInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: "10",
            onChangeText: inputChangedHandler.bind(this,'date'),
            value: inputValue.date
          }}
        />
      </View>
      <Input
        label="Description"
        typeInputConfig={{
          multiline: true,
          onChangeText:inputChangedHandler.bind(this,'description'),
          value: inputValue.description
        }}
      />
              <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical:24,
    textAlign:'center'
  },
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center',
},
button: {
    minWidth:120,
    marginHorizontal: 8
},
});
