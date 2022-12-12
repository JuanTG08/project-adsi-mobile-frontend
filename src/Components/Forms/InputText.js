import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const InputText = ({ value, placeholder, onChangeText }) => {
    return (
        <TextInput
            value={ value }
            placeholder={ placeholder }
            onChangeText={(val) => onChangeText('nombreusuario', val)}
            style={ styleInputText.predeterminate }
        />
    );
}

const styleInputText = StyleSheet.create({
    predeterminate: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: '80%',
        padding: 10,
        paddingLeft: 15,
        marginBottom: 10,
    },
});

export default InputText;