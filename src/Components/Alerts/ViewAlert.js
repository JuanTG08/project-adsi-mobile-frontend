import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import ForgotToPass from "../../Pages/Initials/ForgotToPass";
const ViewAlert = ({DivOpasity = null}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () =>{
    setModalVisible(false);
    showDiv();
  }
  const showDiv = () => {
    if (DivOpasity != null) {
      DivOpasity()
    }
  }
  return (
      <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={{ width: "86%" }}>¿Olvidaste tu Contraseña?</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible); showDiv()}}
                >
                  <Text style={styles.text}>x</Text>
                </Pressable>
                <Text style={{ width: "100%", fontSize: 25, fontWeight: "bold" }}>Recuperala</Text>
                <ForgotToPass exit={closeModal}/>
            </View>
            </View>
        </Modal>
        <Text style={{marginTop: 20, color: "black"}} onPress={() => {setModalVisible(true); showDiv()}} >¿ Olvidaste tu Contraseña ?</Text>
      </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    alignContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",

    width: "100%",
    minHeight: 120,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  }
});

export default ViewAlert;