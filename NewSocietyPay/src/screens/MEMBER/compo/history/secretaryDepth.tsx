import react, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import API from '../../../../api/api';


const InDepthBill = ({billid, Goback}: {billid: any; Goback: () => void}) => {
  const [bill, setbill] = useState<any>(null);
  const [paid, setPaid] = useState([]);
  const [pending, setpending] = useState([]);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`/society/bills/indepth/${billid}`);
      setbill(res.data.basic);
      setPaid(res.data.paid);
      setpending(res.data.pending);
    } catch (err) {
      console.log('Error in detail view');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const sendNotification= async ()=>{
    try{
        await API.post("/society/notification/send",{
          title:"Payment Reminder",
          message:"Maintenance payment pending",
          type:"payment"
        })
        
    }
    catch(err){
      console.log("Error in sending Notification",err);
    }
  }

  const totalMembers = paid.length + pending.length;
  const paidCount = paid.length;
  const pendingCount = pending.length;
  const totalAmount = bill?.amount * totalMembers;
  const collectedAmount = paidCount * bill?.amount;
  const progress = totalMembers > 0 ? paidCount / totalMembers : 0;

  return (
    <View style={styles.container}>

      <FlatList
        data={paid}
        keyExtractor={(item: any) => item._id}
        ListHeaderComponent={
          <>
            {/* bill details */}
            <View style={styles.billCard}>
              <Text style={styles.title}>{bill?.reason}</Text>
              <Text style={styles.month}>
                {bill?.month} {bill?.year}
              </Text>
              <Text style={styles.amount}>₹{bill?.amount} per member</Text>

              <TouchableOpacity
                onPress={Goback}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 10,
                  backgroundColor: '#1E293B',
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  zIndex: 10,
                }}>
                <Text style={{color: '#fff'}}>Back</Text>
              </TouchableOpacity>
            </View>
            
            {/* collection */}
            <View style={styles.dashboard}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalMembers}</Text>
                <Text style={styles.statLabel}>Total Members</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{paidCount}</Text>
                <Text style={styles.statLabel}>Paid</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{pendingCount}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>

            <View style={styles.collectionBox}>
              <Text style={styles.collectionText}>
                ₹{collectedAmount} / ₹{totalAmount}
              </Text>

              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, {width: `${progress * 100}%`}]}
                />
              </View>
            </View>
          </>
        }
        renderItem={({item}: any) => (
          <View style={styles.memberCard}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberFlat}>
              {item.flat?.wing}-{item.flat?.number}
            </Text>
          </View>
        )}

        ListFooterComponent={
          <>
             <Text style={styles.sectionTitle}>Pending Members</Text>
             <Text style={styles.notifyTitle} onPress={sendNotification}>Notify</Text>
             
             {pending.map((item:any)=>(
                <View key={item._id} style={styles.memberCardPending}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberFlat}>
                  {item.flat?.wing}-{item.flat?.number}
                </Text>
              </View>
             ))}
          </>
        }
      />

    </View>
  );
};

export default InDepthBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  billCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B1B3B',
  },

  month: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  amount: {
    fontSize: 18,
    color: '#777',
    fontWeight: '600',
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
    color: '#777',
  },
  notifyTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 12,
    color: '#777',
  },

  memberCard: {
    backgroundColor: '#008000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberCardPending: {
    backgroundColor: '#A30000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },

  memberFlat: {
    color: '#FFF',
  },

  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  statBox: {
    backgroundColor: '#0F172A',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    elevation: 3,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFfF',
  },

  statLabel: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 4,
  },

  collectionBox: {
    marginVertical: 15,
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  collectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 10,
    backgroundColor: '#1E88E5',
  },
});
