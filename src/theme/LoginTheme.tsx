import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5

    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    buttonTextCreateAccount: {
        color: 'white',
        fontSize: 18,
        marginBottom: 16
    },
    newUserContainer:{
        alignItems: 'flex-end',
        marginTop: 10
    },
    formContainer: {
        flex: 1,
        margin: 16,
        justifyContent: 'center',
        
    }
})