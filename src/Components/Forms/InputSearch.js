import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const InputSearch = () => {
    return (
        <TextInput style={styles.textInput} />
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "#ffffff36",
        color: "red",
        padding: 10,
        paddingLeft: 15,
        fontSize: 20,
        width: "90%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white"
    }
});

export default InputSearch;