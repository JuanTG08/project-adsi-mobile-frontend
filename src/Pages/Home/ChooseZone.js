import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Button from '../../Components/Forms/Button';
import useLocalStorage from '../../Hook/useStorage';
import ChooseZoneApt from '../../Components/Alerts/ChooseZoneApt';
import requestApi from '../../Services/RequestAPI';

import fondo from "../../Sources/Images/fondo.jpeg";

const ChooseZone = ({ navigation }) => {
    const [nav, setNav] = useState(false);
    const [zone, setZones] = useState(false);
    const [Ubica, setUbica] = useState("VIL");

    const [verifyConexion, setVerifyConexion] = useState(false);

    useEffect(async () => {
        if (nav) {
            navigation.replace(nav);
        }
    }, [nav]);

    useEffect(async () => {
        const verify = await getListZonesApt();
        console.log(verify);
        if (verify) setVerifyConexion(true);
    }, []);

    const getListZonesApt = async () => {
        let resp = false;
        const zones = await requestApi.listZonesApt();
        if (!zones.error && zones.statusCode == 200 && zones.others) resp = zones.others;
        return resp;
    }

    const goHome = async () => {
        await useLocalStorage.setItem("ZoneApt",Ubica);
        setNav('Home');
    }
    return (
        <View style={styles.content}>   
            <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
                <View style={styles.body}>
                    {
                        verifyConexion ? 
                        <>
                            <ChooseZoneApt getListZoneApt={getListZonesApt} setUbicaHome={setUbica}/>
                            <Button func={goHome} text='Ir' colorBtn='#000' colorTxt="white"/>
                        </>
                        : <><ChooseZoneApt getListZoneApt={getListZonesApt} setUbicaHome={setUbica}/></>
                    }
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    image: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "hsla(0, 100%, 0%, 0.2)",
        borderRadius: 10,
        padding: 20,
    }   
})

export default ChooseZone;