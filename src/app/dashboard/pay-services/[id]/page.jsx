'use client'
import { useServices } from '@/context/ServiceContext'
import { useAuth } from '@/context/UserContext'

import Link from 'next/link'
import React from 'react'

const ServiceIdPage  = () => {
  const { credentialsUser } = useAuth()
  const { selectedServiceId } = useServices()

  console.log(selectedServiceId)
  return (
    <main>
        <section className='mt-8 bg-graydark w-[90%] max-w-[720px] mx-auto rounded-lg shadow-md p-8 flex flex-col text-black'>
            
            <h6 className='font-semibold text-greenlime text-lg my-4'> Numero de cuenta sin el primer 2</h6>
            <input className='p-2 rounded-lg outline block w-[70%] max-w-[450px]' value={credentialsUser?.id}/> 
            <span className='text-xs text-gray-400 my-4'> Son 11 numeros sin espacios, sin el "2" inicial.Agrega ceros adelante si tenes menos.</span>

            <Link href={`/dashboard/pay-services/${selectedServiceId}/confirm`} className='mt-8 font-semibold ml-auto bg-greenlime px-8 py-3 rounded-lg'> Continuar </Link>
        </section>
    </main>
  )
}

export default ServiceIdPage