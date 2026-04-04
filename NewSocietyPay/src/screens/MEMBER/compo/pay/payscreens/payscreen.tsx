import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";

//@ts-ignore
import RazorpayCheckout from "react-native-razorpay";

import AddPaymentScreen from "./AddPaymentScreen";
import API from "../../../../../api/api";

/* ---------- TYPES ---------- */
type Role = "member" | "secretary";


const PayScreen = ({ role }: { role: Role }) => {
  const [allpayments,setallpayments]= useState([]);
  const fetchPayments= async()=>{
    try{
        const res= await API.get("/society/payment/my");
        setallpayments(res.data);}
    catch(err){
      console.log("Error in getting bills");
    }
  }
  useEffect(()=>{
    fetchPayments();
  },[]);

  const [step, setStep] = useState<"pay" | "add"| "confirm" | "processing" | "success">("pay");

  
  if(step==="add"){
    return (  <AddPaymentScreen onDone={()=>setStep("pay")}/>)
  }
  

  const verifyPayment =async (data:any,item:any)=>{
    try{
      await API.post("/society/payment/verify",{
        paymentid:item._id,
        razorpay_order_id:data.razorpay_order_id,
        razorpay_payment_id:data.razorpay_payment_id,
        razorpay_signature:data.razorpay_signature
      })
    }
    catch(err){
       console.log("verification failed in fronted",err);
    }
  }

  const startpayment= async (item:any)=>{
      try{
          const res= await API.post("/society/payment/create-order",{
            paymentid:item._id
          })
          const order= res.data;
          var options={
            description:"Society Payment",
            order_id:order.id,
            image:"https://logo.com",
            currency:"INR",
            key:"rzp_test_SV4Ef6kmBOzdFZ",
            amount:order.amount,
            name:"Society App",
            prefill:{
              email:"test@test.com",
              contact:"9999999999",
              name:"Member"
            },
            theme:{color:"#0B1B3B"}
          }

          RazorpayCheckout.open(options)
          .then((data:any)=>{
            verifyPayment(data,item)
          })
          .catch((error:any)=>{
            console.log(error)
          })
      }
      catch(err){
        console.log("Error in pay",err);
        await API.post("/society/payment/failed",{
          paymentid:item._id
        })
      }
  }

  const renderItem = ({item}:{item:any}) => {//passing payment 
    //that is having 
    //1) Bill 2) user 3)amount 4)razorpay related data

    return (
      <View style={styles.card} key={item._id}>
        <View style={styles.topRow}>
          <Text style={styles.reason}>
            {item?.bill?.reason}
          </Text>
          <Text style={styles.amount}>
            ₹ {item?.bill?.amount}
          </Text>
        </View>
        <Text style={styles.month}>
          {item?.bill?.month} {item?.bill?.year}
        </Text>
        <Text style={styles.due}>
          Due: {new Date(item?.bill?.deadline).toDateString()}
        </Text>
        {item?.status === "pending" && (
          <TouchableOpacity style={styles.payBtn} onPress={()=>startpayment(item)}>
            <Text style={[styles.payText, { color: getStatusColor(item.status) }]}>
                  {item.status === 'paid' ? 'PAID' : 'PAY NOW'}
            </Text>
          </TouchableOpacity>
        )}

        {item?.status === "paid" && (
          <View style={styles.paidBadge}>
            <Text style={styles.paidText}>
              Paid ✓
            </Text>
          </View>
        )}

      </View>

    )
  }
  return (
    <ScrollView>
    <View style={styles.container}>
        {/* SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
        </View>

        {/* PAYMENT LIST */}
        <View style={styles.card}>

        <FlatList
          data={allpayments}
          
          renderItem={renderItem}
          keyExtractor={(item)=>item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
        
        </View>
        {role==="secretary" && ( 
         <TouchableOpacity
         style={styles.addPaymentBtn}
         onPress={() => setStep("add")}
       >
         <Text style={styles.addPaymentText}>+ Add New Payment</Text>
       </TouchableOpacity>
        )}
        
    </View>
    </ScrollView>
  );
};


export default PayScreen;

const getStatusColor = (status:any) => {
  switch (status) {
    case 'paid': return '#4CAF50';    // Green
    case 'pending': return '#FFC107'; // Amber/Yellow
    case 'failed': return '#F44336';  // Red
    default: return '#000';           // Default Black
  }
};

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    color:"#000000"
  },

  summary: {
    padding: 24,
    backgroundColor: "#0F172A",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  summaryTitle: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  summaryAmount: {
    color: "#F8FAFC",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },

  summarySub: {
    color: "#94A3B8",
    marginTop: 6,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color:"#000000"
,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderRadius: 4,
    marginRight: 12,
  },

  checkboxActive: {
    backgroundColor: "#22C55E",
    color:"#000000",
    borderColor: "#22C55E",
  },

  rowText: {
    flex: 1,
    color:"#000000"
,
    fontSize: 15,
  },

  actionBtn: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  actionText: {
    fontWeight: "600",
    color: "#3730A3",
  },

  payBar: {
    // position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },


  payDisabled: {
    backgroundColor: "#94A3B8",
  },

  addPaymentBtn: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  
  addPaymentText: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 15,
  },
  dueText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
  
  overdueText: {
    color: "#EF4444",
    fontWeight: "700",
  },

  listContainer:{
    padding:16
    },
    
    card:{
    backgroundColor:"#fff",
    borderRadius:16,
    padding:18,
    marginBottom:18,
    
    shadowColor:"#000",
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.08,
    shadowRadius:10,
    
    elevation:4
    },
    
    topRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
    },
    
    reason:{
    fontSize:18,
    fontWeight:"600",
    color:"#111"
    },
    
    amount:{
    fontSize:18,
    fontWeight:"700",
    color:"#1E8E3E"
    },
    
    month:{
    marginTop:6,
    fontSize:14,
    color:"#777"
    },
    
    due:{
    marginTop:4,
    fontSize:13,
    color:"#999"
    },
    
    payBtn:{
    marginTop:16,
    backgroundColor:"#0B1B3B",
    paddingVertical:14,
    borderRadius:12,
    alignItems:"center"
    },
    
    payText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"600"
    },
    
    paidBadge:{
    marginTop:16,
    backgroundColor:"#E8F5E9",
    paddingVertical:10,
    borderRadius:10,
    alignItems:"center"
    },
    
    paidText:{
    color:"#2E7D32",
    fontWeight:"600"
    }
  
  })
  
