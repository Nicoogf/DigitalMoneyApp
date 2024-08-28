'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerRequest } from '@/axios/User'
import { signInRequest } from '@/axios/Authorization'
import { getTokenRequest } from '@/axios/Account'


const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth debe ser utilizado dentro del AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [ contextErrors , setContextErrors ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ token, setToken ] = useState(null);
    const [ credentialsUser , setCredentialsUser ] = useState({})
 
 

    //Peticion de Registro
    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log("Contexto llamando /users " , res)
            router.push("/login")
        } catch (error) {
            console.log(error.response)
            setContextErrors(error.response)
        }
    }

    //Peticion de Iniciar Seccion
    const signIn = async (user) => {
        try {
            const res = await signInRequest(user)
            console.log("El valor de data fue:", res.data.token)
            setLoading(false)                      
        } catch (error) {   
            setLoading(false)         
            if (error.response) {
                const errorMessage = error.response.data.error;       
                const errorsArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
                setContextErrors(errorsArray);
            } else {
                setContextErrors(['Se produjo un error inesperado.']);
            }
        }
    }

    //Fetch para controlar que haya token
    const isLogued = async() =>{
        try {
          const res = await getTokenRequest()
          console.log("el useeffect devolvio" , res.data)
          setCredentialsUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        isLogued()
    },[])

    return (
        <AuthContext.Provider value={{credentialsUser,contextErrors , loading, signUp, signIn, setContextErrors}}>
            {children} 
        </AuthContext.Provider>
    )

}