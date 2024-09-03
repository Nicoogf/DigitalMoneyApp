import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import Link from 'next/link';

const SuccesTransactionPage = () => {
  return (
    <main>
        <section className='mt-20 p-8 bg-graydark w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg flex flex-col items-center justify-center'> 
            <CiCircleCheck className='text-7xl text-greenlime'/>
            <h6 className='border-b border-gray-700 text-white font-semibold text-2xl py-4'> Pago Realizado </h6>
            <h6 className='text-gray-400 mt-4'> Recuerda que puedes descargar el comprobante</h6>
            <h6 className='text-gray-400'> Los cambios se veran reflejados cuando redirijas al inicio</h6>
        </section>

        <section className='mt-6 w-[90%] mx-auto max-w-[720px]'> 
            <Link className='text-lime-950 bg-greenlime font-semibold ml-auto block px-10 py-3 rounded-xl shadow-md w-[100%] max-w-[220px] text-center' href="/dashboard"> Ir a inicio </Link>
        </section>
    </main>
  )
}

export default SuccesTransactionPage