import React,{useState,createContext,ReactNode} from "react";

export const UserContext= createContext<any>(null);

type usercontextType ={
  user:any,
  setUser:React.Dispatch<React.SetStateAction<any>>
  updateUser:(user:any)=>void
}

export const UserProvider =  ({children}:{children:ReactNode})=>{
   const [user,setUser]=useState(null);
   
   const updateUser =(updateUser:any)=>{
       setUser(updateUser);
   }

   return (
    <UserContext.Provider 
    value={{user,setUser,updateUser}} >
      {children}
    </UserContext.Provider>
   )
}