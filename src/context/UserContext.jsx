'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerRequest } from '@/axios/User'
import { signInRequest } from '@/axios/Authorization'


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
            router.push("/dashboard")
        } catch (error) {            
            console.log(error.response?.data)
            setContextErrors("Credenciales inválidas")
        }
    }

    return (
        <AuthContext.Provider value={{ contextErrors , loading, signUp, signIn, setContextErrors}}>
            {children} 
        </AuthContext.Provider>
    )

}