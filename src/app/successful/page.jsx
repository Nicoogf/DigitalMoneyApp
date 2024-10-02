import MenuSuperior from '@/components/MenuSuperior';
import Link from 'next/link';
import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import LogoOff from "../../../public/logo-off.png"
import Image from 'next/image';

const RegisterSuccesfulPage = () => {
  return (
    <main className='overflow-hidden bg-graydark h-[100%] flex justify-center items-center flex-col relative'>
       <nav className='absolute top-0 w-full bg-greenlime p-3 flex flex-row justify-between'>
        <Image src={LogoOff} alt="Logo Digital Money" className='w-16 object-contain ml-4' />
       
  
      </nav>
        <section className='flex flex-col items-center gap-y-8'>
        <h1 className='text-white text-4xl font-bold'> Registro Exitoso </h1>
        <FaRegCheckCircle className='text-8xl text-greenlime'/>
        <p className='text-white text-center text-sm'> Hemos enviado un correo de confirmacion para validar tu email,
            <br />
            por favor revisalo para Iniciar sesion
        </p>

        <Link href="/login" className="bg-greenlime px-9 py-3 font-semibold rounded-lg"> Continuar </Link>
  
            </section>
      </main>
  )
}

export default RegisterSuccesfulPage