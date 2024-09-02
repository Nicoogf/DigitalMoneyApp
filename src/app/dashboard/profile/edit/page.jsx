// 'use client'
// import Link from 'next/link';
// import React, { useEffect } from 'react';
// import { MdOutlineModeEditOutline } from "react-icons/md";
// import { FaArrowRight } from "react-icons/fa";
// import { MdOutlineContentCopy } from "react-icons/md";
// import { useAuth } from '@/context/UserContext';



// const EditProfilePage = () => {
//     const {
//         credentialsUser,  // id id_user amount cvu alias
//         dataUser, // name lastname dni email
//         loading, // esta cargando ?
//         setLoading,
//         getDataUser, // trae los datos del user
//         isLogued,
//     } = useAuth()


//     useEffect(() => {
//         isLogued();
//     }, []);

//     useEffect(() => {
//         if (credentialsUser && credentialsUser?.id) {
//           getDataUser(credentialsUser.id);
//         }
//       }, [credentialsUser]);
    
//   return (
//     <main>
//       <section className='w-[90%] max-w-[720px] mx-auto bg-white rounded-xl mt-20 shadow-lg flex flex-col text-black'>
//         <h3 className='text-xl font-bold p-4'> Modifica tus Datos </h3>

//         <section className='p-4'>

//           <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
//             <h6> Email </h6>
//             <article className='flex flex-row justify-around items-center gap-x-4'>
//               <input placeholder={dataUser?.email} className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" />
//             </article>
//           </div>

//           <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
//             <h6> Nombre y Apellido </h6>
//             <article className='flex flex-row justify-around items-center gap-x-4'>
//               <input placeholder={`${dataUser?.firstname} ${dataUser?.lastname}`} className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" />
//             </article>
//           </div>

//           <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
//             <h6> CUIT </h6>
//             <article className='flex flex-row justify-around items-center gap-x-4'>
//               <input placeholder={`20-${dataUser?.dni}`} className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" />
//             </article>
//           </div>

//           <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
//             <h6> Telefono </h6>
//             <article className='flex flex-row justify-around items-center gap-x-4'>
//               <input placeholder={dataUser?.phone} className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" />
//             </article>
//           </div>

//         </section>


//       </section>

//       <Link href="/dahsboard/cards" className='w-[90%] max-w-[720px] mx-auto flex flex-row justify-center items-center px-20 py-10 rounded-xl shadow-lg mt-6 bg-greenlime'>
//         <h6 className='font-semibold text-lg text-lime-900'> Guardar Cambios </h6>      
//       </Link>

//       <section className='w-[90%] max-w-[720px] mx-auto bg-graydark mt-8 shadow-lg rounded-xl p-8 flex flex-col gap-y-6'>
//         <h6 className='text-white font-semibold '> Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</h6>
//         <article className='flex flex-row items-center justify-between'>
//           <div>
//             <h6 className='text-greenlime font-semibold'> CVU </h6>
//             <h6 className='text-gray-200'> {credentialsUser?.cvu} </h6>
//           </div>
//           <MdOutlineContentCopy className='text-greenlime text-3xl' />

//         </article>

//         <article className='flex flex-row items-center justify-between'>
//           <div>
//             <h6 className='text-greenlime font-semibold'> Alias </h6>
//             <h6 className='text-gray-200'> {credentialsUser?.alias}</h6>
//           </div>
//           <MdOutlineContentCopy className='text-greenlime text-3xl' />

//         </article>
//       </section>
//     </main >
//   )
// }

// export default EditProfilePage


'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import { useAuth } from '@/context/UserContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const EditProfilePage = () => {
    const {
        credentialsUser,  
        dataUser, 
        loading, 
        setLoading,
        getDataUser, 
        updateUser, // Función que hemos definido antes para hacer la solicitud de actualización
        isLogued,
    } = useAuth();

    const { register, handleSubmit, setValue } = useForm();

   const router = useRouter()

    useEffect(() => {
        isLogued();
    }, []);

    useEffect(() => {
        if (credentialsUser && credentialsUser?.id) {
            getDataUser(credentialsUser.id);
        }
    }, [credentialsUser]);

    useEffect(() => {
        if (dataUser) {
            // Prellenar los campos del formulario con los datos del usuario
            setValue('email', dataUser.email);
            setValue('firstname', dataUser.firstname);
            setValue('lastname', dataUser.lastname);
            setValue('dni', dataUser.dni);
            setValue('phone', dataUser.phone);
        }
    }, [dataUser, setValue]);

    const onSubmit = async (data) => {
        const updatedUser = {
            id: credentialsUser.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            dni: parseInt(data.dni, 10), 
            phone: data.phone,
        };

        setLoading(true);
        await updateUser(credentialsUser?.user_id, updatedUser);
        setLoading(false);
        router.push("/dashboard/profile")
    };

    return (
        <main>
            <section className='w-[90%] max-w-[720px] mx-auto bg-white rounded-xl mt-20 shadow-lg flex flex-col text-black'>
                <h3 className='text-xl font-bold p-4'> Modifica tus Datos </h3>

                <section className='p-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
                            <h6> Email </h6>
                            <article className='flex flex-row justify-around items-center gap-x-4'>
                                <input 
                                    {...register('email')}
                                    placeholder="Email" 
                                    className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" 
                                />
                            </article>
                        </div>

                        <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
                            <h6> Nombre y Apellido </h6>
                            <article className='flex flex-row justify-around items-center gap-x-4'>
                                <input 
                                    {...register('firstname')}
                                    placeholder="Nombre" 
                                    className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" 
                                />
                                <input 
                                    {...register('lastname')}
                                    placeholder="Apellido" 
                                    className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" 
                                />
                            </article>
                        </div>

                        <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
                            <h6> CUIT </h6>
                            <article className='flex flex-row justify-around items-center gap-x-4'>
                                <input 
                                    type="number" 
                                    {...register('dni')}
                                    placeholder="DNI" 
                                    className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" 
                                />
                            </article>
                        </div>

                        <div className='flex flex-row justify-between items-center gap-x-8 py-2 border-b border-gray-300'>
                            <h6> Teléfono </h6>
                            <article className='flex flex-row justify-around items-center gap-x-4'>
                                <input 
                                    {...register('phone')}
                                    placeholder="Teléfono" 
                                    className="mr-4 placeholder:text-sm outline-none border border-gray-300 p-2 rounded-xl" 
                                />
                            </article>
                        </div>

                        <button type="submit" className='w-full mt-4 bg-greenlime text-lime-900 font-semibold p-4 rounded-xl'>
                            Guardar Cambios
                        </button>
                    </form>
                </section>
            </section>

            {/* <section className='w-[90%] max-w-[720px] mx-auto bg-graydark mt-8 shadow-lg rounded-xl p-8 flex flex-col gap-y-6'>
                <h6 className='text-white font-semibold '>Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta</h6>
                <article className='flex flex-row items-center justify-between'>
                    <div>
                        <h6 className='text-greenlime font-semibold'>CVU</h6>
                        <h6 className='text-gray-200'>{credentialsUser?.cvu}</h6>
                    </div>
                    <MdOutlineContentCopy className='text-greenlime text-3xl' />
                </article>

                <article className='flex flex-row items-center justify-between'>
                    <div>
                        <h6 className='text-greenlime font-semibold'>Alias</h6>
                        <h6 className='text-gray-200'>{credentialsUser?.alias}</h6>
                    </div>
                    <MdOutlineContentCopy className='text-greenlime text-3xl' />
                </article>
            </section> */}
        </main>
    );
};

export default EditProfilePage;
