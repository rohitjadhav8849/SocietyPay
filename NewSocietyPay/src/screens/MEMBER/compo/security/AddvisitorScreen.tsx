import react, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,

} from 'react-native';

import API from '../../../../api/api';

const AddVisitor = ({Goback}:{Goback:()=>void}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wingvisited, setwingVisited] = useState('');
  const [flatno, setFlatNo] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleAddVisitor = async () => {
    try {
      await API.post('/ml/ai/security/add', {
        name,
        phone,
        flat: {wing:wingvisited, number:flatno},
        purpose,
      });
      setFlatNo("");
      setName("");
      setPhone("");
      setPurpose("");
      setwingVisited("");
       Alert.alert("Visitor added successfully")
    } catch (err) {
      console.log('Error in adding visitors');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Visitor</Text>
      <TouchableOpacity 
           onPress={Goback}
           style={{
           position: "absolute",
           right: 5,
           backgroundColor: "#1E293B", 
           paddingVertical: 8,
           paddingHorizontal: 15,
           borderRadius: 20,
           zIndex: 10}}
          ><Text  style={{color:"#fff"}}>Back</Text>
        </TouchableOpacity>

      {/* Name */}

      <Text style={styles.label}>Visitor Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter visitor name"
        value={name}
        onChangeText={setName}
      />

      {/* Phone */}

      <Text style={styles.label}>Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Flat */}

      <Text style={styles.label}>Flat Visiting</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: A-203"
        value={wingvisited}
        onChangeText={setwingVisited}
      />

      <TextInput
        style={styles.input}
        placeholder="Ex:203"
        keyboardType='number-pad'
        value={flatno}
        onChangeText={setFlatNo}
      />

      {/* Purpose */}

      <Text style={styles.label}>Purpose</Text>

      <TextInput
        style={styles.input}
        placeholder="Delivery / Guest / Maintenance"
        value={purpose}
        onChangeText={setPurpose}
      />

      {/* Submit */}

      <TouchableOpacity style={styles.button} onPress={handleAddVisitor}>
        <Text style={styles.buttonText}>Entry Visitor</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default AddVisitor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0B1B34',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color:"#555"
  },

  button: {
    backgroundColor: '#38BDF8',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
