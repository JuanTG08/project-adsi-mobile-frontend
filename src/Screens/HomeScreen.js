import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Cargando from '../Components/Alerts/Cargando';

import useRedirect from '../Hook/useRedirect';
import useLocalStorage from '../Hook/useStorage';
import useUserUpdateInfo from '../Hook/useUserUpdateInfo';
import useZoneApt from '../Hook/useZoneApt';

import Home from '../Pages/Home/Home';
import requestApi from '../Services/RequestAPI';

const Homescreens = ({ navigation }) => {
    const [nav, setNavs] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        useUserUpdateInfo.updateInfoUser();
        if (nav) {
            navigation.navigate(nav);
            setNavs(false);
        }
    }, [nav])


    useEffect(async () => {
        const isLogg = await useRedirect.isLoged(navigation);
        if (isLogg) setConfirm(true);
    }, []);

    const logOut = async () => {
        await useLocalStorage.removeItem('UserItemID');
        await navigation.replace('Welcome');
    }

    const getListTopSites = async () => {
        let response = false;
        const listTop = await requestApi.listTopSites();
        if (listTop && !listTop.error && listTop.others.length > 0) response = listTop.others;
        else if (listTop.statusCode == 408) alert("No hay sitios para esta seleccion.");
        return response;
    }

    const showSiteCard = (idSite) => {
        navigation.navigate('siteCard', {
            idSite,
        });
    }
    

    return (
        <>
            {
                confirm ? (
                    <Home navigation={setNavs} logOut={logOut} getListTopSites={getListTopSites} showSiteCard={showSiteCard} />
                ) : <Cargando />
            }
            
        </>
    );
}

const styles = StyleSheet.create({})

export default Homescreens;