import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import MemberHome from "./selfMember/memberhome";
import SecretaryHome from "./secretary/secretaryhome";

type Props = {
  role: "member" | "secretary"|"security";
  Gochat:()=>void;
  memberDetails:()=>void;
  GoPay:()=>void
  Goissue:()=>void
};

const Home = ({ role,memberDetails,Gochat,GoPay,Goissue}: Props) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
       

      {/* COMMON MEMBER VIEW */}
         <MemberHome Gochat={Gochat} GoPay={GoPay} Goissue={Goissue} />

      {/* EXTRA FOR SECRETARY */}
      <SecretaryHome  memberDetails={()=>memberDetails()} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
});
