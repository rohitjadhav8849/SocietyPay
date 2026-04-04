import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type Props = {
  onOpenChat: () => void;
  onOpenAnnouncements: () => void;
  onOpenMembers: () => void;
};

const CommunicationHub = ({
  onOpenChat,
  onOpenAnnouncements,
  onOpenMembers,
}: Props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>
        Chat
      </Text>

      {/* ANNOUNCEMENTS */}
      <TouchableOpacity style={styles.card} onPress={onOpenAnnouncements}>
        <Text style={styles.icon}>📢</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Announcements</Text>
          <Text style={styles.cardSub}>
            View pinned & important notices
          </Text>
        </View>
      </TouchableOpacity>

      {/* GROUP CHAT */}
      <TouchableOpacity style={styles.card} onPress={onOpenChat}>
        <Text style={styles.icon}>💬</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Society Group Chat</Text>
          <Text style={styles.cardSub}>
            12 members online • Join discussion
          </Text>
        </View>
      </TouchableOpacity>

      {/* ONLINE MEMBERS */}
      <TouchableOpacity style={styles.card} onPress={onOpenMembers}>
        <Text style={styles.icon}>👥</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Online Members</Text>
          <Text style={styles.cardSub}>
            See who is currently active
          </Text>
        </View>
      </TouchableOpacity>

      {/* NOTICE ARCHIVE */}
      <View style={styles.card}>
        <Text style={styles.icon}>📜</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Notice Archive</Text>
          <Text style={styles.cardSub}>
            View past announcements
          </Text>
        </View>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

export default CommunicationHub;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F8FAFC",
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 26,
    marginRight: 16,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
  },

  cardSub: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
  },
});