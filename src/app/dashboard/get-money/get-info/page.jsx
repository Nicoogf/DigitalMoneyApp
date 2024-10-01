
'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useAuth } from '@/context/UserContext';

const GetInfoAcount = () => {
    const { credentialsUser, isLogued } = useAuth();
    
    useEffect(() => {
        isLogued()
    }, [])

    return (
        <main>
            <Link href="/dashboard/get-money" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-point text-graydark'> Ir Atras </Link>
            <section className='w-[90%] max-w-[720px] mx-auto bg-graydark mt-8 shadow-lg rounded-xl p-8 flex flex-col gap-y-4'>
                <h6 className='text-white font-semibold '> Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</h6>

                <CopyToClipboard  text={credentialsUser?.cvu}>
                   <article className='flex flex-row items-center justify-between cursor-pointer hover:bg-gray-300 p-4 rounded-lg  transition-all duration-100 group' onClick={()=> toast.success("CVU copiado en el Portapapeles")}> 
                    <div>
                        <h6 className='text-greenlime font-semibold group-hover:text-lime-600'> CVU </h6>
                        <h6 className='text-gray-200 group-hover:text-graydark'> {credentialsUser?.cvu} </h6>
                    </div>
                    <MdOutlineContentCopy className='text-greenlime text-3xl group-hover:text-lime-600' />
                    </article>
                </CopyToClipboard>

                <CopyToClipboard  text={credentialsUser?.alias}>
                <article className='flex flex-row items-center justify-between cursor-pointer hover:bg-gray-300 p-4 rounded-lg transition-all duration-200 group' onClick={()=> toast.success("Alias copiado en el Portapapeles")}>
                    <div>
                        <h6 className='text-greenlime font-semibold group-hover:text-lime-600'> Aias </h6>
                        <h6 className='text-gray-200 group-hover:text-graydark'>{credentialsUser?.alias}</h6>
                    </div>
                    <MdOutlineContentCopy className='text-greenlime text-3xl group-hover:text-lime-600' />

                </article>
                </CopyToClipboard> 
            </section>
            <Toaster />
        </main>

    )
}

export default GetInfoAcount