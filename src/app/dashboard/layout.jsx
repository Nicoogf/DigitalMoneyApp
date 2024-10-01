'use client'
import Image from 'next/image'
import React ,{useEffect} from 'react'
import LogoDMH from "../../../public/logo-on.png"
import Link from 'next/link'
import { useAuth } from '@/context/UserContext'
import { getFirstLetters } from '@/funcionalidad/funcionalidades'
import LoadingSpinner from '@/components/loading'
import MenuMobile from '@/components/MenuMobile'
import { IoMenu } from "react-icons/io5";

const LayoutPage = ({ children }) => {  const {
  credentialsUser,  // id id_user amount cvu alias
  dataUser, // name lastname dni email
  loading, // esta cargando ?
  setLoading,
  getDataUser, // trae los datos del user
  isLogued,
  logout,
  vierMenuMobile, 
  setViewMenuMoible
} = useAuth()



useEffect(() => {
  isLogued()
},[])

useEffect( () => {
  getDataUser(credentialsUser?.user_id)
} , [credentialsUser]) 

const toggleMenuMobile = () => {
  setViewMenuMoible(!vierMenuMobile)
}

  return (
    <section className="text-white h-[100vh] overflow-y-scroll  flex flex-col relative w-full">

      <MenuMobile />
      <header className="h-[64px] lg:h-[70px] w-full bg-graydark py-2 flex flex-row justify-between">
        <Image src={LogoDMH} alt="Digital Money House Logo" className=" ml-8 w-20 object-contain" />

        <Link href="/dashboard" className="flex flex-row items-center mr-16 gap-x-4">
      
          <h6 className="bg-greenlime rounded-lg py-1 px-2 text-lime-950 font-bold hidden lg:flex w-8 h-8  lg:justify-center lg:items-center">
            {getFirstLetters(dataUser?.firstname,dataUser?.lastname)}
          </h6>

          <p className="font-semibold text-xs lg:text-base"> Hola , {dataUser?.firstname}  {dataUser?.lastname}</p>
        </Link>

        <IoMenu onClick={toggleMenuMobile} className="lg:hidden bg-greenlime text-lime-950 rounded-sm text-3xl absolute top-4 right-4 cursor-pointer" />
      </header>

      <main className='flex flex-row h-[calc(100%-128px)] lg:h-[calc(100%-134px)] w-full'>

    

      <nav className="hidden lg:flex w-[25%] max-w-[350px] bg-greenlime">
        <div className="flex flex-col gap-y-4 p-8 mt-20 text-lime-950 font-semibold text-lg">
          <Link href="/dashboard" className="text-semibold"> Inicio </Link>
          <Link href="/dashboard/activity"> Actividad </Link>       
          <Link href="/dashboard/get-money"> Cargar Dinero  </Link>
          <Link href="/dashboard/pay-services"> Pagar Servcios </Link>
          <Link href="/dashboard/cards"> Tarjetas  </Link>
          <Link href="/dashboard/profile"> Tu Perfil </Link>
          <button onClick={logout} className="block text-start"> Cerrar Sesíon </button>
        </div>
      </nav>

      <section className="w-full lg:w-full bg-lightmain h-[100%] overflow-hidden overflow-y-scroll pb-12 ">
        {children}
      </section>

      </main>

      <footer className="w-full h-[64px] bg-greylight text-greenlime z-50 flex flex-row items-center justify-center lg:justify-start">
        <h6 className="text-center lg:ml-8 "> 2024 Digital Money App </h6>
      </footer>
          
    </section>
  )
}

export default LayoutPage