'use client'
import { useAuth } from '@/context/UserContext'
import React from 'react'

const HomePage = () => {
  const { isAutenticated ,credentialsUser} = useAuth()
  return (
    <div className="text-white flex flex-col">
        Dashboard 

        <section className="flex flex-row gap-2">
        <p> esta autenticado ? </p>
        <p>{ credentialsUser ? "true" : "false" } </p>
        </section>
        

        <section className="flex flex-row gap-2">
        <p>Credenciales </p>
        <p> {JSON.stringify(credentialsUser)} </p>
        </section>

        <section className="flex flex-row gap-2">
        <p>Datos </p>
        <p> {JSON.stringify(credentialsUser)} </p>
        </section>
      
    </div>
  )
}

export default HomePage