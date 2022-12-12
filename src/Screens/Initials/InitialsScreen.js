import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TextInput, Button, Pressable} from 'react-native';
import useStorage from '../../Hook/useStorage';
import requestApi from '../../Services/RequestAPI';


const Initialsscreens = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnIngresar, setBtnIngresar] = useState('Ingresar');

    const buttonOnClick = async () => {
        const prepareData = {
            email,
            password,
        }
        setBtnIngresar("Cargando...");
        const responseApi = await requestApi.logingUserVisitante(prepareData);
        if (!responseApi) {
            alert("No tienes conexión a internet.")
        }else {
            if (!responseApi.error && responseApi.statusCode == 200 && responseApi.others) {
                // Todo Bien
                await useStorage.setItem("UserItemID", JSON.stringify(responseApi.others));
                navigation.navigate('Home');
            }else {
                alert(responseApi.message);
            }
        }
        setBtnIngresar("Ingresar");
    }

    useEffect(() => {
        // console.log(useStorage.getAll());
    }, []);

    return (
        <View style={ styles.contaiener }>
            <Text style={ styles.titleText }>Bienvenido</Text>
            <TextInput style={ styles.textInput } placeholder="Correo Electronico" onChangeText={setEmail} value={email} />
            <TextInput style={ styles.textInput } placeholder="Contraseña" textContentType='password' onChangeText={setPassword} value={password} />

            <Pressable
                style={ styles.btnPrimary }
                onPressOut={() => buttonOnClick()}
            >
                <Text style={ styles.btnPrimaryText }>{ btnIngresar }</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    contaiener: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        backgroundColor: 'white',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: '80%',
        padding: 10,
        paddingLeft: 15,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 28,
        marginBottom: 10,
    },
    btnPrimary: {
        width: '80%',
        backgroundColor: '#0D6EFD',
        padding: 7,
        borderRadius: 10,
    },
    btnPrimaryText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default Initialsscreens;
