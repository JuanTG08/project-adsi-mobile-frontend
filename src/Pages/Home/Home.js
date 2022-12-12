import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ImageBackground, Pressable, ScrollView} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome} from '@expo/vector-icons'; 

import Carousel from '../../Components/carousel/Carousel2';
import useSite from '../../Hook/useSite';
import Button from "../../Components/Forms/Button";
import Cargando from '../../Components/Alerts/Cargando';

import fondo from "../../Sources/Images/fondo.jpeg";
import notImage from '../../Sources/Images/not_image.png';

const Home = ({ navigation, logOut, getListTopSites, showSiteCard }) => {
    const [listTopSites, setListTopSites] = useState(false);

    useEffect(async () =>{
        const sitesTop = await getListTopSites();
        setListTopSites(sitesTop);
    }, []);

    const showSite = (idSite) => {
        showSiteCard(idSite);
    }

    const ImageNotAvailable = () => {
        return (
            <View style={styles.containerImageNotAvailable}>
                <ImageBackground source={notImage} resizeMode="cover" style={styles.imageNotAvailable} />
            </View>
        );
    }

    return (
        <View style={styles.content}>
            <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
                <ScrollView>
                    {
                        listTopSites ? <Carousel data={listTopSites} showSite={showSite} /> : <ImageNotAvailable />
                    }
                    
                    <View style={styles.contentButtons}>
                        <Button func={navigation} argFunc={'listSites'} text='Otros sitios y eventos de interes' colorBtn='#000' colorTxt="white"/>
                        <View style={{width: "30%", marginRight: 15}}>
                            <Pressable style={styles.Button2} onPress={() => navigation('listSites')}>
                                <FontAwesome5 name="map-marked-alt" size={40} color="white" />
                                <Text style={styles.textButton}>Sitios</Text>
                            </Pressable>
                        </View>
                        <View style={{width: "30%", marginLeft: 15}}>
                            <Pressable style={styles.Button2} onPress={() => navigation('Profile')}>
                                <FontAwesome5 name="user-edit" size={40} color="white" />
                                <Text style={styles.textButton}>Perfil</Text>
                            </Pressable>
                        </View>
                        <Button func={logOut} text='Salir' colorBtn='#000' colorTxt="white"/>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    contentButtons:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 20
    },
    content: {
        flex: 1,
    },
    image: {
        width: "100%",
        flex: 1,
        justifyContent: 'center',
    },
    Button:{
        alignItems: "center",
        justifyContent: 'center',
        width: "35%",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 20,
        margin: 10,
    },
    Button2:{
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 20,
        margin: 10,
    },
    textButton:{
        color: 'white',
    },
    imageNotAvailable: {
      width: 250,
      height: 250,
    },
    containerImageNotAvailable: {
      width: "100%",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
})

export default Home;
