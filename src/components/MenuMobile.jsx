' use client' 
import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import React from 'react'
import { RxExit } from "react-icons/rx";


const MenuMobile = () => {

    const {     
        logout,vierMenuMobile, setViewMenuMoible
      } = useAuth()

    const toggleMenuMobile = () => {
        setViewMenuMoible(!vierMenuMobile)
    }
  
  return (
    <nav className={` lg:hidden transition-all  duration-300  ${vierMenuMobile ? " delay-200" : "delay-75"} absolute w-full bg-black/50 h-screen z-[9998] ${ vierMenuMobile ? "-translate-y-[1200px]" : "translate-x-0"} `}>
        
        <section className={` transition-all  duration-300  ${vierMenuMobile ? " delay-75" : "delay-200"} z-[9999] w-[85%] bg-greenlime h-screen absolute top-0  ${ vierMenuMobile ? "-translate-x-[600px]" :"-translate-x-0"} `}>
        <RxExit className="text-lime-950 text-3xl ml-auto mr-4 mt-4" onClick={toggleMenuMobile}/>
        <div className="flex flex-col gap-y-4 p-8 mt-20 text-lime-950 font-semibold text-lg">
          <Link href="/dashboard" className="text-semibold" onClick={toggleMenuMobile} > Inicio </Link>
          <Link href="/dashboard/activity"onClick={toggleMenuMobile} > Actividad </Link>       
          <Link href="/dashboard/get-money" onClick={toggleMenuMobile}> Cargar Dinero  </Link>
          <Link href="/dashboard/pay-services" onClick={toggleMenuMobile}> Pagar Servcios </Link>
          <Link href="/dashboard/cards" onClick={toggleMenuMobile}> Tarjetas  </Link>
          <Link href="/dashboard/profile" onClick={toggleMenuMobile}> Tu Perfil </Link>
          <button onClick={logout} className="block text-start"> Cerrar Sesíon </button>
        </div>
        </section>
    </nav>
  )
}

export default MenuMobile