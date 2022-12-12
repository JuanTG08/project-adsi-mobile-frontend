import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, ImageBackground } from 'react-native';

import Carrousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from './animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Carousel = ({data}) => {
  const [Index, setIndex] = useState(0);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <ImageBackground source={{ uri: "http://192.168.137.24/ImagesTest/" + item.carpeta + '/' + item.url_foto }} resizeMode="cover" style={styles.image}>
          <Text style={styles.itemLabel}>{item.Nombre}</Text>
        </ImageBackground>
      </View>
    );
  }
  return (
    <View>
      <Carrousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}     
      />
      <Text style={styles.counter}
      >
        {'Sitio: '+(Index+1)}
      </Text>
    </View>
    );
}
export default Carousel;
const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    //backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: "100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
