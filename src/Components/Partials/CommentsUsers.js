import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const CommentsUsers = ({ comments }) => {
    const CardComment = ({ comment }) => {
        return (
            <View style={styles.cardComment}>
                <Text style={styles.textAuthorComment}>@{ comment.nameUser }</Text>
                <View style={styles.contentComment}>
                    <Text style={styles.textComment}>{ comment.Comentario }</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.containerComments}>
            <Text style={styles.textSubtitle}>Comentarios</Text>
            {
                comments ?
                comments.map(comment => {
                    return <CardComment comment={comment} key={comment.Id_Comentario} />
                })
                : <Text>Sin Comentarios, se el primero en comentar!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerComments: {
        marginTop: 10,
    },
    cardComment: {
        marginTop: 15,
    },
    contentComment: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 15,
        marginLeft: 15,
        marginTop: 4,
    },
    textSubtitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    textAuthorComment: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    textComment: {
        fontSize: 14,
    },
})

export default CommentsUsers;