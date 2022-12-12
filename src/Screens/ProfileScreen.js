import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import useLocalStorage from '../Hook/useStorage';
import Profile from '../Pages/Home/Profile';
import requestApi from '../Services/RequestAPI';

const ProfileScreen = ({ navigation }) => {
    const [UserID, setUserID] = useState(false);
    const [navigate, setNavigate] = useState(false);

    const [listDept, setListDept] = useState(false);
    const [listMun, setListMun] = useState(false);

    useEffect(async () => {
        const nombreUser = await getUserID();
        navigation.setOptions({ title: nombreUser });

        if (!listDept) {
            const dept = await requestApi.getDepartamentos();
            
            if (!dept.error && dept.others.length > 0) {
                setListDept(dept.others);
            }
        }
    }, []);

    const getListMun = async (departamento) => {
        let res = false;
        const mun = await requestApi.listMunicipiosByDept(departamento);
        if (mun && !mun.error && mun.others) res = mun.others;
        return res;
    }

    useEffect(() => {
        if (navigate) {
            if (navigate === 'Home') navigation.goBack();
            navigation.replace(navigate);
        }
    }, [navigate]);


    const setListMunicipios = async (idDept) => {
        const muni = await requestApi.listMunicipiosByDept(idDept);
    }

    const getListDepartments = async () => {
        let response = false;
        const departamentos = await requestApi.getDepartamentos();
        if (!departamentos.error && departamentos.statusCode == 200 && departamentos.others.length > 0) {
            response = departamentos.others;
        }
        return response;
    }

    const getUserID = async () => {
        const requestUserId = await useLocalStorage.getItem("UserItemID");
        if (requestUserId) {
            try {
                const user = JSON.parse(requestUserId);
                setUserID(user);
                return user.NombreUsuario;
            } catch (error) {
                console.log(error);
            }
        }
    }

    const updateDataUser = async (data) => {
        const dataInfoUser = {
            ...data,
            session_auth: {
                Id_Usuario: UserID.Id_Usuario,
                Email: UserID.Email,
                Password: UserID.Password
            }
        };
        const setUpdataUser = await requestApi.updateDataUserVistante(dataInfoUser);
        if (!setUpdataUser.error && setUpdataUser.statusCode === 200 && setUpdataUser.others) {
            await useLocalStorage.setItem("UserItemID", JSON.stringify(setUpdataUser.others));
            alert("Tu Usuario se actualizo correctamente");
            setNavigate('Home');
        }else {
            console.log("wtf");
            alert(setUpdataUser.message);
        }
    }

    const getDepartamentos = async () => {
        let res = false;
        const dept = await requestApi.getDepartamentos();
        if (!dept.error && dept.statusCode == 200 && dept.others.length > 0) res = dept.others;
        return res;
    }

    return UserID ?
            <Profile
                userData={UserID}
                updateDataUser={updateDataUser}
                listMun={getListMun}
                getDepartamentos={getDepartamentos}
            />
        : <Text>Loading...</Text>;
}

export default ProfileScreen;