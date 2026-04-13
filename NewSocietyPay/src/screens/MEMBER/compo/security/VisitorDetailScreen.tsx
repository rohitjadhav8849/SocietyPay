import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import API from '../../../../api/api';

const VisitorDetail = ({visitorid,Goback}: {visitorid: String,Goback:()=>void}) => {
  const [visitors, setVisitors] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);

  const fetchvisitorDetails = async () => {
    try {

      const res = await API.get(`/ml/ai/security/visitor/${visitorid}`);
      setVisitors(res.data);

      if (res.data?.phone) {
        const history = await API.get(
          `/ml/ai/security/getvisitorhistory/${res.data.phone}`,
        );
        setHistory(history.data); //3164546499
      }
    } catch (err) {
      console.log('Error in fetching visitors details');
    }
  };

  useEffect(() => {
    fetchvisitorDetails();
  }, []);

  const handleExit = async (id: any) => {
    try {
      await API.get(`/ml/ai/security/updateexit/${id}`);
    } catch (err) {
      console.log('Error in exiting visitor');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Visitor Details</Text>
      <TouchableOpacity 
           onPress={Goback}
           style={{
           position: "absolute",
           right: 5,
           backgroundColor: "#0B1B34", 
           paddingVertical: 8,
           paddingHorizontal: 15,
           borderRadius: 20,
           zIndex: 10}}
          ><Text  style={{color:"#fff"}}>Back</Text>
        </TouchableOpacity>

      {/* Visitor Info */}

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{visitors.name}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{visitors.phone}</Text>

        <Text style={styles.label}>Flat</Text>
        <Text style={styles.value}>
          {visitors.flat?.wing}-{visitors.flat?.number}
        </Text>

        <Text style={styles.label}>Purpose</Text>
        <Text style={styles.value}>{visitors.purpose}</Text>

        <Text style={styles.label}>Entry Time</Text>
        <Text style={styles.value}>
          {new Date(visitors.entryTime).toLocaleString()}
        </Text>

        {visitors.exitTime && (
          <>
            <Text style={styles.label}>Exit Time</Text>
            <Text style={styles.value}>
              {new Date(visitors.exitTime).toLocaleString()}
            </Text>
          </>
        )}
      </View>

      {/* AI Risk Detection */}

      <View style={styles.riskCard}>
        <Text style={styles.riskTitle}>AI Risk Detection</Text>

        <Text
          style={[
            styles.riskText,
            visitors.anomalyRisk === 'anomaly' ? styles.danger : styles.safe,
          ]}>
          {visitors.anomalyRisk === 'anomaly'
            ? '🔴 Anomaly Behaviour Detected'
            : '🟢 Normal Behaviour'}
        </Text>
      </View>

      {/* Visit History */}

      <Text style={styles.historyTitle}>Visit History</Text>
      <View style={styles.setbottom}>
      {history.map((item: any, index: number) => {
        const duration = item.exitTime
          ? Math.floor(
              (new Date(item.exitTime).getTime() -
                new Date(item.entryTime).getTime()) /
                60000,
            )
          : 'Inside';

        return (
          <View key={index} style={styles.historyCard}>
            <Text style={styles.historyFlat}>
              Flat {item.flat?.wing}-{item.flat?.number}
            </Text>

            <Text style={styles.historyText}>Purpose : {item.purpose}</Text>

            <Text style={styles.historyText}>
              Entry : {new Date(item.entryTime).toLocaleTimeString()}
            </Text>

            <Text style={styles.historyText}>
              Exit :{' '}
              {item.exitTime
                ? new Date(item.exitTime).toLocaleTimeString()
                : 'Still Inside'}
            </Text>

            <Text style={styles.historyText}>Duration : {duration} min</Text>
          </View>
        );
      })}
      </View>
      

      {/* Exit Button */}

      {!visitors.exitTime && (
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => handleExit(visitorid)}>
          <Text style={styles.exitText}>Exit Visitor</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default VisitorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B1B34',
  },

  card: {
    backgroundColor: '#0B1B34',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  label: {
    color: '#94A3B8',
    marginTop: 10,
  },

  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  riskCard: {
    backgroundColor: '#0B1B34',
    padding: 20,
    borderRadius: 18,
    // marginBottom: 20,
  },

  riskTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },

  riskText: {
    fontSize: 18,
    fontWeight: '600',
  },

  safe: {
    color: '#22C55E',
  },

  danger: {
    color: '#EF4444',
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#0B1B34',
  },

  historyCard: {
    backgroundColor: '#0B1B34',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  historyFlat: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '600',
  },

  historyText: {
    color: '#fff',
    marginTop: 3,
  },

  exitButton: {
    backgroundColor: '#38BDF8',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  setbottom:{
   marginBottom: 20
  },

  exitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
