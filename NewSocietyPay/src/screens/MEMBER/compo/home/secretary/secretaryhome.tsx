import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import API from '../../../../../api/api';
import {BarChart} from 'react-native-chart-kit';

const SecretaryHome = ({memberDetails}: {memberDetails: () => void}) => {
  const [dashboard, setdashboard] = useState<any>(null);
  const getDashboard = async () => {
    try {
      const res = await API.get('/society/dashboard');
      console.log(res.data);
      setdashboard(res.data);
    } catch (err) {
      console.log('Error in getting Dashboard');
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <View style={styles.container}>
      {/* SECTION TITLE */}
      <Text style={styles.sectiontitle}>Secretary Control</Text>

      {/* QUICK ACTIONS */}
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => memberDetails()}
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 12,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black'}}> See Members</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dashboard</Text>

        {/* DASHBOARD STATS */}

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.value}>{dashboard?.bills}</Text>
            <Text style={styles.label}>Total Bills</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.value}>{dashboard?.complaints}</Text>
            <Text style={styles.label}>Complaints</Text>
          </View>
        </View>

        {/* COLLECTION GRAPH */}

        <Text style={styles.chartTitle}>Collection Overview</Text>

        <BarChart
          data={{
            labels: ['Collected', 'Pending'],
            datasets: [
              {
                data: [dashboard?.totalcollection || 0, dashboard?.pendingCollection || 0],
              },
            ],
          }}
          width={290}
          height={180}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#0B173B',
            backgroundGradientTo: '#0B173B',
            decimalPlaces: 0,
            
            color: (opacity = 1) => `rgba(0,200,255,${opacity})`,
            labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
            backgroundColor:"#FFF"
          }}
        />
      </View>
    </View>
  );
};

export default SecretaryHome;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  sectiontitle: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  card: {
    backgroundColor: '#111827', // dark card
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1F2933',
  },

  sectionTitle:{
    fontSize:20,
    color:"#fff",
    marginBottom:15,
    fontWeight:"600"
    },

  memberBtn: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  memberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  smallCard: {
    width: '48%',
    backgroundColor: '#0f1f3f',
    padding: 16,
    borderRadius: 12,
  },

  value: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },

  label: {
    color: '#aaa',
    marginTop: 5,
  },

  chartTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});
