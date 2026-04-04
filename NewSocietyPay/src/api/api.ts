import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API =axios.create({
  baseURL:"http://192.168.75.168:5000/api",
})

//now we will make some bouncers that will protect the 
// incoming requests

API.interceptors.request.use( 
  async config =>{
     const token =await AsyncStorage.getItem("token");
     if(token){
      config.headers=config.headers||{};
      config.headers.Authorization=`Bearer ${token}`;
     }

    return config;
  }
)

export default API;