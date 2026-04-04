import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import API from '../../../../../api/api';

const RaiseComplaint = ({back}: {back: () => void}) => {
  const [text, settext] = useState('');
  const [category, setcategory] = useState('');
  const [priority, setpriority] = useState('');

  const analyzeComplaint = async () => {
    console.log("the first text is",text);
    if (!text.trim()) return;
    try {
      const res = await API.post('/ml/ai/analyze-complaint', {
        complaint: text,
      });

      setcategory(res.data.category);
      setpriority(res.data.priority);
    } catch (err) {
      console.log('AI error', err);
    }
  };

  const submitComplaint = async () => {
    try {
      const res=await API.post('/ml/ai/submitcomplaint', {
        complaint:text
      });

      setcategory(res.data.category);
      setpriority(res.data.priority);
      Alert.alert('Complaint Submitted');

      settext('');
      setcategory('');
      setpriority('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={back}
        style={{
          position: 'absolute',
          top: 20,
          right: 10,
          backgroundColor: '#0f172a',
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 20,
          zIndex: 10,
        }}>
        <Text style={{color: 'white'}}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Raise Complaint</Text>

      <TextInput
        placeholder="Describe your issue..."
        value={text}
        onChangeText={val => {
          settext(val);
        }}
        onEndEditing={analyzeComplaint}
        style={styles.input}
        multiline
      />

      {category !== '' && (
        <View style={styles.aiBox}>
          <Text style={styles.aiTitle}>AI Prediction</Text>

          <View style={styles.tagRow}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>

            <View
              style={[
                styles.priorityTag,
                {
                  backgroundColor:
                    priority === 'high'
                      ? '#FEE2E2'
                      : priority === 'medium'
                      ? '#FEF3C7'
                      : '#DCFCE7',
                },
              ]}>
              <Text
                style={[
                  styles.priorityText,
                  {
                    color:
                      priority === 'high'
                        ? '#DC2626'
                        : priority === 'medium'
                        ? '#D97706'
                        : '#15803D',
                  },
                ]}>
                {priority}
              </Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={submitComplaint}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RaiseComplaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    minHeight: 120,
    fontSize: 15,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth:2,
    color:"#0F172A"
  },

  aiBox: {
    backgroundColor: '#fff',
    marginTop: 18,
    padding: 16,
    borderRadius: 14,
  },

  aiTitle: {
    fontWeight: '700',
    marginBottom: 10,
    color: '#0F172A',
  },

  tagRow: {
    flexDirection: 'row',
  },

  categoryTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 10,
  },

  categoryText: {
    color: '#1E40AF',
    fontWeight: '600',
  },

  priorityTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  priorityText: {
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#0F172A',
    marginTop: 25,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
