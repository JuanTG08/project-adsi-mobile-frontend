import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';

import Button from "../../Components/Forms/Button";
import requestApi from "../../Services/RequestAPI";
import Cargando from "../../Components/Alerts/Cargando"
const ForgotToPass = ({ exit }) => {

  const [form, setForm] = useState(1)
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [contra, setContra] = useState("");
  const [contra2, setContra2] = useState("");
  const [showCargando, setShowCargando] = useState(false);

  const sendCode = async () => { // Enviamos la peticion a la API para poder enviar el correo electronico con el codigo
    if (email.trim() != '') {
      setShowCargando(true);
      const responseApi = await requestApi.sendCodeMail(email);
      if (!responseApi) {
        alert("No tienes conexión a internet.");
        setShowCargando(false);
      } else {
        if (
          !responseApi.error &&
          responseApi.statusCode == 200
        ) {
          // Todo Bien
          setShowCargando(false);
          alert(responseApi.message);
          setForm(2);
        } else {
          setShowCargando(false);
          alert(responseApi.message);
        }
      }
    } else {
      alert('Debes ingresar un correo');
    }
  }
  const verifiCode = async () => {
    if (codigo.trim() != '') {
      setShowCargando(true);
      const data = {
        codeConfirm: codigo,
      }
      const verifyCodeMail = await requestApi.verifyMailAndCodeConfirm(email, data);
      if (!verifyCodeMail.error && verifyCodeMail.statusCode == 200 && verifyCodeMail.others) {
        setShowCargando(false);
        alert(verifyCodeMail.message);
        setForm(3);
      } else {
        setShowCargando(false);
        alert("Codigo Incorrecto");
      }
    } else {
      alert('Codigo vacio');
    }
  }
  const changeContra = async () => {
    if (contra.trim() != '' && contra.length >= 8) {
      if (contra == contra2) {
        setShowCargando(true);
        const data = {
          password: contra,
          codeConfirm: codigo,
        }
        const changePassword = await requestApi.changePasswordForPassword(email, data);
        alert(changePassword.message || 'No tienes conexion');
        setShowCargando(false);
        exit();
      }else {
        alert('No coinciden las contraseñas');
      }
    } else {
      alert('Contraseña vacia, la contraseña debe ser mayor o igual 8 digitos.');
    }

  }
  if (form == 1) {
    return (
      <>
        <Cargando modalVisible={showCargando} />
        <TextInput
          style={styles.textInput}
          placeholder="Correo Electronico"
          onChangeText={(e) => setEmail(e)}
        />
        <Text style={{ width: "100%", fontSize: 15, textAlign: "center", fontWeight: "bold" }}>Se enviara un codigo de confirmacion a tu correo electronico</Text>
        <Button func={sendCode} text='Enviar Codigo' colorBtn='#000' />
      </>
    );
  }
  if (form == 2) {
    return (
      <>
        <Cargando modalVisible={showCargando} />
        <TextInput
          style={styles.textInput}
          placeholder="Ingresa tu codigo"
          onChangeText={(e) => setCodigo(e)}
        />
        <Button func={verifiCode} text='Verificar' colorBtn='#000' />
      </>
    );
  }
  if (form == 3) {
    return (
      <>
        <Cargando modalVisible={showCargando} />
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          onChangeText={(e) => setContra(e)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirmar Contraseña"
          onChangeText={(e) => setContra2(e)}
          secureTextEntry={true}
        />
        <Button func={changeContra} text='Ingresa' colorBtn='#000' />
      </>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
});

export default ForgotToPass;