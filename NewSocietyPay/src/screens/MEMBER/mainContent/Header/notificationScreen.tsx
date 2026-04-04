import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import API from '../../../../api/api';
import {io} from 'socket.io-client';
const socket = io('http://10.55.126.89:5000/api');
import {UserContext} from '../../Schemas/userContext';

const NotificationScreen = ({Goback}: {Goback: () => void}) => {
  const [notifications, setNotification] = useState<any>([]);
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user?.societyid) {
      socket.emit('joinSociety', user.societyid);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/society/notification/my');
      setNotification(res.data);
    } catch (err) {
      console.log('Error in fetching Notification', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // useEffect(() => {
  //   socket.on('newNotification', (data) => {
  //     setNotification((prev:any)=>[
  //       {
  //         title:data.title,
  //         message:data.message,
  //         read:false
  //       },
  //       ...prev
  //     ])
  //   })

  //   return ()=>socket.off("newNotification")

  // },[]);

  const markread = async (id: any) => {
    try {
      await API.patch(`/society/notification/read/${id}`);
    } catch (err) {
      console.log('Error in marking read', err);
    }
  };

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item: any) => item._id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.tittle}>Notifications</Text>
          <Text style={styles.subtitle}>Smart to know early</Text>

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
            <Text style={{color: '#fff'}}>Home</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({item}) => (
        <View style={[styles.card, !item.read && {backgroundColor: '#E8F0FE'}]}>
          <TouchableOpacity onPress={() => markread(item._id)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  tittle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  message: {
    marginTop: 4,
    color: '#555',
  },
  header: {
    paddingVertical: 16,
    marginLeft:15,
  },

  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
});
