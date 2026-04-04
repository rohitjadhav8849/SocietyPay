import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

type Props = {
  message: string;
  sender: string;
  time: string;
  onPress?: () => void;
};

const ChatPreviewCard = ({ message, sender, time, onPress }: Props) => {
  // 🔹 Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // 🔹 Run animation once when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.sender}>📌 {sender}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>

          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>

          <Text style={styles.openText}>
            Tap to open society chat →
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChatPreviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    // marginHorizontal: 10,
    // marginTop: 10,
    marginBottom:15,
    padding: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  sender: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  time: {
    fontSize: 12,
    color: "#64748B",
  },

  message: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },

  openText: {
    marginTop: 10,
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
});
