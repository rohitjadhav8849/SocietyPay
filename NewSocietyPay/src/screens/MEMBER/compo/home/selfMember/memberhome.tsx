import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import ChatPreviewCard from "../chatPreviewCard";
import API from "../../../../../api/api";



const QuickBtn = ({ text ,btn }: any) => (
  <TouchableOpacity style={styles.quickBtn} onPress={btn}>
    <Text style={styles.quickText}>{text}</Text>
  </TouchableOpacity>
);

const Billsbtn =({text}:any)=>( 
    <TouchableOpacity style={styles.billsbtn}>
      <Text style={styles.billsText}>{text}</Text>
    </TouchableOpacity>
)


const Memberhome = ({Gochat,GoPay,Goissue}:{
  Gochat:()=>void,
  GoPay:()=>void
  Goissue:()=>void
  }) => {
  
  const [pinchat,setpinchat]=useState<any>(null);
  const [time,settime]=useState<any>(null)

  const fetchPinMessage=async ()=>{
    try{
       const Pinchat= await API.get("/society/getPinchat");
       setpinchat(Pinchat.data.message);
       settime(Pinchat.data.createdAt.toString().slice(0,10));
    }
    catch(err){
        console.log("Error in getting the pinned message");
    } 
  }

  useEffect(()=>{
     fetchPinMessage();
  },[])

  return (
        <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
  
       {pinchat && (
          <View style={styles.pinned}>
          <Text style={styles.pinnedTitle}>📌 Important Notice</Text>
          <Text style={styles.pinnedText}>
             {pinchat}
          </Text>
          <Text style={styles.pinnedTime}>
           {time}
            </Text>
         </View>
        )}
      
        <ChatPreviewCard
            sender="Secretary • Green Heights"
            time="10 mins ago"
            message="Maintenance for September is due by 10th. Please complete payment to avoid late fees."
               onPress={ Gochat}
        />
  
        {/* ===== SUMMARY CARDS ===== */}
        <View style={styles.row}>
          <StatCard title="Paid" value="87" sub="of 120" />
          <StatCard title="Pending" value="33" sub="members" />
        </View>
  
        <View style={styles.fullCard}>
          <Text style={styles.fullTitle}>Maintenance Due</Text>
          <Text style={styles.amount}>₹3,500</Text>
          <TouchableOpacity style={styles.payBtn} onPress={GoPay}>
            <Text style={styles.payText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
  
        {/* ===== QUICK TAGS ===== */}
        <View style={styles.billmain}>
          <Billsbtn text="Bills" />
          <Billsbtn text="Events" />
          <Billsbtn text="Society Rules" />
        </View>
        
        {/*online members */}
        <View style={styles.onlineBox}>
             <Text style={styles.onlineTitle}>🟢 Online Members</Text>
             <Text style={styles.onlineCount}>12 members active now</Text>
        </View>
  
  
        <View style={styles.quickRow}>
            <QuickBtn text="Raise Issue" />
            <QuickBtn btn={GoPay} text="Pay Now" />
            <QuickBtn text="Notices" />
        </View>
  
  
        {/* ===== ACTIVITY ===== */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
  
        <ActivityItem text="A-101 paid ₹3,500" />
        <ActivityItem text="Water bill uploaded" />
        <ActivityItem text="Ganesh Puja on 12 Sept" />
  
  
        <View style={styles.issueCard}>
          <Text style={styles.issueTitle}>🚨 Raise an Issue</Text>
          <Text style={styles.issueSub}>
            Water, electricity, parking, security issues
          </Text>
  
          <TouchableOpacity style={styles.issueBtn} onPress={Goissue}>
             <Text style={styles.issueBtnText}>Create Issue</Text>
          </TouchableOpacity>
        </View>
  
        
        <View style={{ height: 100 }} />
      </ScrollView>
      )}

export default Memberhome;

const StatCard = ({ title, value, sub }: any) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSub}>{sub}</Text>
  </View>
);


const ActivityItem = ({ text }: any) => (
  <View style={styles.activity}>
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth:1,
    borderColor:"#0F172A",
  },

  statTitle: {
    color: "#6B7280",
    fontSize: 15,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 6,
  },

  statSub: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  fullCard: {
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 20,
    marginTop: 16,
  },

  fullTitle: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginVertical: 10,
  },

  payBtn: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  payText: {
    color: "#020617",
    fontWeight: "700",
  },


  tag: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  tagText: {
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color:"black",
  },

  activity: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  activityText: {
    fontSize: 14,
    color: "#374151",
  },

  pinned: {
    backgroundColor: "#FEF3C7",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  pinnedTitle: {
    fontWeight: "700",
    color: "#92400E",
  },
  pinnedText: {
    color: "#78350F",
  },
  pinnedTime: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 6,
  },
  
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop:15,
  },
  quickBtn: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    color:"#78350F",
    alignItems: "center",
  },
  quickText: {
    fontWeight: "700",
    fontSize: 13,
    color:"#78350F"
  },
  
  onlineBox: {
    backgroundColor: "#ECFEFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 5,
    marginTop:10,
  },
  onlineTitle: {
    fontWeight: "700",
    color: "#0F766E",
  },
  onlineCount: {
    marginTop: 6,
    color: "#115E59",
  },

  billmain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop:15,
  },

  billsbtn:{
    flex:1,
    marginHorizontal:6,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    color:"#78350F",
    alignItems: "center",
  },

  billsText:{
    fontWeight: "700",
    fontSize: 13,
    color:"#78350F"
  },

  issueCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "700",
    color:"#78350F",
  },
  issueSub: {
    color: "#6B7280",
    marginVertical: 8,
  },
  issueBtn: {
    backgroundColor: "#0F172A",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  issueBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  
  dismiss: {
    marginTop: 6,
    fontSize: 12,
    color: "#92400E",
    textAlign: "right",
  },
  

});