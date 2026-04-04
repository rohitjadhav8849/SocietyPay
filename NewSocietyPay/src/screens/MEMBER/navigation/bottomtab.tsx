import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { typeTabs } from "./types";

const tabs: { key: typeTabs; label: string; icon: string }[] = [
  { key: "Home", label: "Home", icon: "home-outline" },
  { key: "History", label: "History", icon: "time-outline" },
  { key: "Chat", label: "Chat", icon: "chatbubble-outline" },
  { key: "Pay", label: "Pay", icon: "card-outline" },
  { key: "Profile", label: "Profile", icon: "person-outline" },
];

const BottomTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: typeTabs;
  setActiveTab: (tab: typeTabs) => void;
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={isActive ? "#4FC3F7" : "#94A3B8"}
            />

            <Text
              style={[
                styles.text,
                isActive && styles.activeText
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#020617",
    paddingVertical: 12,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#38BDF8",
    borderRadius: 16,
    marginHorizontal: 6,
    paddingVertical: 6,
  },

  text: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },

  activeText: {
    color: "#020617",
    fontWeight: "700",
  },
});