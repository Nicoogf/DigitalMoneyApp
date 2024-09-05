'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { useAuth } from '@/context/UserContext';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast';



const ProfilePage = () => {

    const {
        credentialsUser,  // id id_user amount cvu alias
        dataUser, // name lastname dni email
        loading, // esta cargando ?
        setLoading,
        getDataUser, // trae los datos del user
        isLogued,
    } = useAuth()


    useEffect(() => {
        isLogued();
    }, []);

    useEffect(() => {
        if (credentialsUser && credentialsUser?.id) {
          getDataUser(credentialsUser.id);
        }
      }, [credentialsUser]);
    




    return (
        <main>
            <section className='w-[90%] max-w-[720px] mx-auto bg-white rounded-xl mt-16 lg:mt-20 shadow-lg flex flex-col'>
                <h3 className='lgtext-xl font-bold p-2 lg:p-4 text-black text-base'> Tus Datos </h3>

                <section className='p-2 lg:p-4 text-black'>

                    <div className='flex flex-row justify-between gap-x-8 py-2 border-b border-gray-300'>
                        <h6 className="text-sm lg:text-base"> Email </h6>
                        <article className='flex flex-row justify-around items-center gap-x-4'>
                            <h6 className="text-sm lg:text-base"> {dataUser?.email} </h6>
                            <Link href="/dashboard/profile/edit">
                                <MdOutlineModeEditOutline />
                            </Link>
                        </article>
                    </div>

                    <div className='flex flex-row justify-between gap-x-8 py-2 border-b border-gray-300'>
                        <h6 className="text-sm lg:text-base"> Nombre y Apellido </h6>
                        <article className='flex flex-row justify-around items-center gap-x-4'>
                            <h6 className="text-sm lg:text-base"> {`${dataUser?.firstname} ${dataUser?.lastname}`} </h6>
                            <Link href="/dashboard/profile/edit">
                                <MdOutlineModeEditOutline />
                            </Link>
                        </article>
                    </div>

                    <div className='flex flex-row justify-between gap-x-8 py-2 border-b border-gray-300'>
                        <h6 className="text-sm lg:text-base"> CUIT </h6>
                        <article className='flex flex-row justify-around items-center gap-x-4'>
                            <h6 className="mr-6 text-sm lg:text-base"> 20-{dataUser?.dni} </h6>
                           
                        </article>
                    </div>

                    <div className='flex flex-row justify-between gap-x-8 py-2 border-b border-gray-300'>
                        <h6 className="text-sm lg:text-base"> Telefono </h6>
                        <article className='flex flex-row justify-around items-center gap-x-4'>
                            <h6 className="text-sm lg:text-base">{dataUser?.phone} </h6>
                            <Link href="/dashboard/profile/edit">
                                <MdOutlineModeEditOutline />
                            </Link>
                        </article>
                    </div>

                    <div className='flex flex-row justify-between gap-x-8 py-2 border-b border-gray-300'>
                        <h6 className="text-sm lg:text-base"> Contraseña </h6>
                        <article className='flex flex-row justify-around items-center gap-x-4'>
                            <h6 className="mr-6 text-sm lg:text-base"> ********* </h6>
                            
                        </article>
                    </div>

                </section>


            </section>

            <Link href="/dashboard/cards" className='w-[90%] max-w-[720px] mx-auto flex flex-row justify-between items-center px-10 lg:px-20 py-5 lg:py-10 rounded-xl shadow-lg mt-2 lg:mt-6 bg-greenlime'>
                <h6 className='font-semibold text-base lg:text-lg text-lime-950'> Gestiona los medios de pagos</h6>
                <FaArrowRight className="text-lime-950"/>
            </Link>

            <section className='w-[90%] max-w-[720px] mx-auto bg-graydark mt-2 lg:mt-8 shadow-lg rounded-xl p-3 lg:p-8 flex flex-col gap-y-2 lg:gap-y-4'>
                <h6 className='text-white font-semibold text-xs lg:text-base '> Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</h6>

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
        </main >
    )
}

export default ProfilePage