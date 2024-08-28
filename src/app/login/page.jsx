'use client'
import { useAuth } from '@/context/UserContext'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const { signIn, contextErrors, setContextErrors } = useAuth()
    const { handleSubmit, register } = useForm()
    const router= useRouter ()

    const onSubmit = async (data) => {
        // try {
            const response = await signIn(data);
            console.log('Login successful:', response);
            router.push("/dashboard")   
    }

    return (
        <div className="text-white h-[100%] flex justify-center items-center">

            <section className="absolute top-10 left-1/2 transform -translate-x-1/2">
                {Array.isArray(contextErrors) && contextErrors.length > 0 ?
                    contextErrors.map((error, key) => (
                        <p key={key}> {error} </p>
                    ))
                    : ""}
            </section>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <input name="email" type="email" className="bg-slate-700 p-2 rounded" {...register("email", { required: true })} />
                <input name="password" type="password" className="bg-slate-700 p-2 rounded" {...register("password", { required: true })} />
                <button className="bg-blue-500 p-2 rounded-lg"> Ingresar </button>
            </form>
        </div>
    )
}

export default LoginPage