import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView, ImageBackground, Dimensions} from 'react-native';
import Button from '../../Components/Forms/Button';
import useCompare from '../../Hook/useCompare';

import fondo from "../../Sources/Images/fondo.jpeg";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FormProfile = ({
    dataForm,
    setDataForm,
    verifyProccessDataUser,
    getDepartamentos,
    listMun,
}) => {
    const changeInputDataUser = (campo, value) => {
        setDataForm({ ...dataForm, [campo]: value });
    }
    const [idDept, setIdDept] = useState(false);
    const [listDepartamentos, setListDepartamentos] = useState(false);

    const [idMuni, setIdMuni] = useState(false);
    const [listMunicipios, setListMunicipios] = useState(false);

    useEffect(async () => {
        setListDepartamentos(await getDepartamentos());
    }, []);

    useEffect(async () => {
        if (dataForm && !idDept) {
            const idDepar = dataForm.CodMunicipio[0] + "" + dataForm.CodMunicipio[1];
            setIdDept(idDepar);
            setIdMuni(dataForm.CodMunicipio);

            setListMunicipios(await listMun(idDepar));
        }
    }, [dataForm]);

    useEffect(async () => {
        if (idDept) {
            const listaMuni = await listMun(idDept);
            setListMunicipios(listaMuni);

            if (idDept != dataForm.CodMunicipio[0] + "" + dataForm.CodMunicipio[1]) {
                setIdMuni(listaMuni[0].CodMunicipio);
            }
        }
    }, [idDept]);

    useEffect(() => {
        if (idMuni) {
            console.log("cambio");
            changeInputDataUser("CodMunicipio", idMuni);
        }
    }, [idMuni]);

    const ListPickerDepartamentos = () => { // "Select" de Departamentos
        return (
            <Picker
                style={styles.selectForm}
                selectedValue={idDept}
                onValueChange={(val) => setIdDept(val)}
            >
                {
                    listDepartamentos ?
                        listDepartamentos.map((item) => {
                            return (
                                <Picker.Item label={item.nombreDepto} value={item.codDepto} key={item.codDepto} />
                            )
                        })
                    : <Picker.Item label={"Cargando"} value={-1} key={-1} />
                }
            </Picker>
        );
    }

    const ListPickerMunicipios = () => { // Select de Municipios
        return (
            <Picker
                selectedValue={idMuni}
                style={styles.selectForm}
                onValueChange={(val) => setIdMuni(val)}
            >
                {
                    listMunicipios ?
                    listMunicipios.map((item) => {
                            return (
                                <Picker.Item label={item.NombreMunicipio} value={item.CodMunicipio} key={item.CodMunicipio} />
                            )
                        })
                    : <Picker.Item label={"Cargando"} value={-1} key={-1} />
                }
            </Picker>
        );
    }
    
    return (
        verifyProccessDataUser ?
            <View>
                <Text style={{fontWeight: "bold", fontSize: 15}}>Nombre</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nombres"
                    value={dataForm.Nombres}
                    onChangeText={(val) => changeInputDataUser("Nombres", val)}
                />

                <Text style={{fontWeight: "bold", fontSize: 15}}>Apellidos</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Apellidos"
                    value={dataForm.Apellidos}
                    onChangeText={(val) => changeInputDataUser("Apellidos", val)}
                />
                
                <Text style={{fontWeight: "bold", fontSize: 15}}>Telefono</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Telefono"
                    value={dataForm.Telefono}
                    onChangeText={(val) => changeInputDataUser("Telefono", val)}
                />

                <Text style={{fontWeight: "bold", fontSize: 15}}>Direccion</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Direccion"
                    value={dataForm.Direccion}
                    onChangeText={(val) => changeInputDataUser("Direccion", val)}
                />

                <Text style={{fontWeight: "bold", fontSize: 15}}>Departamentos:</Text>
                <ListPickerDepartamentos />

                <Text style={{fontWeight: "bold", fontSize: 15}}>Municipios:</Text>
                <ListPickerMunicipios />

                <Text style={{fontWeight: "bold", fontSize: 15}}>Genero</Text>
                <Picker
                    style={styles.selectForm}
                    selectedValue={dataForm.Genero}
                    onValueChange={(val) => changeInputDataUser("Genero", val)}
                >
                    <Picker.Item label={"Masculino"} value={"M"} key={"M"} />
                    <Picker.Item label={"Femenino"} value={"F"} key={"F"} />
                </Picker>
            </View>
        : <Text>Error</Text>
    );
}


const Profile = ({
    userData,
    updateDataUser,
    listMun,
    getDepartamentos
}) => {
    const [verifyProccessDataUser, setVerifyProccessData] = useState(false);
    const [veryButtonUpdateDataUser, setVeryButtonUpdateDataUser] = useState(false);
    const [dataForm, setDataForm] = useState(false);

    useEffect(async() => {
        if (userData) {
            setVerifyProccessData(true);
            setDataForm({
                Nombres: userData.Nombres,
                Apellidos: userData.Apellidos,
                Telefono: userData.Telefono,
                Direccion: userData.Direccion,
                CodMunicipio: userData.CodMunicipio,
                Genero: userData.Genero,
            });
        }
    }, []);

    useEffect(() => {
        setVeryButtonUpdateDataUser(useCompare.Objects(userData, dataForm));
    }, [dataForm]);

    const buttonOnClick = () => {
        console.log(dataForm);
    }

    const verifyUpdateDataUser = () => {
        if (veryButtonUpdateDataUser) {
            updateDataUser(dataForm);
        }
    }

    const ButtonsProfile = () => {
        return (
            <View style={{ marginBottom: 30 }}>
                <Button func={verifyUpdateDataUser} text='Actualizar' colorBtn={ veryButtonUpdateDataUser ? 'blue' : 'grey' }/>
            </View>
        );
    }

    return (
        <View style={styles.content}>
            <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
                <ScrollView style={{width: '100%', padding: 25,}}>
                    <FormProfile
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                        verifyProccessDataUser={verifyProccessDataUser}
                        listMun={listMun}
                        getDepartamentos={getDepartamentos}
                    />
                    <ButtonsProfile />
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    content:{
        flex:1,
    },
    image: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    contaiener: {
    },
    textInput: {
        borderWidth: 2,
        borderColor: "black",
        color: "black",
        borderRadius: 10,
        width: "100%",
        padding: 10,
        paddingLeft: 15,
        marginBottom: 10,
    },
    textTitle: {
    },
  });

export default Profile;