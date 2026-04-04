import React, { useState ,useContext} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../api/api";
import { UserContext } from "../MEMBER/Schemas/userContext";
type Role = "member" | "secretary";

type LoginProps = {
  onSuccess: (role: Role) => void;
  onBack: () => void;
  register:()=>void;
};

const Login = ({ onSuccess, onBack ,register }: LoginProps) => {
  const {setUser}=useContext(UserContext);
  const [role, setRole] = useState<Role>("member");
  const [society, setSociety] = useState("");
  const [flat, setFlat] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("login btn pressed")
    if (!mobile || !password) {
      return;
    }  
    try{
       const res =await API.post ("/auth/login",{
        mobile,
        password,
       })
    const {token,user}=res.data;
    setUser(user);
    await AsyncStorage.setItem("token",token);
    await AsyncStorage.setItem("user",JSON.stringify(user));
    onSuccess(user.role); 
    }
    catch(err){
      console.log("login error:",err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Login to manage your society smartly
        </Text>
      </View>

      {/* ROLE SELECTOR */}
      <View style={styles.roles}>
        {["member", "secretary"].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleBtn, role === r && styles.roleActive]}
            onPress={() => setRole(r as Role)}
          >
            <Text
              style={[
                styles.roleText,
                role === r && styles.roleTextActive,
              ]}
            >
              {r.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
          placeholder="Society Name"
          style={styles.input}
          value={society}
          onChangeText={setSociety}
        />

        <TextInput
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        <TextInput
          placeholder="Flat / Room No"
          style={styles.input}
          value={flat}
          onChangeText={setFlat}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={register}>
          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text style={{ color: "#38BDF8" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back to  OverView</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#F8FAFC",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#CBD5E1",
  },

  roles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginHorizontal: 4,
    alignItems: "center",
  },

  roleActive: {
    backgroundColor: "#38BDF8",
    borderColor: "#38BDF8",
  },

  roleText: {
    fontSize: 12,
    color: "#CBD5E1",
    fontWeight: "600",
  },

  roleTextActive: {
    color: "#020617",
  },

  form: {
    gap: 16,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  loginBtn: {
    backgroundColor: "#38BDF8",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
  },

  loginText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  backText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
  },
  
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
  },
  

});
