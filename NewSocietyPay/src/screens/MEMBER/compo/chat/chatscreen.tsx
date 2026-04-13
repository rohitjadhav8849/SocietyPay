import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import {io} from 'socket.io-client';
import MessageBubble from './messagebubble';
import {UserContext} from '../../Schemas/userContext';
import API from '../../../../api/api';
const socket = io('http://10.55.126.89:5000/api');

const ChatScreen = ({Goback}: {Goback: () => void}) => {
  const {user} = useContext(UserContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (user?.societyid) {
      socket.emit('joinSociety', user.societyid);
    }
  }, []);

  const fetchmessages = async () => {
    try {
      const res = await API.get('/society/chat');
      setMessages(
        res.data.map((msg: any) => ({
          ...msg,
          isMe: msg.sender?._id === user?._id,
        })),
      );
    } catch (err) {
      console.log('Error fetching messages:', err);
    }
  };
  useEffect(() => {
    fetchmessages();
  }, []);

  const sendMessage = async () => {
    console.log('sending message');
    if (!text.trim()) return;
    try {
      const res = await API.post('/society/chat', {message: text});
      setMessages(prev => [
        ...prev,
        {
          ...res.data,
          isMe: true,
        },
      ]);
      setText('');
    } catch (err) {
      console.log('Error in sending message', err);
    }
  }; //after this
  //->send message API in backend controller
  //it sends data to server.js
  //from there we use useEffect below
  useEffect(() => {
    socket.on('receiveMessage', msg => {
      setMessages(prev => [
        ...prev,
        {
          ...msg,
          isMe: msg.sender._id === user._id,
        },
      ]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Society Chat</Text>
        <Text style={styles.headerSub}>120 Members</Text>
      </View>

      {/* ===== CHAT LIST ===== */}
      <FlatList
        data={messages}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) => <MessageBubble message={item} />}
        contentContainerStyle={{paddingVertical: 10}}
      />

      {/* ===== INPUT ===== */}
      <View style={styles.inputBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#020617",
  },

  header: {
    marginTop: 2,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderColor: '#1E293B',
  },

  headerTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },

  headerSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#020617',
  },

  input: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#F8FAFC',
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  sendText: {
    color: '#F8FAFC',
    fontWeight: '600',
  },
});
