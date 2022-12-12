import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const MyDataScore = ({ myScore }) => {
    const [scoreCurrent, setScoreCurrent] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);

    const [scoreStore, setScoreStore] = useState(0);

    useEffect(() =>{
        scoreHit(myScore);
        setScoreStore(myScore);
    }, []);

    const scoreHit = (scoreH) => {
        if (scoreH > 0 && scoreH <= 5) {
            let score = [];

            for (let i = 1; i <= 5; i++) {
                score.push(i <= scoreH);
            }
            setScoreCurrent(score);
        }else {
            setScoreCurrent([
                false,
                false,
                false,
                false,
                false,
            ]);
        }
    }

    const changeScoreStar = (score) => {
        if (score == scoreStore) {
            scoreHit(0);
            setScoreStore(0);
        }else {
            scoreHit(score);
            setScoreStore(score);
        }
    }

    const StartNoActive = ({ size, index }) => {
        return (
            <Pressable onPress={() => changeScoreStar(index) } >
                {/* <AntDesign name="staro" size={size} style={styles.starStyle} /> */}
                <AntDesign name="staro" size={size} style={styles.starStyle} />
            </Pressable>
        );
    }

    const StartActive = ({ size, index }) => {
        return (
            <Pressable onPress={() => changeScoreStar(index)} >
                {/* <AntDesign name="star" size={size} style={styles.starStyle} /> */}
                <AntDesign name="star" size={size} style={styles.starStyle} />
            </Pressable>
        );
    }

    const sizeStart = 35;
    return (
        <View style={styles.containerMyScore}>
            <View style={styles.starScore}>
                {
                    scoreCurrent.map((score, ind) => {
                        const index = ind + 1;
                        return (
                            score
                            ? <StartActive size={sizeStart} index={index} key={index} />
                            : <StartNoActive size={sizeStart} index={index} key={index} />
                        );
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMyScore: {
        marginTop: 10,
        padding: 12,
        alignItems: "center",
    },
    starScore: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    starStyle: {
        color: "#CB7A58",
    },
})

export default MyDataScore;