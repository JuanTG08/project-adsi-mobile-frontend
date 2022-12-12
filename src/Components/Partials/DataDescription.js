import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const DataDescription = ({ description }) => {
    return (
        <View style={styles.containerDescription}>
            <Text style={styles.textDescription}>{ description }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerDescription: {
        backgroundColor: "#00000071",
        width: "100%",
        marginTop: 10,
        padding: 12,
        borderRadius: 20,
    },
    textDescription: {
        color: "white",
        fontSize: 18,
    },
});

export default DataDescription;