import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { UserContext } from "../../Schemas/userContext";
import MemberHistory from "./memberHistory";
import SecretaryDepth from "../history/secretaryDepth";
import API from "../../../../api/api";


const SecretaryHistory = () => {
  const {user}=useContext(UserContext);
  const [bills,setBills]=useState([]);
  const [billid,setbillid]= useState("");
  
  const [mode,setMode]= useState<"Secdepth" | "secretary"|"member">("secretary");

  const fetch= async ()=>{
     try{
        const res= await API.get(`/society/bills/${user.societyid}`);
        setBills(res.data);
     }
     catch(err){
      console.log("Error in fetching the bills",err);
     }
  }

  useEffect(()=>{
    fetch();
  },[]);
  
  if(mode==="Secdepth"){
    return <SecretaryDepth billid={billid} Goback={()=>setMode('secretary')}/>
  }
  
  if(mode==="member"){
    return <MemberHistory Goback={()=>setMode("secretary")}/>
  }
  const renderBill = ({item}:{item:any})=>{
    
    return(
      <TouchableOpacity 
      style={styles.billCard}
      onPress={ ()=>{
        setMode("Secdepth"),
        setbillid(item._id)
      }}>

      <View style={styles.billTop}>
      <Text style={styles.billTitle}>
      {item.reason}
      </Text>
      
      <Text style={styles.billMonth}>
      {item.month} {item.year}
      </Text>
      </View>
      
      <View style={styles.divider}/>
      
      <Text style={styles.billAmount}>
      ₹{item.amount} per member
      </Text>
      
      </TouchableOpacity>
    )
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Society Payments</Text>
        <Text style={styles.subtitle}>Secretary View</Text>
        <TouchableOpacity
                onPress={()=>setMode("member")}
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
                <Text style={{color: '#fff'}}>My Payments</Text>
              </TouchableOpacity>
      </View>
      
      <FlatList
         data={bills}
         keyExtractor={(item)=>item._id}
         renderItem={renderBill}
         contentContainerStyle={{padding:20}}
      />

    </View>
  );
};

export default SecretaryHistory;


/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
  },

  header: {
    paddingVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  
  billCard:{
    backgroundColor:"#ffffff",
    borderRadius:10,
    padding:15,
    marginBottom:15,
    borderWidth:1,
    borderColor:"#ececec",
    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.08,
    shadowRadius:6,
    elevation:3
    },
    
    billTop:{
    marginBottom:10
    },
    
    billTitle:{
    fontSize:20,
    fontWeight:"700",
    color:"#0B1B3B",
    letterSpacing:0.3
    },
    
    billMonth:{
    fontSize:14,
    color:"#6b6b6b",
    },
    
    divider:{
    height:1,
    backgroundColor:"#f0f0f0",
    marginVertical:12
    },
    
    billAmount:{
    fontSize:17,
    fontWeight:"600",
    color:"#1b1b1b"
    }

  

  

  


 
  

 
});
