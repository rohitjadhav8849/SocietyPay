import react,{useState} from "react";
import {View,StyleSheet} from "react-native";

// 9876543292 //293
import HeaderTab from "../mainContent/Header/header"
import BottomTab from "./bottomtab"
import { typeTabs } from "./types";


import Home from "../compo/home/homescreen"
import HistoryScreen from "../compo/history/historyscreen";
import AnnouncementChat from "../compo/chat/announcement/announcementchat";
import ChatScreen from "../compo/chat/chatscreen";
import CommunicationHub from "../compo/chat/announcement/mainHub/communicationHub";
import PayScreen from "../compo/pay/payscreens/payscreen";
import ProfileScreen from "../compo/profile/profilescreen";
import NotificationScreen from "../mainContent/Header/notificationScreen";


import { UserProfile } from "../Schemas/userSchema";
import MemberDetails from "../compo/home/secretary/membersDetails";
import InDepthDetails from "../compo/home/secretary/inDepthMember";
import RaiseComplaint from "../compo/home/features/raiseComplaint";
import ComplaintShow from "../compo/home/features/complaint";


const MainLayout =({
  user,
  onLogout,
  
}:{
  user: UserProfile;
  onLogout: () => void;
})=>{
    const [activeTab,setActiveTab] =useState<typeTabs>("Home");
    const [subscreen,SetSubscreen]=useState<
    "hub"|
    "chat"|
    "announcement"|
    "members"|
    "header"|
    "notifiactions">("hub");
    const [value,setvalue]=useState(null);

    const [notificationTab,setnotificationTab]=useState<"header"|"notifiactions">("header")
    
    if(!user) return null;

    const renderTabs =()=>{

      if( notificationTab==="header"){
        if(activeTab==="Home"){
          return <Home role={user.role} 
            memberDetails={()=>setActiveTab("membersDetails")} 
            Gochat={()=>setActiveTab("Chat")} 
            GoPay={()=>setActiveTab("Pay")} 
            Goissue={()=>setActiveTab("issues")}
            />
        }
        if(activeTab==="issues"){
          return <ComplaintShow  go={()=>setActiveTab("raise")} back={()=>setActiveTab("Home")} />
        }
        if(activeTab==="raise"){
          return <RaiseComplaint back={()=>setActiveTab("issues")}/>
        }
        
        if(activeTab==="membersDetails"){
            return <MemberDetails  
            inDepth={(click)=>{
              setActiveTab("inDepthMembers");
              setvalue(click);
            }}
            goBack={()=>{
            setActiveTab("Home");
          }}/>
        }
        if(activeTab==="inDepthMembers"){
          return <InDepthDetails clicked={value}  goBack={()=>setActiveTab("membersDetails")}/>
        }
        if(activeTab==="History"){
          return <HistoryScreen role={user.role}/>
        }
        if(activeTab==="Chat"){
          if(subscreen==="chat"){
            return <ChatScreen Goback={()=>SetSubscreen("hub")}/>
          }
          if(subscreen==="announcement"){
            return <AnnouncementChat Goback={()=>SetSubscreen("hub")}/>
          }
          return <CommunicationHub 
                 onOpenChat={()=>SetSubscreen("chat")}
                 onOpenAnnouncements={()=>SetSubscreen("announcement")}
                 onOpenMembers={()=>SetSubscreen("members")}
          />
        }
        if(activeTab==="Pay"){
         return <PayScreen role ={user.role}/>
        }
        if(activeTab==="Profile"){
          return <ProfileScreen 
          onLogout={onLogout} />
        }
        else {
           return <Home role={user.role} 
          memberDetails={()=>setActiveTab("membersDetails")} 
          Gochat={()=>setActiveTab("Chat")} 
          GoPay={()=>setActiveTab("Pay")} 
          Goissue={()=>setActiveTab("issues")}
          />
        }
      }
      else{
        return <NotificationScreen Goback={()=>setnotificationTab("header")} />
      }
    }

    return (
      <View 
       style={{flex:1,backgroundColor:"#F1F5F9"}}
      >
         <HeaderTab change={()=>setnotificationTab("notifiactions")} />
         <View style={{flex:1}}>{renderTabs()}</View>
         <BottomTab activeTab={activeTab} setActiveTab={setActiveTab} />

      </View>
    )

}

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  content: {
    flex: 1,
  },
});