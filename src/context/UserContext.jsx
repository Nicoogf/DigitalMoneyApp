'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDataUserRequest, registerRequest, updateUserRequest } from '@/axios/User'
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
    const [ credentialsUser , setCredentialsUser ] = useState({})
    const [ dataUser , setDataUser ] = useState({})
    const [ errorsLogin, setErrorLogin ] = useState(null)
    const [ vierMenuMobile, setViewMenuMoible ] = useState(true)

    
   

    //Peticion de Registro
    // const signUp = async (user) => {
    //     try {
    //         const res = await registerRequest(user)        
    //         router.push("/successful")
    //     } catch (error) {
    //         console.log(error.response)
    //         setContextErrors(error.response)
    //     }
    // }

    const signUp = async (user) => {
      try {
          const res = await registerRequest(user);
          router.push("/successful");
      } catch (error) {          
          if (error.response && error.response.data) {             
              if (error.response.data.error === "Email already registered") {
                  setContextErrors(["El usuario ya se encuentra registrado"]);
              } else {                
                  setContextErrors([error.response.data.error || "Ocurrió un error inesperado"]);
              }
          } else {       
              setContextErrors(["Error de conexión o respuesta inesperada"]);
          }
      }
  };
  

   

    //Peticion de Iniciar Seccion
    // const signIn = async (user) => {
    //     try {
    //         const res = await signInRequest(user)        
    //         setLoading(false)                      
    //     } catch (error) {   
    //         setLoading(false)         
    //         if (error.response) {
    //             const errorMessage = error.response.data.error;       
    //             const errorsArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
    //             setContextErrors(errorsArray);
    //             setErrorLogin(errorsArray)
    //         } else {
    //             setContextErrors(['Se produjo un error inesperado.']);
    //         }
    //     }
    // }

  //   const signIn = async (user) => {
  //     try {
  //         const res = await signInRequest(user);
  //         setLoading(false);
  //     } catch (error) {
  //         setLoading(false);
  //         if (error.response) {
  //             let errorMessage = error.response.data.error;
  
          
  //             if (errorMessage.includes("user not found")) {
  //                 errorMessage = "Usuario no registrado en DigitalMoney";
  //             }
              
      
  //             if (errorMessage.includes("invalid credentials")) {
  //                 errorMessage = "Credenciales inválidas, por favor verifica tus datos";
  //             }
  
  //             // Aseguramos que errorMessage siempre sea un array
  //             const errorsArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
  //             setContextErrors(errorsArray);
  //             setErrorLogin(errorsArray);
  //         } else {
  //             setContextErrors(['Se produjo un error inesperado.']);
  //         }
  //     }
  // };

  const signIn = async (user) => {
    setLoading(true); 
    try {
        const res = await signInRequest(user);
        setLoading(false);
        return res; 
    } catch (error) {
        setLoading(false);
        if (error.response) {
            let errorMessage = error.response.data.error;

            if (errorMessage.includes("user not found")) {
                errorMessage = "Usuario no registrado en DigitalMoney";
            }

            if (errorMessage.includes("invalid credentials")) {
                errorMessage = "Credenciales inválidas, por favor verifica tus datos";
            }

            const errorsArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
            setContextErrors(errorsArray);
            setErrorLogin(errorsArray);
        } else {
            setContextErrors(['Se produjo un error inesperado.']);
        }
    }
};
  

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

    const updateUser = async (userId, userData) => {
      setLoading(true);
      try {
        const updatedUser = await updateUserRequest(userId, userData);
        setLoading(false);
        setCredentialsUser(updatedUser); 
        return updatedUser;
      } catch (error) {
        console.log(error)
        setLoading(false);
        if (error.response) {
          const errorMessage = error.response.data.error;
          const errorsArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
          setContextErrors(errorsArray);
        } else {
          setContextErrors(['Se produjo un error inesperado.']);
        }
      }
    };
  


  



    return (
        <AuthContext.Provider value={{vierMenuMobile, setViewMenuMoible ,errorsLogin, updateUser,setErrorLogin,
            loading,
            contextErrors,logout, isLogued, setLoading,getDataUser,dataUser,credentialsUser, loading, signUp, signIn, setContextErrors}}>
            {children} 
        </AuthContext.Provider>
    )

}