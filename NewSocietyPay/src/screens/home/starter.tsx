import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import {UserContext} from '../MEMBER/Schemas/userContext.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuestHome from './guesthome';
import Login from './../auth/login';
import RegisterScreen from '../auth/registration.tsx';
import Mainlayout from './../MEMBER/navigation/mainlayout.tsx';

const Home = () => {
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const [mode, setMode] = useState<
    'guest' | 'login' | 'register' | 'member' | 'landing'
  >('landing');

  //one problem that i got that token is going through prop drilling 5 levels
  // so insure that it is present or not because settoken will get active without it
  const checkLogin = async () => {
    try {
      const userdata = await AsyncStorage.getItem('user');
      if (userdata) {
        const parseduser = JSON.parse(userdata);
        setUser(parseduser);
        setMode(parseduser.role);
      }
    } catch (err) {
      console.log('auto login err:', err);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

    setUser(null);
    setMode('guest');
  };

  if (mode === 'register') {
    return <RegisterScreen doneregister={() => setMode('login')} />;
  }

  if (mode === 'login') {
    return (
      <Login
        onSuccess={role => {
          console.log('logged in as', role);
          setMode('member');
        }}
        onBack={() => setMode('member')}
        register={() => setMode('register')}
      />
    );
  }

  if (mode === 'member' && user) {
    // {console.log(user)}
    return <Mainlayout user={user} onLogout={onLogout} />;
  }

  if (mode === 'guest') {
    return <GuestHome onLogin={() => setMode('login')} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      <View style={styles.hero}>
        <Text style={styles.brand}>SocietyPay</Text>
        <Text style={styles.heroText}>Smart payments, smarter societies.</Text>
      </View>

      <View style={styles.cards}>
        <Card
          title="💳 Easy Payments"
          desc="Pay maintenance & dues instantly."
        />
        <Card title="📢 Society Updates" desc="Events, notices & alerts." />
        <Card title="🔐 Secure System" desc="Bank-grade protection." />
        <Card title="💬 Community Chat" desc="Connect with members." />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setMode('guest')}>
          <Text style={styles.primaryText}>Explore as Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => setMode('login')}>
          <Text style={styles.secondaryText}>Login / Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const Card = ({title, desc}: {title: string; desc: string}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{desc}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F172A'},
  hero: {paddingTop: 90, paddingHorizontal: 24, paddingBottom: 40},
  brand: {fontSize: 42, fontWeight: '800', color: '#38BDF8'},
  heroText: {marginTop: 16, fontSize: 20, color: '#E5E7EB'},

  cards: {paddingHorizontal: 24, gap: 18},
  card: {backgroundColor: '#1E293B', padding: 20, borderRadius: 16},
  cardTitle: {fontSize: 18, fontWeight: '600', color: '#F8FAFC'},
  cardDesc: {marginTop: 8, fontSize: 15, color: '#CBD5E1'},

  actions: {padding: 24, gap: 16},
  primaryBtn: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryText: {color: '#020617', fontWeight: '700'},
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryText: {color: '#38BDF8', fontWeight: '600'},
});
