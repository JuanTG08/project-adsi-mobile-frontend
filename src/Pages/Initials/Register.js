import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import ButtonComponent from "../../Components/Forms/Button";
import fondo from "../../Sources/Images/fondo.jpeg";
import logo from "../../Sources/Images/logo.png";

const Register = ({
  listDepartamentos, // Lista de Departamentos
  listMunicipios, // Lista de Municipios
  registerUser, // Se manda la peticion para que se registre el nuevo usuario
  navigateRegister,
}) => {
  const [dataFormRegister, setDataFormRegister] = useState({
    nombreusuario: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    email: "",
    password: "",
    genero: "M",
    autorizacionTD: "S",
  });

  const [fechaNac, setFechaNac] = useState(new Date(Date.parse("2022-01-02")));

  const setValuesDataForm = (item, value) => {
    // Establecemos los valores en la variable de estado "dataFormRegister"
    setDataFormRegister({ ...dataFormRegister, [item]: value });
  };

  const [selectListMunicipio, setSelectListMunicipio] = useState(false); // Listado de municipios

  const [selectDepartamento, setSelectDepartamento] = useState(false); // Departamento seleccionado
  const [selectMun, setSelectMun] = useState(false); // Departamento seleccionado

  const [textButtonRegister, setTextButtonRegister] = useState("Crear Cuenta");

  useEffect(async () => {
    // Al iniciar el aplicativo, se debe ejecutar predeterminadamente el listado de municipios
    getListMunicipios("05");
  }, []);

  const changeDepartamento = (val) => {
    // Al cambiar de departamentos, se debe cambiar sus municipios
    if (val != selectDepartamento) {
      setSelectDepartamento(val);
      getListMunicipios(val);
    }
  };

  const getListMunicipios = async (codeDept) => {
    // Se obtiene la lista de municipios
    const responseListMun = await listMunicipios(codeDept);
    if (responseListMun) {
      setSelectListMunicipio(responseListMun);
      setSelectMun(responseListMun[0].CodMunicipio);
    }
  };

  const verifyInfoForm = async () => {
    /*
            Se debe verificar los datos antes de enviarlos
        */
    const data = {
      ...dataFormRegister,
      codmunicipio: selectMun,
      fechaNac,
    };
    alert("Aceptas todas las codiciones de este sistema.");
    const respRegisterUse = await registerUser(data);
    if (!respRegisterUse.error && respRegisterUse.statusCode == 200) {
      alert(
        "Cuenta creada, se envio un mail a tu correo dado, por favor ve y confirma para poder continuar..."
      );
      clearForm();
      navigateRegister("Login");
    } else {
      alert(respRegisterUse.message);
    }
  };

  const clearForm = () => {
    // Limpiamos los formularios
    setDataFormRegister({
      nombreusuario: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      direccion: "",
      email: "",
      password: "",
      genero: "M",
      autorizacionTD: "S",
    });
    setSelectDepartamento("05");
    getListMunicipios("05");
  };

  const ListPickerDepartamentos = () => {
    // "Select" de Departamentos
    return listDepartamentos ? (
      <View style={styles.selectForm}>
        <Picker
          selectedValue={selectDepartamento}
          onValueChange={(val) => changeDepartamento(val)}
        >
          {listDepartamentos.map((item) => {
            return (
              <Picker.Item
                label={item.nombreDepto}
                value={item.codDepto}
                key={item.codDepto}
              />
            );
          })}
        </Picker>
      </View>
    ) : (
      <Text>Cargando</Text>
    );
  };

  const ListPickerMunicipios = () => {
    // Select de Municipios
    return selectListMunicipio ? (
      <View style={styles.selectForm}>
        <Picker
          selectedValue={selectMun}
          onValueChange={(val) => setSelectMun(val)}
        >
          {selectListMunicipio.map((item) => {
            return (
              <Picker.Item
                label={item.NombreMunicipio}
                value={item.CodMunicipio}
                key={item.CodMunicipio}
              />
            );
          })}
        </Picker>
      </View>
    ) : (
      <Text>Cargando</Text>
    );
  };

  const GeneroUser = () => {
    return (
      <Picker
        selectedValue={dataFormRegister.genero}
        onValueChange={(val) => setValuesDataForm("genero", val)}
      >
        <Picker.Item label={"Masculino"} value={"M"} key={"M"} />
        <Picker.Item label={"Femenino"} value={"F"} key={"F"} />
      </Picker>
    );
  };

  const dateTimePicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setFechaNac(currentDate);
    };
    DateTimePickerAndroid.open({
      value: fechaNac,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const getDateActualParse = (date) => {
    const dateParse = new Date(date);
    return (
      dateParse.getFullYear() +
      "/" +
      (dateParse.getMonth() + 1) +
      "/" +
      dateParse.getDate()
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
        <View style={styles.contentLogo}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.formControl}>
          <Text style={{ width: "86%", fontWeight: "bold", fontSize: 17 }}>
            Hola...
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => navigateRegister("Welcome")}
          >
            <Text style={styles.text}>x</Text>
          </Pressable>
          <Text
            style={{
              width: "100%",
              fontSize: 25,
              fontWeight: "bold",
              paddingBottom: 10,
            }}
          >
            Registrate
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Apodo"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("nombreusuario", val)}
            value={dataFormRegister.nombreusuario}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nombre"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("nombre", val)}
            value={dataFormRegister.nombre}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Apellidos"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("apellidos", val)}
            value={dataFormRegister.apellidos}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Telefono"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("telefono", val)}
            value={dataFormRegister.telefono}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Direccion"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("direccion", val)}
            value={dataFormRegister.direccion}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(val) => setValuesDataForm("email", val)}
            value={dataFormRegister.email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            placeholderTextColor="black"
            textContentType="password"
            onChangeText={(val) => setValuesDataForm("password", val)}
            value={dataFormRegister.password}
            secureTextEntry={true}
          />

          <Text style={{ width: "100%", fontSize: 16, paddingTop: 30 }}>
            Fecha Nacimiento:
          </Text>
          <ButtonComponent
            func={dateTimePicker}
            text={getDateActualParse(fechaNac.toString())}
            colorBtn="outline-dark"
          />

          <Text style={{ width: "100%", fontSize: 16 }}>Direccion:</Text>
          <ListPickerDepartamentos />
          <ListPickerMunicipios />

          <Text style={{ width: "100%", fontSize: 16 }}>Genero:</Text>

          <View style={styles.selectForm}>
            <GeneroUser />
          </View>
          <ButtonComponent
            func={verifyInfoForm}
            text="Registrate"
            colorBtn="#000"
            colorTxt="white"
          />
          <Text
            style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Text
              style={{ fontWeight: "bold", color: "red" }}
              onPress={() => navigateRegister("Login")}
            >
              Ingresa
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    flex: 1,
  },
  contentLogo: {
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: "center",
    backgroundColor: "hsla(0, 100%, 0%, 0.5)",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
  formControl: {
    flex: 1,
    width: "100%",
    marginTop: -40,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    justifyContent: "center", //centra todo el contenido de un div
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",

    alignContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
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
  selectForm: {
    borderWidth: 2,
    borderColor: "black",
    width: "100%",
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 20,
  },

  button: {
    borderRadius: 100,
    paddingBottom: 10,
    width: 40,
    height: 38,
    borderWidth: 1,
    borderColor: "red",
  },
  text: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
  },
});

export default Register;
