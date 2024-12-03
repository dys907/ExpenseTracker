import { StyleSheet, Text, TextInput, TextInputComponent, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, style,typeInputConfig }) => {

    const inputStyles = [styles.input]
    if (typeInputConfig && typeInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...typeInputConfig}/>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})