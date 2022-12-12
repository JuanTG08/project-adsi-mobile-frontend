import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {View, StyleSheet, Text, TextInput, Pressable} from 'react-native';
import CardSite from '../Pages/SitesAndEvents/CardSite';
import requestApi from '../Services/RequestAPI';
import { Feather } from '@expo/vector-icons';
import BoxComment from '../Pages/SitesAndEvents/BoxComment';
import useLocalStorage from '../Hook/useStorage';

const SiteViewCardScreen = ({ route, navigation }) => {
    const { idSite } = route.params;
    const [dataSite, setDataSite] = useState(false);
    
    useEffect(async () => {
        const dataSite = await requestApi.getDataSite(idSite);
        if (!dataSite.error && dataSite.others) {
            setDataSite(dataSite.others);
            navigation.setOptions({ title: dataSite.others.site.Nombre });
        }
    }, []);

    const sendDataComment = async (comment) => {
        const UserItemID = await useLocalStorage.getItem("UserItemID");
        if (UserItemID.length > 0) {
            const UserItemJSON = JSON.parse(UserItemID);
            if (UserItemJSON.Id_Usuario) {
                const Id_Usuario = UserItemJSON.Id_Usuario;
                const data = {
                    Id_Sitio: idSite,
                    Comentario: comment,
                    Id_Usuario,
                };
                const saveCommentRequest = await requestApi.saveComment(data);
                if (saveCommentRequest) {
                    alert(saveCommentRequest.message);
                    const dataSite = await requestApi.getDataSite(idSite);
                    if (!dataSite.error && dataSite.others) setDataSite(dataSite.others);
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
                <CardSite dataInfoSite={dataSite} />
            </View>
            <BoxComment sendDataComment={sendDataComment} />
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
})

export default SiteViewCardScreen;