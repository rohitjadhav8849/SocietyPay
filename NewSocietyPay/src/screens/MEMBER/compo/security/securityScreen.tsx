import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import {LineChart} from 'react-native-chart-kit';
import API from '../../../../api/api';

const screenWidth = Dimensions.get('window').width;

const SecurityHome = ({register}: {register: () => void}) => {
  const [weeklyVisitors, setweeklyvisitors] = useState<any>([]);
  const [todayVisitors, settodaysVisitor] = useState<any>(0);
  const [insideVisitors, setInsideVisitors] = useState<any>(0);

  const [visitorsInside, setVisitorsInside] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch risk/total visitors
        const resp = await API.get('/ml/ai/security/detect-visitor-risk');
        setInsideVisitors(resp.data.total);
        settodaysVisitor(resp.data.today);

        // 2. Fetch inside visitors
        const res = await API.get('/ml/ai/security/insidevisitors');
        setVisitorsInside(res.data);

        const weekCount = await API.get('/ml/ai/security/visitorstats');
        const raw = Array.isArray(weekCount.data) ? weekCount.data : [];

        // Backend already sends [day-6, day-5, ..., today] in order
        const orderedData = raw.map(v => (isFinite(Number(v)) ? Number(v) : 0));
        
        

        setweeklyvisitors(orderedData);
        
        console.log('Fetched data:', orderedData);

        if (weeklyVisitors.every((v:any) => v === 0)) {
          return <Text>No visitor data this week</Text>;
        }
        console.log('Data refreshed successfully');
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 600000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Add Visitor */}

      <TouchableOpacity style={styles.addButton} onPress={register}>
        <Text style={styles.addText}>+ Add Visitor</Text>
      </TouchableOpacity>

      <View style={styles.insideCard}>
        <Text style={styles.cardTitle}>Visitors Inside</Text>

        {visitorsInside.map((v: any) => {
          const entry = new Date(v.entryTime).toLocaleTimeString();

          return (
            <View key={v._id} style={styles.row}>
              <Text style={styles.name}>{v.name}</Text>

              <Text style={styles.time}>{entry}</Text>

              <Text
                style={[
                  styles.behaviour,
                  v.behaviour === 'anomaly' ? styles.danger : styles.safe,
                ]}>
                {v.behavior === 'anomaly' ? '⚠ Suspicious' : 'Normal'}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Graph */}

      <View style={styles.graphCard}>
        <Text style={styles.cardTitle}>Visitors This Week</Text>

        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{data: [0,1,2,0,1,5 ,1]}],
          }}
          width={screenWidth - 60}
          height={180}
          yAxisLabel="Visitors:"
          chartConfig={{
            backgroundGradientFrom: '#0B1B34',
            backgroundGradientTo: '#0B1B34',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(56,189,248,${opacity})`,
            labelColor: () => '#fff',
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#38BDF8',
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      {/* Stats */}

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayVisitors}</Text>
          <Text style={styles.statLabel}>Today's Visitors</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{insideVisitors}</Text>
          <Text style={styles.statLabel}>Inside Society</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SecurityHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  addButton: {
    backgroundColor: '#38BDF8',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
  },

  addText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  graphCard: {
    backgroundColor: '#0B1B34',
    padding: 18,
    borderRadius: 20,
    marginBottom: 25,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  statCard: {
    backgroundColor: '#0B1B34',
    width: '48%',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 30,
    color: '#38BDF8',
    fontWeight: 'bold',
  },

  statLabel: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  insideCard: {
    backgroundColor: '#0B1B34',
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  name: {
    color: '#fff',
    fontWeight: '600',
  },

  time: {
    color: '#94A3B8',
  },

  behaviour: {
    fontWeight: '600',
  },

  safe: {
    color: '#22C55E',
  },

  danger: {
    color: '#EF4444',
  },
});
