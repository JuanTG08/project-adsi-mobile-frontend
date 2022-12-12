import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from "react-native";
import useRedirect from "../../Hook/useRedirect";
import useLocalStorage from "../../Hook/useStorage";

const ChooseZoneApt = ({ getListZoneApt, setUbicaHome, navigation }) => {

  const [Ubica, setUbica] = useState("VIL");
  const [zonas, setZonas] = useState(false);

  useEffect(async () => {
    setZonas(await getListZoneApt());
  }, []);

  return (
    <>
      <Text style={styles.textStyle}>Elije tu zona de interes</Text>
      <Picker
        selectedValue={Ubica}
        style={{ width: 200 }}
        onValueChange={(val) => {setUbica(val), setUbicaHome(val)}}
      >
        {/* <Picker.Item label={"GUA"} value={"GUA"} key={"GUA"} /> */}
        {
          zonas ?
            zonas.map((item) => {
                return (
                    <Picker.Item label={item.Nombre_Aplicacion} value={item.Zona_APT} key={item.Zona_APT} />
                )
            })
          : <Picker.Item label={"Cargando..."} value={"-1"} key={"0"} />
        }
      </Picker>
      {/* <Button title="Ver Zona" onPress={() => setZoneLocal()} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ChooseZoneApt;