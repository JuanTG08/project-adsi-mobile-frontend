import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import AllEvents from "../Pages/Home/AllEvents";
import AllSites from "../Pages/Home/AllSites";
import requestApi from "../Services/RequestAPI";
import fondo from "../Sources/Images/fondo.jpeg";

import notFound from "../Sources/Images/not_found.png";

const SitesAndEventsScreen = ({ navigation }) => {
  const [selectOptionButtons, setSelectOptionButtons] = useState({
    sitios: true,
    eventos: false,
  });

  const [listSites, setListSites] = useState(false);
  const [listEvents, setListEvents] = useState(false);

  useEffect(async () => {
    const getDataSites = await requestApi.listAllSites();
    const getDataEvent = await requestApi.listAllEventos();
    if (
      !getDataSites.error &&
      getDataSites.others.length > 0 &&
      !getDataEvent.error &&
      getDataEvent.others.length > 0
    ) {
      setListSites(getDataSites.others);
      setListEvents(getDataEvent.others);
    } else {
      alert("No tienes conexion a internet");
    }
  }, []);

  const setStateSelectOptionButtons = (optButton) => {
    if (optButton != selectOptionButtons[optButton]) {
      if (optButton == "sitios") {
        setSelectOptionButtons({
          sitios: true,
          eventos: false,
        });
      } else {
        setSelectOptionButtons({
          sitios: false,
          eventos: true,
        });
      }
    }
  };

  const NotContent = () => {
    return (
      <View style={styles.containerNotFound}>
        <ImageBackground source={notFound} resizeMode="cover" style={styles.imageNotFound} >
        </ImageBackground>
        <Text style={styles.textNotFound}>Sin resultados</Text>
      </View>
    );
  }

  const SelectedChangeSitesInEvents = () => {
    if (selectOptionButtons.sitios) {
      return listSites ? <AllSites allListSites={listSites} goSiteCard={goSiteCard} /> : <NotContent />;
    } else if (selectOptionButtons.eventos) {
      return listEvents ? <AllEvents allListEvents={listEvents} goEventsCard={goEventsCard} /> : <NotContent />;
    }
  }

  const ContainerSectionSearch = () => {
    return (
      <View style={styles.containerSearch} >
        <TextInput style={styles.textInput} />
      </View>
    );
  }

  const goSiteCard = (idSite) => {
    navigation.navigate('siteCard', {
      idSite,
    });
  }

  const goEventsCard = (idEvent) => {
    navigation.navigate('eventCard', {
      idEvent,
    });
  }

  return (
    <ImageBackground source={fondo} resizeMode="cover" style={styles.container}>
      <View style={styles.containerInput}>
        {/*<ContainerSectionSearch />*/}
        <View style={styles.containerButtons}>
          <Pressable
            style={
              selectOptionButtons.sitios
                ? styles.buttonSelected
                : styles.buttonChanges
            }
            onPress={() => setStateSelectOptionButtons("sitios")}
          >
            <Text
              style={
                selectOptionButtons.sitios
                  ? styles.textButtonSelected
                  : styles.textButtonNotSelected
              }
            >
              Sitios
            </Text>
          </Pressable>
          <View style={styles.separatorButton}></View>
          <Pressable
            style={
              selectOptionButtons.eventos
                ? styles.buttonSelected
                : styles.buttonChanges
            }
            onPress={() => setStateSelectOptionButtons("eventos")}
          >
            <Text
              style={
                selectOptionButtons.eventos
                  ? styles.textButtonSelected
                  : styles.textButtonNotSelected
              }
            >
              Eventos
            </Text>
          </Pressable>
        </View>
      </View>

      <SelectedChangeSitesInEvents />
    </ImageBackground>
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
    height: 140,
  },
  containerItemDataText: {
    width: "60%",
    marginLeft: "5%",
  },
  containerSearch: {
    width: "100%",
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
    height: "100%",
    borderRadius: 20,
  },
  backgroundFondo: {
    width: "100%",
    flex: 1,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerNotFound: {
    flex: 1,
    width: "100%",
    padding: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  imageNotFound: {
    width: "100%",
    height: 250,
  },
  textNotFound: {
    backgroundColor: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
  },
});

export default SitesAndEventsScreen;
