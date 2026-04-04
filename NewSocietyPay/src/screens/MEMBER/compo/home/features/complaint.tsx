import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import API from '../../../../../api/api';

const ComplaintShow = ({go, back}: {go: () => void; back: () => void}) => {
  const [complaints, setComplaints] = useState<any[]>([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get('/ml/ai/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.log('Error in fetching complaints');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <FlatList
      data={complaints}
      keyExtractor={item => item._id}
      contentContainerStyle={{padding: 16}}
      ListHeaderComponent={
        <>
          <TouchableOpacity
            onPress={() => back()}
            style={{
              position: 'static',
              top: 5,
              width: 70,
              backgroundColor: '#0f172a',
              paddingVertical: 8,
              paddingHorizontal: 15,
              marginBottom: 15,
              borderRadius: 20,
              zIndex: 10,
            }}>
            <Text style={{color: '#FFF'}}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => go()}
            style={{
              position: 'absolute',
              top: 5,
              right: 0,
              width: 140,
              backgroundColor: '#0f172a',
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 20,
              zIndex: 10,
            }}>
            <Text style={{color: '#FFF'}}>Raise an issue</Text>
          </TouchableOpacity>
        </>
      }
      renderItem={({item}) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}>{item.user?.name}</Text>

            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.text}>{item.text}</Text>

          <View style={styles.tagRow}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            <View
              style={[
                styles.priorityTag,
                {
                  backgroundColor:
                    item.priority === 'high'
                      ? '#FEE2E2'
                      : item.priority === 'medium'
                      ? '#FEF3C7'
                      : '#DCFCE7',
                },
              ]}>
              <Text
                style={[
                  styles.priorityText,
                  {
                    color:
                      item.priority === 'high'
                        ? '#DC2626'
                        : item.priority === 'medium'
                        ? '#D97706'
                        : '#15803D',
                  },
                ]}>
                {item.priority}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default ComplaintShow;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  name: {
    fontWeight: '700',
    fontSize: 14,
    color: '#0F172A',
  },

  time: {
    fontSize: 12,
    color: '#6B7280',
  },

  text: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 20,
  },

  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },

  categoryText: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '600',
  },

  priorityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
