'use client'
import MenuSuperior from '@/components/MenuSuperior'
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

        <section className="bg-graydark h-[100%] flex justify-center flex-col relative lg:rounded-xl overflow-hidden">
             <MenuSuperior link="login" text="Iniciar sesión" />

            {contextErrors && contextErrors.length > 0 && (
                <section className="absolute top-20 left-1/2 transform -translate-x-1/2">
                    {contextErrors.map((error, key) => (
                        <p key={key} className="text-red-500 text-xl"> {error} </p>
                    ))}
                </section>
            )}

            <section className="absolute top-20 left-1/2 transform -translate-x-1/2">
                {['firstname', 'lastname', 'email', 'dni', 'phone', 'password', 'confirmPassword'].map((field) =>
                    errors[field] && <p key={field} className="text-red-500 p-1 text-center">{errors[field]?.message}</p>
                )}
            </section>

            <form className="flex flex-col items-center lg:grid grid-cols-1 lg:grid-cols-2 max-w-[720px] mx-auto gap-2" onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="firstname"
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
                    placeholder="Nombre"
                    {...register("firstname", {
                        required: "El nombre es requerido"
                    })}
                />


                <input
                    name="lastname"
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
                    placeholder="Apellido"
                    {...register("lastname", {
                        required: "El apellido es requerido"
                    })}
                />


                <input
                    name="email"
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
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
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
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
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
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
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
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
                    className={`p-2 rounded-lg max-w-[450px] lg:col-span-1 border outline-none text-black font-semibold placeholder:font-thin ${errors.firstname ? 'border-red-500' : ''}`}
                    placeholder="Confirmar Contraseña"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirma la contraseña",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                />

                <button className='bg-greenlime p-2 rounded-lg text-graydark w-full font-semibold'>Registrar</button>
            </form>
        </section>
    )
}

export default RegisterPage