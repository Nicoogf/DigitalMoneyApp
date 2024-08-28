'use client'
import { useAuth } from '@/context/UserContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const { contextErrors, setContextErrors, signUp } = useAuth()

    const onSubmit = (data) => {     
        data.dni = parseInt(data.dni, 10);
    
        if (data.confirmPassword !== data.password) {
            setContextErrors(["Las contraseñas no coinciden"]);
        } else {
            try {
                console.log("el valor de data fue:", data);
                signUp(data);
            } catch (error) {
                setContextErrors([error]);
            }
        }
    }


    useEffect(() => {
        if (contextErrors.length > 0) {
            const timer = setTimeout(() => {
                setContextErrors([])
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [contextErrors, setContextErrors]);

    return (

        <section className="flex items-center justify-center h-[100%]">

            {contextErrors && contextErrors.length > 0 && (
                <section className="absolute top-10 left-1/2 transform -translate-x-1/2">
                    {contextErrors.map((error, key) => (
                        <p key={key} className="text-white bg-red-500"> {error} </p>
                    ))}
                </section>
            )}

            <section className="">
                {['firstname', 'lastname', 'email', 'dni', 'phone', 'password', 'confirmPassword'].map((field) =>
                    errors[field] && <p key={field} className="text-red-500">{errors[field]?.message}</p>
                )}
            </section>

            <form className="flex flex-col gap-2 w-[95%] max-w-[720px] mx-auto placeholder:text-gray-300" onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="firstname"
                    className="bg-slate-600 p-2"
                    placeholder="Nombre"
                    {...register("firstname", {
                        required: "El nombre es requerido"
                    })}
                />


                <input
                    name="lastname"
                    className="bg-slate-600 p-2"
                    placeholder="Apellido"
                    {...register("lastname", {
                        required: "El apellido es requerido"
                    })}
                />


                <input
                    name="email"
                    className="bg-slate-600 p-2"
                    placeholder="Email"
                    {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "El formato del email no es válido"
                        }
                    })}
                />


                <input
                    name="dni"
                    className="bg-slate-600 p-2"
                    placeholder="DNI"
                    {...register("dni", {
                        required: "El DNI es requerido",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El DNI debe ser un número"
                        }
                    })}
                />


                <input
                    name="phone"
                    className="bg-slate-600 p-2"
                    placeholder="Teléfono"
                    {...register("phone", {
                        required: "El teléfono es requerido",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El teléfono debe ser un número"
                        }
                    })}
                />


                <input
                    name="password"
                    className="bg-slate-600 p-2"
                    placeholder="Contraseña"
                    type="password"
                    {...register("password", {
                        required: "La contraseña es requerida",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                />


                <input
                    name="confirmPassword"
                    className="bg-slate-600 p-2"
                    placeholder="Confirmar Contraseña"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Por favor confirma la contraseña",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                />

                <button className="bg-blue-500 w-full py-2 rounded-md">Registrar</button>
            </form>
        </section>
    )
}

export default RegisterPage