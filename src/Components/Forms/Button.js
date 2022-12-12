import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

const Button = ({func, argFunc=null, text, colorBtn=null, colorTxt=null, state=true}) => {
    const comp = () => {
        if (argFunc != null) {
            func(argFunc);
        }else{
            func();
        }
    }
    const colorInput = () => {
        if (colorBtn != null && colorBtn != 'outline-white' && colorBtn != 'outline-dark') {
            return {
                backgroundColor: colorBtn,
            };
        }
        else if (colorBtn == 'outline-dark') {
            return {
                borderWidth: 2,
                borderColor: "black",
            };
        }
        else if (colorBtn == "outline-white") {
            return {
                borderWidth: 2,
                borderColor: "white",
            };
        }
        else{
            return {
                backgroundColor: "green",
            };
        }
    }
    const colorText = () => {
        if (colorTxt != null && colorBtn != 'outline-white' && colorBtn != 'outline-dark') {
            return {
                color: colorTxt,
            };
        }
        else if (colorBtn == 'outline-dark') {
            return {
                color: "black",
            };
        }
        else if (colorBtn == 'outline-white') {
            return {
                color: "white",
            };
        }
        else{
            return {
                color: "white",
            };
        }
    }
    return (
        <Pressable
        style={[styles.button , colorInput()]}
        onPressOut={() => comp()}
        >
            <Text style={[styles.text, colorText()]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        borderRadius: 20,
        padding: 13,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        textAlign: "center",
        fontSize: 20,
    }
})

export default Button;
