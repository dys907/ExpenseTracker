import { StyleSheet, Text, View } from "react-native"
import Button from "./Button"
import { GlobalStyles } from "../../constants/styles"


const ErrorOverlay = ({message,onConfirm}) => {
    <View>
        <Text style={[styles.text,styles.title]}>An error occured!</Text>
        <Text style={styles.text}>{message}</Text>
        <Button onpress={onConfirm}>Okay</Button>
    </View>
    
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        padding:24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    message: {
        fontSize:14
    }
})