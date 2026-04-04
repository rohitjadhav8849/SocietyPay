import React ,{useContext} from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageBubble = ({ message }: any) => {


  return (
    <View
    key={message?.sender?._id}
      style={[
        styles.container,
        message.isMe ? styles.myMsg : styles.otherMsg,
      ]}
    >
      {!message.isMe && (
        <Text style={styles.sender}>{message?.sender?.name}</Text>
      )}

      <Text style={styles.text}>{message?.message}</Text>

      <Text style={styles.time}>{new Date(message?.createdAt).toLocaleString()}</Text>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  container: {
    maxWidth: "75%",
    padding: 5,
    borderRadius: 14,
    marginVertical: 6,
  },

  myMsg: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
    marginRight: 5,
  },

  otherMsg: {
    backgroundColor: "#1F2937",
    alignSelf: "flex-start",
    marginLeft: 5,
  },

  sender: {
    fontSize: 12,
    color: "#93C5FD",
    // marginBottom: 4,
  },

  text: {
    color: "#F9FAFB",
    fontSize: 15,
  },

  time: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
