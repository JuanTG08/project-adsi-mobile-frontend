import React, { useEffect, useState } from 'react';
import requestApi from '../Services/RequestAPI';
import Register from '../Pages/Initials/Register';

const RegisterScreen = ({ navigation }) => {
    const [departamentos, setDepartamentos] = useState(false);
    const [navs, setNavs] = useState(false);

    const navigateRegister = (nav) => {
        setNavs(nav);
    }

    useEffect(() => {
        if (navs) {
            navigation.replace(navs);
        }
    }, [navs]);


    useEffect(async () => {
        const connection = await requestApi.testConnection();
        // No hay conexion con la api
        if (!connection) alert("No tienes Conexion");
        if (connection) {
            const resDepartamentos = await requestApi.getDepartamentos();
            if (!resDepartamentos.error && resDepartamentos.statusCode == 200 && resDepartamentos.others.length > 0) {
                setDepartamentos(resDepartamentos.others);
            }
        }
    }, []);

    const listMunicipiosByDept = async (codDepa) => {
        let response = false;
        const respMunicipios = await requestApi.listMunicipiosByDept(codDepa);
        if (!respMunicipios.error && respMunicipios.statusCode == 200 && respMunicipios.others.length > 0) {
            response = respMunicipios.others;
        }else {
            alert("No tienes conexion");
        }
        return response;
    }

    const registerUser = async (data) => {
        const requestRegisterUser = await requestApi.registerUserVisitante(data);
        return requestRegisterUser;
    }

    return (
        <Register
            listDepartamentos={departamentos}
            listMunicipios={listMunicipiosByDept}
            registerUser={registerUser}
            navigateRegister={navigateRegister}
        />
    );
}

export default RegisterScreen;