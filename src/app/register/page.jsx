'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
const { handleSubmit ,register  } = useForm()

const onSubmit = (data) => {
    console.log(data)
}
  return (
    <section className="flex items-center justify-center h-[100%]">
        <form className="flex flex-col gap-2 w-[95%] max-w-[720px] mx-auto placeholder:text-gray-300" onSubmit={handleSubmit(onSubmit)}>

            <input name="firstname" className="bg-slate-600 p-2" placeholder="Nombre" {...register("firstname", {required:true})}/>

            <input name="lastname" className="bg-slate-600 p-2"placeholder="Apellido" {...register("lastname", {required:true})}/> 

            <input name="email" className="bg-slate-600 p-2" placeholder="Email" {...register("email", {required:true})}/> 
             
            <input name="dni" className="bg-slate-600 p-2" placeholder="DNI" {...register("dni", {required:true})}/> 

            <input name="phone" className="bg-slate-600 p-2" placeholder="Telefono" {...register("phone", {required:true})}/> 

            <input name="password"className="bg-slate-600 p-2" placeholder="Contraseña" {...register("password", {required:true})}/> 

            <input name="confirm-password"className="bg-slate-600 p-2" placeholder="Confirmar Contraseña" {...register("confirm-password", {required:true})}/>

            <button className="bg-blue-500 w-full py-2 rounded-md"> Registrar </button> 
      
        </form>
    </section>
  )
}

export default RegisterPage