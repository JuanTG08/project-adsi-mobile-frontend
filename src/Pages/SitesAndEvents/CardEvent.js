import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ImageBackground, Text, ScrollView} from 'react-native';
import CarrouselInfo from '../../Components/carousel/CarrouselInfo';
import CommentsUsers from '../../Components/Partials/CommentsUsers';
import DataDescription from '../../Components/Partials/DataDescription';
import MyDataScore from '../../Components/Partials/MyDataScore';
import fondo from "../../Sources/Images/fondo.jpeg";

const CardEvent = ({ dataInfoEvent }) => {
    const [infoEvent, setInfoEvent] = useState(false);

    useEffect(() => {
        if (dataInfoEvent) setInfoEvent(dataInfoEvent);
    });

    const ShowDataInfoSite = () => {
        const dataEvent = infoEvent.event;
        const dataComments = infoEvent.coments;
        const images = infoEvent.images;
        return (
            <>
                <Text style={styles.textTitle}>
                    { dataEvent.Nombre_Evento }
                    <MaterialIcons name="event-note" size={28} color="white" />
                </Text>
                <CarrouselInfo imagenes={images} />
                <DataDescription description={dataEvent.Descripcion} />
                <MyDataScore myScore={dataEvent.Calificacion} />
                {/* <ScoreGeneral scoreG={dataEvent.Calificacion} /> */}

                <CommentsUsers comments={dataComments} />
            </>
        );
    }
    

    return (
        <ImageBackground source={fondo} resizeMode="cover" style={styles.imageBackground}>
            <ScrollView style={styles.contentData}>
                {
                    infoEvent ? <ShowDataInfoSite /> : <Text>Cargando...</Text>
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

export default CardEvent;