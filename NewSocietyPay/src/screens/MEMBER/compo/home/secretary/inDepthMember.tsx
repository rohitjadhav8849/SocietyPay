import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import API from '../../../../../api/api';
import {UserContext} from '../../../Schemas/userContext';

const InDepthDetails = ({
  clicked,
  goBack,
}: {
  goBack: () => void;
  clicked: string | null;
}) => {
  const [member, setmember] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [risklabel, setrisklabel] = useState<any>(null);
  const [latePayments, setLatePayments] = useState<any>(null);
  const [missedPayments, setmissedPayments] = useState<any>(null);

  const getspecificMember = async () => {
    try {
      const resp = await API.get(`/society/member/${clicked}`);
      setmember(resp.data);
      setDocuments(resp.data.documents);
    } catch (err) {
      console.log('specific member getting error:', err);
    }
  };
  useEffect(() => {
    getspecificMember();
  }, []);

  const approveDocument = async (documentId: string) => {
    try {
      const response = await API.patch('/society/documents/verify', {
        userid: clicked,
        documentid: documentId,
      });
      setDocuments(response.data.documents);
    } catch (err) {
      console.log('verify error', err);
    }
  };

  const viewDocument = (doc: any) => {
    if (doc.type === 'selfie') {
      Alert.alert('Selfie', 'Open image below');
    } else if (doc.type === 'aadhaar') {
      Alert.alert('Aadhaar Number', `XXXX XXXX ${doc.uri.slice(-4)}`);
    } else if (doc.type === 'bill') {
      Alert.alert('Electricity Bill No', doc.uri);
    }
  };

  //  AI risk prediction
  const predict = async () => {
    try {
      const resp = await API.get(`/ml/ai/predict/${clicked}`);
      console.log(resp.data);
      setrisklabel(resp.data.risk);
      setLatePayments(resp.data.late_payments);
      setmissedPayments(resp.data.missed_payments);
    } catch (err) {
      console.log('error in getting prediction');
    }
  };
  useState(() => {
    predict();
  });

  return (

    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={{
          position: 'absolute',
          top: 20,
          right: 10,
          backgroundColor: '#FFF',
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 20,
          zIndex: 10,
        }}>
        <Text style={{color: 'black'}}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Member Details</Text>

      <Text style={styles.info}>Name: {member?.name}</Text>
      <Text style={styles.info}>
        Flat: {member?.flat?.wing}-{member?.flat?.number}
      </Text>
      <Text style={styles.info}>Mobile: {member?.mobile}</Text>

      <View style={styles.riskCard}>
        <Text style={styles.riskTitle}>AI Payment Risk</Text>

        <View style={styles.metricContainer}>
          <View style={[styles.metricBox,, {backgroundColor:risklabel===1?"#D10000" :"#00A300"}]}>
            <Text style={styles.metricValue}>{risklabel}</Text>
            <Text style={styles.metricLabell}>Risk</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{latePayments}</Text>
            <Text style={styles.metricLabel}>Late</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{missedPayments}</Text>
            <Text style={styles.metricLabel}>Missed</Text>
          </View>
        </View>
      </View>

      <Text style={styles.docTitle}>Documents</Text>

      <FlatList
        data={documents}
        keyExtractor={item => item._id.toString()}
        initialNumToRender={10}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.docType}>{item.type.toUpperCase()}</Text>

            <Text style={styles.status}>
              Status: {item.verified ? 'Verified ✔' : 'Pending'}
            </Text>

            {item.type === 'selfie' && (
              <Image source={{uri: item.uri}} style={styles.image} />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => viewDocument(item)}>
                <Text style={styles.btnText}>View</Text>
              </TouchableOpacity>

              {!item.verified && (
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => approveDocument(item._id)}>
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default InDepthDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F172A',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },

  info: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },

  docTitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  docType: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  status: {
    color: '#94A3B8',
    marginVertical: 5,
  },

  image: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewBtn: {
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 6,
  },

  approveBtn: {
    backgroundColor: '#22C55E',
    padding: 8,
    borderRadius: 6,
  },

  btnText: {
    color: 'white',
  },

 riskCard:{
  backgroundColor:"#fff",
  borderRadius:18,
  padding:18,
  marginTop:20,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:6,
  elevation:4
},

riskTitle:{
  fontSize:16,
  fontWeight:"700",
  color:"#1F2937",
  marginBottom:14
},

metricContainer:{
  flexDirection:"row",
  justifyContent:"space-between"
},

metricBox:{
  backgroundColor:"#F4F6FA",
  borderRadius:12,
  paddingVertical:12,
  paddingHorizontal:18,
  alignItems:"center",
  flex:1,
  marginHorizontal:4
},

metricValue:{
  fontSize:20,
  fontWeight:"700",
  color:"#0B1B3B"
},

metricLabel:{
  fontSize:12,
  color:"#1A0000",
  marginTop:3
},
metricLabell:{
  fontSize:12,
  color:"#FFF",
  marginTop:3
}
});
