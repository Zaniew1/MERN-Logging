import React, { useState } from "react";
 type AuthContextType = {
    loggedIn: boolean,
    setloggedIn: (logged: boolean) => void,
    userData: UserDataType,
    setUserData: (data: object) => void,
  }
 type ContextPropsType = {
    children: React.ReactNode
  }
  export type UserDataType = {
    status:string,
    message?:string,
    token?: string,
    data?:{
      user:{
        _id:string,
        username:string,
        email:string,
        creationDate:number
      }
    }
  }
const userDataEmpty = {
  status:'',
  token: '',
  message: '',
  data:{
    user:{
      _id:'',
      username:'',
      email:'',
      creationDate:0
    }
  }
}
export const AuthContext = React.createContext<AuthContextType>({
    loggedIn: false,
    setloggedIn: () => {false},
    userData: userDataEmpty,
    setUserData: () => {''},
  });



export const AuthContextProvider = (props: ContextPropsType) => {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>(userDataEmpty);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        setloggedIn: setloggedIn,
        userData:userData,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};