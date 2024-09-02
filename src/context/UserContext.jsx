'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDataUserRequest, registerRequest } from '@/axios/User'
import { signInRequest } from '@/axios/Authorization'
import { getTokenRequest } from '@/axios/Account'
import Cookies from "js-cookie";


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
    const [ dataUser , setDataUser ] = useState({})
 
 

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

    //Fetch para controlar que haya token y devolver credenciales
    const isLogued = async() =>{
        setLoading(true)
        try {
          const res = await getTokenRequest()          
          setCredentialsUser(res.data)
          setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        finally{
          setLoading(false)
        }
    }

    //Fetch para solicitar datos del cliente
     const getDataUser = async(id_user) => {
        setLoading(true)
        try {
            const res = await getDataUserRequest(id_user);        
            setDataUser(res.data);
            setLoading(false)
          } catch (error) {
            console.log('Error fetching account details:', error);
            setLoading(false)
          }
          finally{
            setLoading(false)
          }
     }

     //Cerrar Sesion
     const logout = () =>{
        Cookies.remove("token")
        setCredentialsUser(null)
        router.push("/login")
    }


  



    return (
        <AuthContext.Provider value={{logout, isLogued, setLoading,getDataUser,dataUser,credentialsUser,contextErrors , loading, signUp, signIn, setContextErrors}}>
            {children} 
        </AuthContext.Provider>
    )

}