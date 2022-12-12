import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ImageBackground, Image, ScrollView } from "react-native";
import ViewAlert from "../../Components/Alerts/ViewAlert";
import useLocalStorage from "../../Hook/useStorage";
import Button from "../../Components/Forms/Button";
import requestApi from "../../Services/RequestAPI";
import fondo from "../../Sources/Images/fondo.jpeg";
import logo from "../../Sources/Images/logo.png";
import useValidate from "../../Hook/useValidate";

const Login = ({ requestLogin, setNavigateRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showDivModal, setshowDivModal] = useState(false);

  const buttonOnClick = async () => {
    const prepareData = {
      email: useValidate.email(email),
      password: useValidate.verifyLengthString(password, 255, 8),
    };
    const verifyObject = useValidate.verifyObjectData(prepareData);
    requestLogin(prepareData);
    setPassword("");

    const responseApi = await requestApi.logingUserVisitante(prepareData);
    if (!responseApi) {
      alert("No tienes conexión a internet.");
    } else {
      if (
        !responseApi.error &&
        responseApi.statusCode == 200 &&
        responseApi.others
      ) {
        // Todo Bien
        await useLocalStorage.setItem(
          "UserItemID",
          JSON.stringify(responseApi.others)
        );
        //navigation.navigate("Home");
      } else {
        //&alert(responseApi.message);
      }
    }
  };

  const changeDivOpasity = () =>{
    if (showDivModal == true) {
      setshowDivModal(false)
    }else{
      setshowDivModal(true)
    }
  }

  return (
    <ScrollView style={styles.content}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
        <View style={styles.contentLogo}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={showDivModal ? styles.OpasityShow : styles.OpasityClose}>
        
        </View>
        <View style={styles.container}>
              <Text style={{ width: "86%",fontWeight: "bold"}}>Bienvenido de vuelta</Text>
              <Pressable
              style={[styles.button, styles.buttonClose,]}
              onPress={() => setNavigateRegister('Welcome')}
              >
                <Text style={styles.text}>x</Text>
              </Pressable>
              <Text style={{ width: "100%", fontSize: 25, fontWeight: "bold", paddingBottom: 10,}}>Ingresa</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Correo Electronico"
            placeholderTextColor="black" 
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor="black"
            textContentType="password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <ViewAlert DivOpasity={changeDivOpasity}/>
          <Button func={buttonOnClick} text='Ingresar' colorBtn='#000' colorTxt="white"/>
          <Text style={{ width: "100%", textAlign: "center", fontWeight: "bold",}}>¿No tienes una cuenta? <Text style={{fontWeight: "bold", color: "red"}}  onPress={() => setNavigateRegister('Register')}>Registrate</Text></Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    flex: 1,
  },
  contentLogo: {
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: "center",
    backgroundColor: "hsla(0, 100%, 0%, 0.5)",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    width: "100%",
    marginTop: -40,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    justifyContent: "center", //centra todo el contenido de un div
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",

    alignContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 135
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    borderRadius: 100,
    paddingBottom: 10,
    width: 40,
    height: 38,
    borderWidth: 1,
    borderColor: "red",
  },
  text: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
  },
  OpasityShow:{
    zIndex: 1,
    backgroundColor: "hsla(0, 100%, 0%, 0.5)",
    height: "100%",
    width: "100%"
  },
  OpasityClose:{
    zIndex: -1,
  }
});

export default Login;
