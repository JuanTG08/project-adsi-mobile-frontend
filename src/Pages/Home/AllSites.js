import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Config from '../../Services/ConfigApi';

const AllSites = ({ allListSites, goSiteCard }) => {
  const [listSites, setListSites] = useState(allListSites);

  useEffect(() => {
    setListSites(allListSites);
  }, []);

  const RenderItemsCard = ({ data }) => {
    return (
      <View style={styles.containerItemData}>
        <View style={styles.containerImageItemData}>
          <Image
            source={{
              uri: `http://${Config.DOMAIN_IMAGES}/ImagesTest/${data.carpeta}/${data.url_foto}`,
            }}
            style={styles.image}
          />
          <Pressable style={styles.btnViewContent} onPress={() => goSiteCard(data.Id_Sitio)}><Text style={styles.txtBtnViewContent}>VER</Text></Pressable>
        </View>
        <View style={styles.containerItemDataText}>
          <Text style={styles.textTitle}>{data.Nombre}</Text>
          <ScrollView>
            <Text style={styles.textParrafo}>{data.Descripcion}</Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.containerData}>
      {listSites.map((item) => (
        <RenderItemsCard key={item.Id_Sitio} data={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerInput: {
    alignItems: "center",
    marginTop: 10,
    width: "90%",
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  containerData: {
    flex: 1,
    width: "95%",
    marginTop: 10,
  },
  containerItemData: {
    maxHeight: 170,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  containerImageItemData: {
    width: "35%",
    height: 150,
  },
  containerItemDataText: {
    width: "60%",
    marginLeft: "5%",
  },
  textInput: {
    backgroundColor: "#ffffff6b",
    width: "100%",
    color: "red",
    padding: 10,
    paddingLeft: 15,
    fontSize: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonChanges: {
    backgroundColor: "#ffffff6b",
    borderColor: "white",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    marginTop: 10,
  },
  separatorButton: {
    width: "20%",
  },
  buttonSelected: {
    backgroundColor: "#000000a2",
    borderColor: "white",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    marginTop: 10,
  },
  textButtonSelected: {
    color: "white",
  },
  textButtonNotSelected: {
    color: "black",
  },
  image: {
    width: "100%",
    height: "65%",
    borderRadius: 20,
  },
  backgroundFondo: {
    width: "100%",
    flex: 1,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  btnViewContent: {
      flex: 1,
      justifyContent: "center",
      height: "30%",
      marginTop: "5%",
      borderRadius: 15,
      borderWidth: 2,

  },
  txtBtnViewContent: {
      textAlign: "center",
      fontWeight: "bold"
  },
});

export default AllSites;
