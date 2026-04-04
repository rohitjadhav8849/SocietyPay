import React, {useState, useEffect} from "react";
import {
 View,
 Text,
 TextInput,
 Button,
 TouchableOpacity,
 ScrollView
} from "react-native";

import API from "../../api/api";
import { launchCamera,launchImageLibrary } from "react-native-image-picker";

type Society={
  _id:string,
  name:string
}


export default function RegisterScreen({doneregister}:{doneregister:()=>void}){

 const [name,setName] = useState("")
 const [mobile,setMobile] = useState("")
 const [password,setPassword] = useState("")

 const [role,setRole] = useState("member")

 const [societies,setSocieties] = useState<Society[]>([])
 const [selectedSociety,setSelectedSociety] = useState("")

 const [wing,setWing] = useState("")
 const [flatNumber,setFlatNumber] = useState("")

 const [societyName,setSocietyName] = useState("")
 const [address,setAddress] = useState("")
 const [city,setCity] = useState("")
 const [state,setState] = useState("")
 const [selfie,setSelfie]=useState("");
 const [bill,setBill]=useState("");
 const [aadhar,setAadhar]=useState("");

 useEffect(()=>{
  fetchSocieties()
 },[])

 const fetchSocieties = async ()=>{
  try{
   const res = await API.get("/society/all")
   setSocieties(res.data)
  }catch(err){
   console.log("society fetch error",err)
  }
 }

 const pickSelfie= async ()=>{
    launchCamera({mediaType:'photo',cameraType:'front'},(Response)=>{
        if(Response.didCancel){
          console.log("user cancled");
        }
        else if(Response.errorCode){
          console.log("camera error",Response.errorMessage);
        }
        else if(Response.assets && Response.assets.length>0){
          const uri=Response.assets[0].uri 
          setSelfie(uri || "");
        }
      }

    )
 }
 
 const handleRegister = async ()=>{
  try{
    const documents=[
      {
        type:"aadhar",
        uri:aadhar,
        verified:Boolean
      },
      {
        type:"bill",
        uri:bill,
        verified:Boolean
      },
      {
        type:"selfie",
        uri:selfie,
        verified:Boolean
      }
     ]
   let data:any = {
    name,
    mobile,
    password,
    role,
    flat:{
     wing,
     number:flatNumber
    },
    documents 
   }
   if(role === "member"){
    data.society = selectedSociety
   }
   if(role === "secretary"){
    data.society = {
     name:societyName,
     address,
     city,
     state
    }
   }

   const res = await API.post("/auth/register",data)
   console.log("register success",res.data)

  }catch(err){
   console.log("register error",err)
  }

 }

 return(

  <ScrollView style={{flex:1,backgroundColor:"#0F172A"}}>
  
  <View style={{padding:20}}>
  
  <Text style={{
   fontSize:28,
   fontWeight:"bold",
   color:"white",
   marginBottom:25
  }}>
  Create Account
  </Text>
  
  {/* Card */}
  <View style={{
   backgroundColor:"#ffffff",
   borderRadius:16,
   padding:20
  }}>
  
  
  <TextInput
  placeholder="Name"
  placeholderTextColor="#94A3B8" 
  value={name}
  onChangeText={setName}
  style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF",          
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  }}
/>
  
  <TextInput
   placeholder="Mobile"
   value={mobile}
   placeholderTextColor="#94A3B8"
   onChangeText={setMobile}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:12
   }}
  />
  
  <TextInput
   placeholder="Aadhar number"
   placeholderTextColor="#94A3B8" 
   value={aadhar}
   onChangeText={setAadhar}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:12
   }}
  />
  
  <TextInput
   placeholder="Electricity Bill Number"
   placeholderTextColor="#94A3B8" 
   value={bill}
   onChangeText={setBill}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:12
   }}
  />
  
  <TouchableOpacity
   onPress={pickSelfie}
   style={{
    backgroundColor:"#0F172A",
    padding:12,
    borderRadius:10,
    marginBottom:15,
    alignItems:"center"
   }}
  >
  <Text style={{color:"white"}}>
  Take Selfie
  </Text>
  </TouchableOpacity>
  
  <TextInput
   placeholder="Password"
   secureTextEntry
   value={password}
   placeholderTextColor="#94A3B8" 
   onChangeText={setPassword}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:20
   }}
  />
  
  <Text style={{marginBottom:10,fontWeight:"600"}}>
  Select Role
  </Text>
  
  <View style={{flexDirection:"row",marginBottom:20}}>
  
  <TouchableOpacity
   onPress={()=>setRole("member")}
   style={{
    flex:1,
    padding:12,
    borderRadius:10,
    backgroundColor:role==="member"?"#0F172A":"#E2E8F0",
    marginRight:10,
    alignItems:"center"
   }}
  >
  <Text style={{color:role==="member"?"white":"black"}}>
  Member
  </Text>
  </TouchableOpacity>
  
  <TouchableOpacity
   onPress={()=>setRole("secretary")}
   style={{
    flex:1,
    padding:12,
    borderRadius:10,
    backgroundColor:role==="secretary"?"#0F172A":"#E2E8F0",
    alignItems:"center"
   }}
  >
  <Text style={{color:role==="secretary"?"white":"black"}}>
  Secretary
  </Text>
  </TouchableOpacity>
  
  </View>
  
  {/* MEMBER FORM */}
  
  {role === "member" && (
  
  <View>
  
  <Text style={{marginBottom:8,fontWeight:"600"}}>
  Select Society
  </Text>
  
  {societies.map((item)=>(
  <TouchableOpacity
   key={item._id}
   onPress={()=>setSelectedSociety(item._id)}
   style={{
    padding:10,
    borderRadius:8,
    backgroundColor:selectedSociety===item._id?"#0F172A":"#E2E8F0",
    marginBottom:8
   }}
  >
  <Text style={{
   color:selectedSociety===item._id?"white":"black"
  }}>
  {item.name}
  </Text>
  </TouchableOpacity>
  ))}
  
  <TextInput
   placeholder="Wing"
   value={wing}
   placeholderTextColor="#94A3B8" 
   onChangeText={setWing}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginTop:10
   }}
  />
  
  <TextInput
   placeholder="Flat Number"
   value={flatNumber}
   onChangeText={setFlatNumber}
   placeholderTextColor="#94A3B8" 
   style={{
    backgroundColor: "#1E293B",
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginTop:10
   }}
  />
  
  </View>
  
  )}
  
  {/* SECRETARY FORM */}
  
  {role === "secretary" && (
  <View>
  <TextInput
   placeholder="Society Name"
   placeholderTextColor="#94A3B8" 
   value={societyName}
   onChangeText={setSocietyName}
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:10
   }}
  />
  <TextInput
   placeholder="Address"
   value={address}
   onChangeText={setAddress}
   placeholderTextColor="#94A3B8" 
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:10
   }}
  />
  
  <TextInput
   placeholder="City"
   value={city}
   onChangeText={setCity}
   placeholderTextColor="#94A3B8" 
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:10
   }}
  />
  <TextInput
   placeholder="State"
   value={state}
   placeholderTextColor="#94A3B8" 
   onChangeText={setState}
   style={{
    backgroundColor: "#1E293B",
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:10
   }}
  />
  
  <TextInput
   placeholder="Wing"
   value={wing}
   onChangeText={setWing}
   placeholderTextColor="#94A3B8" 
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12,
    marginBottom:10
   }}
  />
  
  <TextInput
   placeholder="Flat Number"
   value={flatNumber}
   onChangeText={setFlatNumber}
   placeholderTextColor="#94A3B8" 
   style={{
    backgroundColor: "#1E293B", 
    color: "#FFFFFF", 
    borderRadius:10,
    padding:12
   }}
  />
  </View> 
  )}
  
  <TouchableOpacity
   onPress={()=>{
    handleRegister();
    doneregister();
   }}
   style={{
    backgroundColor:"#0F172A",
    padding:15,
    borderRadius:12,
    marginTop:25,
    alignItems:"center"
   }}
  >
  
  <Text style={{
   color:"white",
   fontWeight:"bold",
   fontSize:16
  }}>
  Register
  </Text>
  </TouchableOpacity>
  </View>
  </View>
  </ScrollView>
  
  )

}