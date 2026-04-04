// src/screens/Onboarding.tsx
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to SocietyPay",
    subtitle: "Smart payments for smart societies",
  },
  {
    id: "2",
    title: "Easy Payments",
    subtitle: "Pay maintenance & dues effortlessly",
  },
  {
    id: "3",
    title: "Stay Updated",
    subtitle: "Events, notices & reminders in one place",
  },
];

const Onboarding = ({ onDone }: { onDone: () => void }) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onDone();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={goNext}>
        <Text style={styles.btnText}>
          {currentIndex === slides.length - 1 ? "Done" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38BDF8",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
  },
  btn: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#38BDF8",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },
});
