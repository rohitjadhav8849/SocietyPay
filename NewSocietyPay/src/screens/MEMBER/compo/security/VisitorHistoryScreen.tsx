import react, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import API from '../../../../api/api';

const VisitorHistorySccreen = ({Detail}:{Detail:(id:any)=>void}) => {
  
  const [visitors, setVisitors] = useState([]);
  const AllVisitors = async () => {
    try {
      const res = await API.get('/ml/ai/security/getvisitors');
      setVisitors(res.data);
    } catch (err) {
      console.log('Error in getting all visitors data');
    }
  };
  
  useEffect(() => {
    AllVisitors();
  }, []);

  const handleExit = async (id: any) => {
    try{
        await API.get(`/ml/ai/security/updateexit/${id}`);
    }
    catch(err){
      console.log("Error in exiting visitor")
    }
  }
 

  return (
    <View style={styles.container}>
      
    <Text style={{color:"#0B1B34",fontSize:18,fontWeight:"600",marginBottom:20}}>VISITOR HISTORY</Text>
      <FlatList
        data={visitors}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={()=>Detail(item._id)}>
            <View style={styles.row}>
              <View>
                <Text style={styles.name}> {item.name}</Text>

                <Text style={styles.flat}>Flat : {item?.flat?.wing}-{item?.flat?.number}</Text>

                <Text style={styles.time}>
                  Entry : {new Date(item.entryTime).toLocaleTimeString()}
                </Text>
              </View>

              <View style={styles.right}>
                <Text
                  style={[
                    styles.status,
                    item.exitTime ? styles.exited : styles.inside,
                  ]}>
                  {item.exitTime ? 'Exited' : 'Inside'}
                </Text>

                {!item.exitTime && (
                  <TouchableOpacity
                    style={styles.exitBtn}
                    onPress={()=>handleExit(item._id)}
                  >
                    <Text style={styles.exitText}>Exit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VisitorHistorySccreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: '#0B1B34',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  flat: {
    color: '#94A3B8',
    marginTop: 4,
  },

  time: {
    color: '#94A3B8',
    marginTop: 2,
  },

  right: {
    alignItems: 'flex-end',
  },

  status: {
    fontWeight: '600',
    marginBottom: 8,
  },

  inside: {
    color: '#38BDF8',
  },

  exited: {
    color: '#22C55E',
  },

  exitBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  exitText: {
    color: '#fff',
    fontWeight: '600',
  },
});
