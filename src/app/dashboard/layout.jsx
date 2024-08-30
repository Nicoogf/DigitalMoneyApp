'use client'
import Image from 'next/image'
import React from 'react'
import LogoDMH from "../../../public/logo-on.png"
import Link from 'next/link'

const LayoutPage = ({ children }) => {


  return (
    <section className="text-white h-[100%] overflow-hidden overflow-y-scroll grid grid-cols-12 relative">

      <header className="absolute top-0 w-full bg-graydark py-2 flex flex-row justify-between">
        <Image src={LogoDMH} alt="Digital Money House Logo" className=" ml-8 w-20 object-contain" />
        <Link href="/dashboard" className="flex flex-row items-center mr-8 gap-x-4">
          <h6 className="bg-greenlime rounded-lg py-1 px-2 text-lime-950 font-bold">
            NF
          </h6>
          <p className="font-semibold"> Hola , Nicolas Falabella </p>
        </Link>
      </header>

      <nav className="hidden lg:grid lg:col-span-3 bg-greenlime">
        <div className="flex flex-col gap-y-4 p-8 mt-20 text-lime-950 font-semibold text-lg">
          <Link href="/dashboard" className="text-semibold"> Inicio </Link>
          <Link href="/"> Actividad </Link>
          <Link href="/"> Tu Perfil </Link>
          <Link href="/"> Cargar Dinero  </Link>
          <Link href="/"> Pagar Servcios </Link>
          <Link href="/"> Tarjetas  </Link>
          <Link href="/"> Cerrar Sesíon </Link>
        </div>
      </nav>
      <section className="col-span-12 lg:col-span-9 bg-lightmain max-h-[980px] overflow-hidden">
        {children}
      </section>

    </section>
  )
}

export default LayoutPage