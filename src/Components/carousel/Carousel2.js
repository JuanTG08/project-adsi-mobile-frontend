import React, { useRef, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import Config from '../../Services/ConfigApi';

const { width, height } = Dimensions.get("window");

const Carousel = ({ data, showSite }) => {
  let flatList = useRef(null);
  const [currentIndex, setcurrentIndex] = useState(0);

  const onViewRef = useRef(({ changed }) => {
    setcurrentIndex(changed[0].index);
  });

  const showSiteCard = (idSite) => {
    showSite(idSite);
  }

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <ImageBackground
          source={{
            uri:
              `http://${Config.DOMAIN_IMAGES}/ImagesTest/${item.carpeta}/${item.url_foto}`
          }}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.name}>{item.Nombre}</Text>
          <Button
            onPress={() => showSiteCard(item.Id_Sitio)}
            title="Ver Sitio"
            color="black"
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const changeViewble = (index) => {
    flatList.current.scrollToIndex({ animated: true, index: index });
  };

  return (
    <View style={styles.content}>
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={flatList}
        style={styles.carousel}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={styles.dotView}>
        {data.map(({}, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.circle,
              { backgroundColor: index == currentIndex ? "white" : "gray" },
            ]}
            onPress={() => changeViewble(index)}
          />
        ))}
      </View>
    </View>
  );
};
export default Carousel;

const styles = StyleSheet.create({
  content: {},
  carousel: {
    maxHeight: 300,
  },
  image: {
    width,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  circle: {
    width: 12,
    height: 12,
    backgroundColor: "gray",
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
