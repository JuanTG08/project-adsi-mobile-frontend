import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ImageBackground, Pressable, ScrollView} from 'react-native';
import fondo from "../../Sources/Images/fondo.jpeg";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import CarrouselInfo from '../../Components/carousel/CarrouselInfo';
import DataDescription from '../../Components/Partials/DataDescription';
import MyDataScore from '../../Components/Partials/MyDataScore';
import CommentsUsers from '../../Components/Partials/CommentsUsers';

const CardSite = ({ dataInfoSite }) => {
    const [infoSite, setInfoSite] = useState(false);

    useEffect(() => {
        if (dataInfoSite) setInfoSite(dataInfoSite);
    });

    const ScoreGeneral = ({ scoreG }) => {
        return (
            <View style={styles.containerStoreGeneral}>
                <Text style={styles.textStoreGeneral}>{ scoreG }</Text>
            </View>
        );
    }

    const ShowDataInfoSite = () => {
        const dataSite = infoSite.site;
        const dataComments = infoSite.coments;
        const imagenes = infoSite.images;
        
        return (
            <>
                <Text style={styles.textTitle}>
                    { dataSite.Nombre }
                    <Ionicons name="location-outline" size={28} color="white" />
                </Text>
                <CarrouselInfo imagenes={imagenes} />
                <DataDescription description={dataSite.Descripcion} />
                <MyDataScore myScore={dataSite.Calificacion} />
                {/* <ScoreGeneral scoreG={dataSite.Calificacion} /> */}

                <CommentsUsers comments={dataComments} />
            </>
        );
    }

    return (
        <ImageBackground source={fondo} resizeMode="cover" style={styles.imageBackground}>
            <ScrollView style={styles.contentData}>
                {
                    infoSite ? <ShowDataInfoSite /> : <Text>Cargando...</Text>
                }
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    contentData: {
        width: "90%",
        marginLeft: "5%",
    },
    containerStoreGeneral: {
        backgroundColor: "red",
    },
    textTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    textStoreGeneral: {
        margin: 0,
        textAlign: "center",
        fontSize: 16,
    },
})

export default CardSite;