import React, { useEffect, useState } from 'react';
import useRedirect from '../Hook/useRedirect';
import useLocalStorage from '../Hook/useStorage';
import Login from '../Pages/Initials/Login';
import requestApi from '../Services/RequestAPI';

const LoginScreen = ({navigation}) => {
    const [navs, setNavs] = useState(false);
    const navigateRegister = (nav) => {
        setNavs(nav);
    }

    useEffect(() => {
        if (navs) {
            navigation.replace(navs);
        }
    }, [navs]);

    const requestLogin = async (data) => {
        if (data.email != '' && data.password != '') {
            const responseApi = await requestApi.logingUserVisitante(data);
            if (!responseApi) {
                alert("No tienes conexión a internet.")
            }else {
                if (!responseApi.error && responseApi.statusCode == 200 && responseApi.others) {
                    // Todo Bien
                    await useLocalStorage.setItem("UserItemID", JSON.stringify(responseApi.others));
                    navigation.replace('chooseZone');
                }else {
                    alert(responseApi.message);
                }
            }
        }else {
            alert('Campos Vacios')
        }
    }
    return <Login requestLogin={requestLogin} setNavigateRegister={navigateRegister} />;
}
export default LoginScreen;