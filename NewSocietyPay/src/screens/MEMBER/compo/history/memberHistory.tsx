import React, { useState,useEffect,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import API from "../../../../api/api";
import { UserContext } from "../../Schemas/userContext";

const MemberHistory = ({Goback}:{Goback:()=>void}) => {
  const {user} =useContext(UserContext);
  const [pay,setPay]=useState([]);
   const Fetchpayments=async ()=>{
      try{
           const res=await API.get(`/society/history/member/${user._id}`)
           setPay(res.data);
      }
      catch(err){
        console.log("error in member history");
      }
   }

   useEffect(()=>{
    Fetchpayments();
   })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Payments</Text>
        <Text style={styles.subtitle}>Your society transactions</Text>
        {user.role==="secretary" && (
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
           <Text style={{color: '#fff'}}>Society Details</Text>
        </TouchableOpacity>
        )}
      </View>

    

      <FlatList
        data={pay}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.memberName}>
              {item.bill.toUpperCase()}
            </Text>

            <Text style={styles.amount}>₹{item.amount}</Text>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
              <Text
                style={
                  item.status === "paid"
                    ? styles.statusPaid
                    : styles.statusUnpaid
                }
              >
                {item.status.toUpperCase()}
              </Text>

              <Text style={styles.footerText}>{item.deadline.toString().slice(0,10)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MemberHistory;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
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

  filters: {
    flexDirection: "row",
    marginVertical: 12,
  },

  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },

  filterActive: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0F172A",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  memberName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  flatNo: {
    fontSize: 13,
    color: "#64748B",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusPaid: {
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 13,
  },

  statusUnpaid: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 13,
  },

  footerText: {
    fontSize: 12,
    color: "#64748B",
  },
});
