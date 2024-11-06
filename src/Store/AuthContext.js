import React, { createContext, useState } from "react"

const AuthContext=createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const [token,setToken]=useState(initialToken)

    const userIsLoggedIn= !!token;

    const LoginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
    }

    const LogoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:LoginHandler,
        logout:LogoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;