import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from "react-native";

import API from "../../../../../api/api";

const AddPaymentScreen = ({onDone}:{onDone:()=>void}) => {

  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [month,setMonth]=useState("");
  const [year,setYear]= useState("");
  const [deadline,setDeadline]=useState("");

  const CreateBill =async () => {
     try{
         const res= await API.post("/society/bill/create",{
           reason,
           amount:Number(amount),
           month,
           year:Number(year),
           deadline
         })
         setReason("");
         setAmount("")
         setMonth("")
         setYear("")
         setDeadline("")
         console.log(res.data);
     }
     catch(err){
      console.log("Error while creating bill",err);
     }
  };

  const sendNotification = async()=>{
    try{
        await API.post("/society/notification/send",{
          title:"New Payment",
          message:`${reason} bill created`,
          type:"payment"
        })
    }
    catch(err){
      console.log("error in new payment notification",err);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.heading}>Add New Payment</Text>

      <TextInput
        placeholder="Payment Title"
        style={styles.input}
        value={reason}
        onChangeText={setReason}
      />
      
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Month"
        style={styles.input}
        value={month}
        onChangeText={setMonth}
      />

      <TextInput
        placeholder="Year"
        style={styles.input}
        value={year}
        onChangeText={setYear}
      />

      <TextInput
        placeholder="Due Date (YYYY-MM-DD)"
        style={styles.input}
        value={deadline}
        onChangeText={setDeadline}
      />
      

      <TouchableOpacity style={styles.saveBtn} onPress={()=>{
        CreateBill(),
        sendNotification()
      }}>
        <Text style={styles.saveText}>Save Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={onDone}>
        <Text style={styles.saveText}>Go back</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddPaymentScreen;

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0F172A",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  typeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  activeType: {
    backgroundColor: "#38BDF8",
  },
  typeText: {
    color: "#F8FAFC",
    fontWeight: "600",
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#022C22",
    fontWeight: "700",
  },
});
