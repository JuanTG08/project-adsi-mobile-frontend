import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import useLocalStorage from '../Hook/useStorage';
import BoxComment from '../Pages/SitesAndEvents/BoxComment';
import CardEvent from '../Pages/SitesAndEvents/CardEvent';
import requestApi from '../Services/RequestAPI';

const EventViewCardScreen = ({ route, navigation }) => {
    const { idEvent } = route.params;
    const [dataEvent, setDataEvent] = useState(false);
    useEffect(async () => {
        const dataEvent = await requestApi.getDataEvent(idEvent);
        if (!dataEvent.error && dataEvent.others) {
            setDataEvent(dataEvent.others);
            navigation.setOptions({ title: dataEvent.others.event.Nombre_Evento });
        }
    }, [])

    const sendDataComment = async (comment) => {
        const UserItemID = await useLocalStorage.getItem("UserItemID");
        if (UserItemID.length > 0) {
            const UserItemJSON = JSON.parse(UserItemID);
            if (UserItemJSON.Id_Usuario) {
                const Id_Usuario = UserItemJSON.Id_Usuario;
                const data = {
                    Id_Evento: idEvent,
                    Comentario: comment,
                    Id_Usuario,
                };
                const saveCommentRequest = await requestApi.saveComment(data);
                if (saveCommentRequest) {
                    alert(saveCommentRequest.message);
                    const dataEvent = await requestApi.getDataEvent(idEvent);
                    if (!dataEvent.error && dataEvent.others) setDataEvent(dataEvent.others);
                }
                else alert("No tienes conexion");
                return ;
            }
        }
        alert("Error.");
    }

    return (
        <>
            <View style={styles.content}>
                <CardEvent dataInfoEvent={dataEvent} />
            </View>
            <BoxComment sendDataComment={sendDataComment} />
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    boxComment: {
        backgroundColor: '#C4C4C4',
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: "5%",
    },
    inputTextAddComment: {
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#949494',
        fontSize: 14,
        fontWeight: "bold",
    },
    btnSendComment: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#949494',
        alignItems: "center",
        justifyContent: "center"
    },
})

export default EventViewCardScreen;
