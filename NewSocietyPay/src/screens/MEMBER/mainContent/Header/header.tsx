import React ,{useContext,useState,useEffect}from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import API from "../../../../api/api";
import { UserContext } from "../../Schemas/userContext";



const Header = ({change}:{change:()=>void}) => {
  const {user}= useContext(UserContext);
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
    <View style={styles.outer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.greet}>Hi {user.name}👋</Text>
          <Text style={styles.society}>:{Sname}</Text>
        </View>

        <TouchableOpacity style={styles.bell} onPress={change}>
          <Text style={styles.bellText}>🔔</Text>
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  /* Outer layer for shadow + curve */
  outer: {
    backgroundColor: "#020617",
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 14,
  },

  container: {
    height: 90,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom:10,
    backgroundColor: "#0F172A",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  greet: {
    color: "#CBD5E1",
    fontSize: 14,
    letterSpacing: 0.4,
  },

  society: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },

  bell: {
    width: 44,
    height: 44,
    backgroundColor: "#1E293B",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  bellText: {
    fontSize: 18,
  },

  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#38BDF8",
    borderRadius: 4,
  },
});
