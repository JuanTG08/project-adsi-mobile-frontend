import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";

const BoxComment = ({ sendDataComment }) => {
  const [comment, setComment] = useState();

  const sendComment = () => {
    if (comment != null) {
        const comentario = comment.trim();
        if (comentario.length > 0) {
            sendDataComment(comentario);
        }else {
            alert("Escribe un comentario.");
        }
    }else {
        alert("Escribe un comentario.");
    }
    setComment(null);
  }

  return (
    <View style={styles.boxComment}>
      <TextInput
        placeholder="Agregar un Comentario..."
        style={styles.inputTextAddComment}
        placeholderTextColor="#C4C4C4"
        onChangeText={(text) => setComment(text)}
        value={comment}
      />
      <Pressable style={styles.btnSendComment} onPressOut={() => sendComment()}>
        <Feather
          name="send"
          size={40}
          color="#949494"
          style={styles.iconBtnSend}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  boxComment: {
    backgroundColor: "#C4C4C4",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: "5%",
  },
  inputTextAddComment: {
    backgroundColor: "white",
    width: "75%",
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#949494",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnSendComment: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#949494",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BoxComment;
