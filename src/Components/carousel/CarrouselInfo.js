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
import Config from "../../Services/ConfigApi";

import notImage from '../../Sources/Images/not_image.png';

const { width, height } = Dimensions.get("window");

const CarrouselInfo = ({ imagenes }) => {
  const Carrousel = () => {
    let flatList = useRef(null);
    const [currentIndex, setcurrentIndex] = useState(0);

    const onViewRef = useRef(({ changed }) => {
      setcurrentIndex(changed[0].index);
    });

    const renderItems = ({ item }) => {
      return (
        <TouchableOpacity activeOpacity={1}>
          <ImageBackground
            source={{
              uri: `http://${Config.DOMAIN_IMAGES}/ImagesTest/${item.carpeta}/${item.url_foto}`,
            }}
            resizeMode="cover"
            style={styles.image}
          ></ImageBackground>
        </TouchableOpacity>
      );
    };

    const changeViewble = (index) => {
      flatList.current.scrollToIndex({ animated: true, index: index });
    };

    return (
      <View style={styles.content}>
        <FlatList
          data={imagenes}
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
          {imagenes.map(({}, index) => (
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

  const ImageNotAvailable = () => {
    return (
        <View style={styles.containerImageNotAvailable}>
            <ImageBackground source={notImage} resizeMode="cover" style={styles.imageNotAvailable} />
        </View>
    );
  }

  return (
    <View style={styles.containerCarrousel}>
      {/*<Carrousel />*/}
      {
        imagenes ? <Carrousel /> : <ImageNotAvailable />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  containerCarrousel: {
    width: "100%",
    minHeight: 250,
    marginTop: 10,
    borderRadius: 30,
  },
  content: {},
  carousel: {
    maxHeight: 300,
  },
  image: {
    width: width - width * 0.1,
    height: 250,
    padding: 10,
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
  imageNotAvailable: {
    width: 250,
    height: 250,
  },
  containerImageNotAvailable: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default CarrouselInfo;
