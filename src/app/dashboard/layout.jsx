'use client'
import Image from 'next/image'
import React ,{useEffect} from 'react'
import LogoDMH from "../../../public/logo-on.png"
import Link from 'next/link'
import { useAuth } from '@/context/UserContext'
import { getFirstLetters } from '@/funcionalidad/funcionalidades'
import LoadingSpinner from '@/components/loading'

const LayoutPage = ({ children }) => {  const {
  credentialsUser,  // id id_user amount cvu alias
  dataUser, // name lastname dni email
  loading, // esta cargando ?
  setLoading,
  getDataUser, // trae los datos del user
  isLogued,
  logout
} = useAuth()



useEffect(() => {
  isLogued()
},[])

useEffect( () => {
  getDataUser(credentialsUser?.user_id)
} , [credentialsUser]) 

  return (
    <section className="text-white h-[100%] overflow-hidden overflow-y-scroll grid grid-cols-12 relative">

      <header className="absolute top-0 w-full bg-graydark py-2 flex flex-row justify-between">
        <Image src={LogoDMH} alt="Digital Money House Logo" className=" ml-8 w-20 object-contain" />
        <Link href="/dashboard" className="flex flex-row items-center mr-8 gap-x-4">
          <h6 className="bg-greenlime rounded-lg py-1 px-2 text-lime-950 font-bold">
            {getFirstLetters(dataUser?.firstname,dataUser?.lastname)}
          </h6>
          <p className="font-semibold"> Hola , {dataUser?.firstname}  {dataUser?.lastname}</p>
        </Link>
      </header>

      <nav className="hidden lg:grid lg:col-span-3 bg-greenlime">
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
      <section className="col-span-12 lg:col-span-9 bg-lightmain max-h-[980px] overflow-hidden">
        {children}
      </section>

      <footer className="p-4 bg-greylight absolute bottom-0 z-50 w-full py-3 text-greenlime"> 
        Digital Money House 2024        
      </footer>
          
    </section>
  )
}

export default LayoutPage