import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ImageBackground, Image } from "react-native";
import Button from '../Components/Forms/Button';
import useRedirect from '../Hook/useRedirect';

import fondo from "../Sources/Images/fondo.jpeg";
import logo from "../Sources/Images/logo.png";

const WelcomeScreen = ({ navigation }) => {
    const [nav, setNavs] = useState(false);

    useEffect(async () => {
      const isLogg = await useRedirect.isLoged(navigation);
      if (isLogg) {
        navigation.replace('chooseZone')
      }
      if (nav) {
          navigation.replace(nav);
          setNavs(false);
      }
    }, [nav])

    const redirect = (pages) => {
        setNavs(pages);
    }

    return (
        <View style={styles.content}>
            <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
                <View style={styles.contentLogo}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Bienvenidos</Text>
                    <Text style={styles.textBienvenida}>El turismo tiene como objetivo la construccion de mejores personas y no de mejores fortunas</Text>
                    <Button func={redirect} argFunc="Register" colorBtn="#D40000" text="Crear Cuenta" />
                    <Button func={redirect} argFunc="Login" text="Ingresar" colorBtn="outline-white"/>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      width: "100%",
    },
    container: {
      flex: 1,
      width: "100%",
      /* justifyContent: "center", */ //centra todo el contenido de un div
      alignItems: "center",
      padding: 30,
      //backgroundColor: "gray",
    },
    image: {
      width: "100%",
      flex: 1,
    },
    contentLogo: {
      marginTop: 35,
      alignItems: "center",
      //backgroundColor: "red",
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'stretch',
    },
    titleText: {
      color: "white",
      fontSize: 40,
      marginBottom: 20,
      fontWeight: "bold",
    },
    textBienvenida:{
      color: "white",
      marginBottom: 20,
      fontSize: 20,
      textAlign: "center",
    },
  });

export default WelcomeScreen;
