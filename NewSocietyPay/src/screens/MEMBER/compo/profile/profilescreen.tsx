import React,{useContext,useState,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { UserContext } from "../../Schemas/userContext";
import API from "../../../../api/api";

type Props = {
  onLogout: () => void;
};

const ProfileScreen = ({onLogout }: Props) => {
  const {user}=useContext(UserContext);
  
  const [Sname,setSname]=useState<""|null>(null);
 
  const fetchName=async ()=>{
   try{
       const res= await API.get(`/auth/societyname/${user.societyid}`);
       setSname(res.data);
   }
   catch(err){
    console.log("error in getting the name of the society");
   }
}

useEffect(()=>{
  fetchName();
},[])



  return (
    <ScrollView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={user.role!=="security" &&  styles.subText}>
        {user.role!=="security" && <Row label="Flat" value={`${user?.flat?.wing}-${user?.flat?.number}`} />}  
        </Text>
        <Text style={styles.subText}>
          {Sname}
        </Text>
        <Text style={styles.role}>
          {user.role.toUpperCase()}
        </Text>
      </View>

      {/* ===== BASIC INFO ===== */}
      <Section title="Personal Info">
        <Row label="Mobile" value={user.mobile} />
          
      </Section>

      {/* ===== DOCUMENTS ===== */}
      <Section title="Documents" >
        {user.documents.map((doc:any) => (
          <TouchableOpacity key={doc._id} style={styles.docRow}>
            <Text style={styles.docText}>{doc.type.toUpperCase()}</Text>
            <Text
              style={[
                styles.status,
                doc.verified ? styles.verified : styles.pending,
              ]}
            >
              {doc.verified ? "Verified" : "Pending"}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload / Update Documents</Text>
        </TouchableOpacity>
      </Section>

      {/* ===== ACTIONS ===== */}
      <Section title="Account">
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Section>
    </ScrollView>
  );
};

export default ProfileScreen;

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    color:"#000000"
  },

  header: {
    padding: 24,
    backgroundColor: "#020617",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  name: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
  },

  subText: {
    color: "#CBD5E1",
    marginTop: 6,
  },

  role: {
    marginTop: 8,
    color: "#38BDF8",
    fontWeight: "600",
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: "#E5E7EB",
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#94A3B8",
  },

  value: {
    color: "#F8FAFC",
  },

  docRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  docText: {
    color: "#F8FAFC",
  },

  status: {
    fontWeight: "600",
  },

  verified: {
    color: "#22C55E",
  },

  pending: {
    color: "#FACC15",
  },

  uploadBtn: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#1E293B",
    alignItems: "center",
  },

  uploadText: {
    color: "#38BDF8",
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 5,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#7F1D1D",
    alignItems: "center",
    marginBottom:10,
  },

  logoutText: {
    color: "#FEE2E2",
    fontWeight: "600",
  },
});
