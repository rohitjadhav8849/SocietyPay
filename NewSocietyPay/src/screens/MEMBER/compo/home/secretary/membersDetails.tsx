import React,{useEffect,useState,useContext} from "react";

import {View,Text,FlatList,TouchableOpacity} from "react-native"
import API from "../../../../../api/api";
import { UserContext } from "../../../Schemas/userContext";

const MemberDetails= ({ goBack,inDepth}:{
  inDepth:(id:any)=>void,
  goBack:()=>void,
 })=>{
  
  const [members,setMembers]=useState<any[]>([]);

  const fetchMembers= async()=>{
    try{
      const response=await API.get("/society/members")
        // console.log("data received in secretaryhome",response);
      if(response){
         setMembers(response.data);
      }
    }
    catch(err){
      console.log("Error in all member's collection",err);
    }
  }
  useEffect(()=>{
    fetchMembers();
  },[]);



  return (
    <View style={{flex:1,padding:20}}>

    <TouchableOpacity 
    onPress={() => goBack()}
    style={{
      position: "absolute",
      top: 20,   
      right: 10,
      backgroundColor: "#1E293B", 
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      zIndex: 10}}
      ><Text>Back</Text></TouchableOpacity>

      <Text
        style={{fontSize:22,
        fontWeight:"bold",
        marginBottom:20,
        color:"black"
    }}
      >All Members 👤</Text>


      <FlatList
       data={members}
       keyExtractor={(item)=>item._id}
       renderItem={({item})=>(
        <View
        style={{
        backgroundColor:"#0F172A",
        padding:15,
        borderRadius:10,
        marginBottom:10
        }}>
           <TouchableOpacity 
             onPress={()=>inDepth(item._id)}
           >
           <Text
           style={{fontSize:16,fontWeight:"600",color:"white"}}
           >{item.name}</Text>
           <Text style={{color:"#94A3B8"}}>
            {item.flat?.wing}- {item.flat?.number}
           </Text>
           <Text style={{color:"#94A3B8"}}>{item.role}</Text>
           </TouchableOpacity>
        </View>
       )}
      />
    </View>
  )

}
export default MemberDetails;