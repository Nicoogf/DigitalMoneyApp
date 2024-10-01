import Link from 'next/link'
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoCardSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

const GetMoneyPage = () => {
  return (
    <main>

      <Link href="/dashboard" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-point text-graydark'> Ir Atras </Link>
      <Link href="/dashboard/get-money/get-info" className='mt-8 w-[90%] max-w-[720px] mx-auto bg-graydark text-greenlime flex rounded-xl shadow-lg items-center flex-row gap-x-4 px-10 py-12 justify-between'>
      <div className='flex flex-row items-center gap-x-4'>
        <FaRegUser className='border border-greenlime rounded-full p-2 box-content text-2xl'/>
        <h6 className='text-lg font-semibold'> Transferencia Bancaria </h6>
      </div>
      <FaArrowRight className='text-2xl'/>
       
      </Link>

      <Link href="/dashboard/get-money/select-card" className='mt-8 w-[90%] max-w-[720px] mx-auto bg-graydark text-greenlime flex rounded-xl shadow-lg items-center flex-row gap-x-4 px-10 py-12 justify-between'>
      <div className='flex flex-row items-center gap-x-4'>
        <IoCardSharp className='border border-greenlime rounded-full p-2 box-content text-2xl'/>
        <h6 className='text-lg font-semibold'> Seleccionar Tarjeta </h6>
      </div>
      <FaArrowRight className='text-2xl'/>
       
      </Link>
    </main>
  )
}

export default GetMoneyPage