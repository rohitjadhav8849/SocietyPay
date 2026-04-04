import React, { useState,useContext, useEffect,useMemo} from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import API from "../../../../../api/api";
import {io} from "socket.io-client";
const socket = io('http://10.55.126.89:5000/api');
import { UserContext } from "../../../Schemas/userContext";

/* ===== SCREEN ===== */
const AnnouncementChat = ({ Goback}: {Goback:()=>void }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text,settext] =useState("");
  const {user}=useContext(UserContext);
  const [editingid,seteditingid]= useState<string|null>(null)
  
  useEffect(()=>{
    if(user?.societyid){
      socket.emit("joinSociety",user.societyid);
    }
  },[user]);

  const fetchmessages= async ()=>{
    try{
        const res =await API.get("/society/announcement");
        setMessages(res.data);
    }
    catch(err){
      console.log("Error in fetching messages:",err);
    }
  }
  useEffect(()=>{
    fetchmessages();
  },[]);

  const sendAnnouncement = async ()=>{
      console.log("sending message");
      if(!text.trim()) return;
      try{
         const res = await API.post("/society/announcement",{message:text});
         settext(""); 
      }
      catch(err){
        console.log("Error in fetching:",err);
      }
  }

  useEffect(()=>{
    socket.on("receiveAnnouncement",(msg)=>{
      setMessages(prev=>[
        ...prev,msg
      ])
    })
     return ()=>{
      socket.off("receiveAnnouncement");
     }
  },[user]);
  
  const pinAnnouncement=async (id:string)=>{
      try{
        await API.put(`/society/announcement/pin/${id}`);
      }
      catch(err){
        console.log("Error in pin:",err);
      }
  }  
  useEffect(() => { 
    socket.on("pinUpdated", (updated)=>{
       setMessages(prev=>
        prev.map(msg=>({
          ...msg,
          pinned:msg._id===updated._id
        }))
        )
    });
    return () => {
      socket.off("pinUpdated");
    };
  }, [socket]);
  

  const unpinAnnouncement=async(id:string)=>{
     try{
        await API.put(`/society/announcement/unpin/${id}`)
     }
     catch(err){
      console.log("error in unpin",err);
     }
  }
  useEffect(()=>{
    socket.on("unpinUpdated",(updated)=>{
      setMessages(prev=>
        prev.map(msg=>({
          ...msg,
          pinned:msg._id===updated._id
        })))
    })
    return ()=>{
      socket.off("unpinUpdated");
    }
  },[socket])


  const saveEdit =async ()=>{
    if(!editingid || !text) return ;
    try{
          await API.put(`/society/announcement/edit/${editingid}`,{
            message:text
          })
          seteditingid(null);
          settext("");
    }
    catch(err){
       console.log("Error in saving edit",err);
    }
  }
  useEffect(()=>{
    socket.on("editUpdated",(updated)=>{
      setMessages(prev=>
        prev.map( msg=>
        msg._id===updated._id
        ?updated:msg
          )
        )
    })
    return ()=>{
      socket.off("editUpdated");
    }
  })
   const startedit= (item:any)=>{
     seteditingid(item._id);
     settext(item.message);
   }

 const deleteMessage= async (id:string)=>{
      try{
           await API.delete(`/society/announcement/delete/${id}`)
      }
      catch(err){
        console.log("error in deleting message",err);
      }
 }
 useState(()=>{
    socket.on("announcementDeleted",(deleted)=>{
      setMessages(prev=>
        prev.filter(msg=>
          msg._id!==deleted._id //it removes 
          ))
    })
 })
 
 const handleLongPress =(item:any)=>{
    Alert.alert(
      "Options",
      "choose action",
      [
        {
           text:"Pin",
           onPress:()=>{
            if(!item.pinned){
              pinAnnouncement(item._id)
            }
           }
        },
        {
           text:"Unpin",
           onPress:()=>{
            if(item.pinned){
              unpinAnnouncement(item._id)
            }
           }
        },
        {
          text:"Delete",
           onPress:()=>deleteMessage(item._id),
           style:"destructive"
        },
        {
          text:"Cancel",
          style:"cancel"
        }
      ]
    )
 }


   const sortedMessages= useMemo(()=>{
    return [...messages].sort((a,b)=> b.pinned-a.pinned);
   },[messages])

  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity 
           onPress={Goback}
           style={{
           position: "absolute",
           top: 20,   
           right: 10,
           backgroundColor: "#1E293B", 
           paddingVertical: 8,
           paddingHorizontal: 15,
           borderRadius: 20,
           zIndex: 10}}
          ><Text  style={{color:"#fff"}}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Announcements</Text>
        <Text style={styles.subtitle}>Official society updates</Text>
      </View>

      {/* ===== ANNOUNCEMENT LIST ===== */}
      <FlatList
        data={sortedMessages}
        keyExtractor={(item) => item._id}  
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
         
          <View
            style={[
              styles.card,
              item.pinned && styles.pinnedCard,
            ]}
          >
             <TouchableOpacity onLongPress={()=>handleLongPress(item)}>
            {item.pinned && (
              <Text style={styles.pinnedLabel}>📌 PINNED</Text>
            )}

            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
            </TouchableOpacity>

            {/* ===== SECRETARY ACTIONS ===== */}
            {user.role === "secretary" && (
              <View style={styles.actions}>
                
                  {/* button for editing */}
                <TouchableOpacity
                 onPress={()=>startedit(item)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                </View>
            )}
          </View>
        )}
      />

      {/* ===== INPUT (ONLY SECRETARY) ===== */}
      {user.role === "secretary" && (
        <View style={styles.inputBar}>
          <TextInput
            placeholder={""}
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={text}
            onChangeText={settext}//the value taking is different
          />

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={editingid?saveEdit:sendAnnouncement}
          >
            <Text style={styles.sendText}>{editingid?"Update":"Send"}</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

export default AnnouncementChat;

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#020617",
  },

  header: {
    // marginTop:2,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: "#0F172A",
    borderBottomWidth: 1,
    borderColor: "#1E293B",
    
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#0F172A",
    padding: 10,
    borderRadius: 14,
    marginBottom: 14,
  },

  pinnedCard: {
    borderWidth: 1,
    borderColor: "#38BDF8",
  },

  pinnedLabel: {
    color: "#38BDF8",
    fontWeight: "700",
    marginBottom: 6,
  },

  message: {
    color: "#E5E7EB",
    fontSize: 15,
    lineHeight: 22,
  },

  time: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 8,
  },

  actions: {
    flexDirection: "row",
    marginTop: 10,
  },

  actionText: {
    color: "#38BDF8",
    fontWeight: "600",
    marginRight: 16,
  },

  inputBar: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#1E293B",
    backgroundColor: "#020617",
  },

  input: {
    flex: 1,
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#38BDF8",
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: "center",
  },

  sendText: {
    fontWeight: "700",
    color: "#020617",
  },

});
