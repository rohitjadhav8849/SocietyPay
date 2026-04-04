import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import LoginP from "./../auth/login";

const { width } = Dimensions.get("window");

type Props={
  onLogin:()=>void;
}

const GuestHome = ({onLogin}:Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const membersPaid = useRef(new Animated.Value(0)).current;
  const collection = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const [paidText, setPaidText] = React.useState(0);
  const [amountText, setAmountText] = React.useState(0);
   
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(membersPaid, {
        toValue: 87,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(collection, {
        toValue: 870000,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(progressAnim, {
        toValue: 72,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  
    membersPaid.addListener(({ value }) => setPaidText(Math.floor(value)));
    collection.addListener(({ value }) => setAmountText(Math.floor(value)));
  }, []);
  
  const Locked = ({ children }: any) => (
    <View style={{ position: "relative" }}>
      <View style={{ opacity: 0.4 }}>{children}</View>
  
      <View
        style={{
          position: "absolute",
          marginBottom:10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(15,23,42,0.6)",
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 28 }}>🔒</Text>
        <Text
          style={{
            marginTop: 8,
            color: "#F8FAFC",
            fontWeight: "700",
          }}
        >
          Login to unlock
        </Text>
      </View>
    </View>
  );
   


  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>SocietyPay</Text>
          <Text style={styles.subtitle}>
            Transparent. Organized. Smart society management.
          </Text>
        </View>

        {/* PAYMENT OVERVIEW */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Section title="Payment Overview">
            <View style={styles.progressBox}>
              <Text style={styles.bigText}>87 / 120 Members Paid</Text>
            <View style={styles.progressBarBg}>
                 <Animated.View
                   style={[
                   styles.progressBarFill,
                     {
                      width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                     }),
                    },
                   ]}
                    />
            </View>

           <Text style={styles.smallText}>
                ₹{(amountText / 100000).toFixed(1)}L collected this month
           </Text>

            </View>
          </Section>
        </Animated.View>

        {/* PAYMENT HISTORY */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
        
          <Section title="Recent Payments">
            {PAYMENTS.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listName}>{item.name}</Text>
                <Text style={styles.listAmount}>₹{item.amount}</Text>
              </View>
            ))}
          </Section>
        </Animated.View>

        {/* EVENTS */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
        
          <Section title="Upcoming Events">
            <View style={styles.grid}>
              {EVENTS.map((event, i) => (
                <Locked>
                <View key={i} style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  {event.payment && (
                    <Text style={styles.eventPay}>
                      Fee: ₹{event.payment}
                    </Text>
                  )}
                </View>
                </Locked>
              ))}
            </View>
          </Section>
        </Animated.View>

        {/* REMINDERS */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Section title="Smart Reminders">
            <View style={styles.reminderBox}>
              <Text style={styles.reminderText}>
                🔒 Sign in to enable reminders & notifications
              </Text>
              <Text style={styles.reminderSub}>
                Stay informed without missing deadlines.
              </Text>
            </View>
          </Section>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cta} onPress={onLogin}>
          <Text style={styles.ctaText}>
            SignUp / Login to Unlock All Features
          </Text>
        </TouchableOpacity>
      </View>

    

    </View>
  );
};

export default GuestHome;

const PAYMENTS = [
  { name: "A-101 • Rahul", amount: "3500" },
  { name: "B-204 • Sneha", amount: "3500" },
  { name: "C-303 • Amit", amount: "3500" },
];

const EVENTS = [
  { title: "Ganesh Puja", date: "12 Sept", payment: "500" },
  { title: "Fire Safety Drill", date: "18 Sept" },
  { title: "Cultural Night", date: "25 Sept", payment: "300" },
];

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);


const styles = StyleSheet.create({
  /* ===== ROOT ===== */
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  /* ===== HEADER ===== */
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    backgroundColor: "#0F172A",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 10,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  subtitle: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 15,
  },

  /* ===== SECTION ===== */
  section: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 14,
  },

  /* ===== PAYMENT OVERVIEW ===== */
  progressBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    elevation: 5,
  },

  progressBarBg: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginVertical: 12,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 10,
    backgroundColor: "#22C55E",
    borderRadius: 10,
  },

  bigText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
  },

  smallText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  /* ===== PAYMENT LIST ===== */
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  listName: {
    fontSize: 15,
    color: "#020617",
  },

  listAmount: {
    fontWeight: "700",
    color: "#0F172A",
  },

  /* ===== EVENTS GRID ===== */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  eventCard: {
    width: width / 2 - 28,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 4,
  },

  eventTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#020617",
  },

  eventDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 6,
  },

  eventPay: {
    marginTop: 10,
    color: "#EF4444",
    fontWeight: "600",
  },

  /* ===== REMINDER ===== */
  reminderBox: {
    backgroundColor: "#EEF2FF",
    padding: 18,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#6366F1",
  },

  reminderText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1E293B",
  },

  reminderSub: {
    marginTop: 6,
    color: "#475569",
    fontSize: 14,
  },

  /* ===== BOTTOM CTA ===== */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  cta: {
    backgroundColor: "#0F172A",
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 6,
  },

  ctaText: {
    color: "#F8FAFC",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
