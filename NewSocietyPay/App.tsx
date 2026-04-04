// App.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "./src/screens/home/Onboarding";
import Home from "./src/screens/home/starter";
import { UserProvider } from "./src/screens/MEMBER/Schemas/userContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("onboardingDone");
      setShowOnboarding(value !== "true");
      setLoading(false);
    };

    checkOnboarding();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
      <UserProvider>
      {showOnboarding ?<Onboarding onDone={() => { AsyncStorage.setItem("onboardingDone", "true"); setShowOnboarding(false); }}  />
       : <Home />}
      </UserProvider>
  );

  
}
