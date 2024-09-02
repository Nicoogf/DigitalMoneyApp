'use client'
import { useAuth } from '@/context/UserContext'
import React, { useEffect ,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import MenuSuperior from '@/components/MenuSuperior'

const LoginPage = () => {
    const { signIn, errorsLogin, setErrorLogin } = useAuth()
    const { handleSubmit, register } = useForm()
    const router = useRouter()
    const [nextOption, setNextOption] = useState(false)

    const onSubmit = async (data) => {
       try {
        const response = await signIn(data);
        console.log('Login successful:', response);
        router.push("/dashboard")
       } catch (error) {
        console.log("Error")
       }
      
    }

    useEffect(() => {
        if (errorsLogin?.length > 0) {
            const timer = setTimeout(() => {
                setErrorLogin(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errorsLogin, setErrorLogin])

    const setMenu = (e) => {
        e.preventDefault()
        setNextOption(!nextOption)
    }

    return (
        // <div className="text-white h-[100%] flex justify-center items-center">

        //     <section className="absolute top-10 left-1/2 transform -translate-x-1/2">
        //         {Array.isArray(errorsLogin) && errorsLogin.length > 0 ?
        //             errorsLogin.map((error, key) => (
        //                 <p key={key}> {error} </p>
        //             ))
        //             : ""}
        //     </section>

        //     <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        //         <input name="email" type="email" className="bg-slate-700 p-2 rounded" {...register("email", { required: true })} />
        //         <input name="password" type="password" className="bg-slate-700 p-2 rounded" {...register("password", { required: true })} />
        //         <button className="bg-blue-500 p-2 rounded-lg"> Ingresar </button>
        //     </form>
        // </div>
        <section className='bg-graydark h-[100%] flex justify-center flex-col relative'>
            <MenuSuperior link="register" text="Registrate" />

            <section className={` ${errorsLogin ? "border border-red-400 bg-gray-950" : ""} w-[95%] bg-graydark h-[200px] max-w-[450px] border-red-300 -mt-48 mx-auto rounded-lg transition-all duration-300`}>
                {errorsLogin ? (
                    <section>
                        <h6 className='font-semibold text-center border-b border-red-400 w-[90%] mx-auto py-2 text-red-400'> No pudiste Iniciar seccion por los siguientes motivos </h6>
                        <p className='w-[90%] mx-auto text-sm text-center mt-6 text-white'> {errorsLogin} </p>
                    </section>
                ) : (<></>)}
            </section>


            <form onSubmit={handleSubmit(onSubmit)} className='w-[95%] max-w-[450px] h-[300px]  mx-auto flex flex-col items-center justify-center overflow-hidden relative'>

                <div className={`flex flex-col  w-[80%] gap-2 py-6 transition-all duration-500 ${nextOption ? "-translate-y-56 opacity-0"
                    : "translate-y-10 opacity-100 flex"
                    }`}>
                    <h6 className='text-center font-semibold text-lg  text-white'> Ingresar Email</h6>
                    <input
                        type="email"
                        placeholder='Ingresar Email'
                        className='p-2 rounded-lg placeholder:text-sm text-black font-semibold outline-none'
                        {...register("email", { required: true })}
                    />
                    <div className='flex flex-row  gap-x-2'>
                        <button className='bg-greenlime py-2 rounded-lg  w-[100%] font-bold text-graydark' onClick={setMenu}> Continuar </button>
                    </div>

                </div>

                <div className={`flex flex-col w-[80%] gap-2 py-6 transition-all duration-500 
    ${nextOption ? "-translate-y-32 opacity-100"
                        : "translate-y-0 opacity-0 "
                    }`}>
                    <h6 className='text-center font-semibold text-lg  text-white'> Ingresar Contraseña</h6>
                    <input
                        type="password"
                        placeholder='Ingresar Contraseña'
                        className='p-2 rounded-lg placeholder:text-sm text-black font-semibold outline-none'
                        {...register("password", { required: true })}
                    />
                    <div className='flex flex-row w-full gap-x-2'>
                        <button className='bg-graydark py-2 font-bold text-greenlime border border-greenlime rounded-lg w-[50%]' onClick={setMenu}> Editar Email </button>
                        <button className='bg-greenlime py-2 rounded-lg font-bold text-graydark border  border-greenlime w-[50%]' type='submit'> Continuar </button>
                    </div>

                </div>

            </form>

            <footer className='bg-greylight w-full text-greenlime absolute bottom-0 py-2'>
                <h6 className='text-center text-greenlime'> 2024 Digital Money House</h6>

            </footer>
        </section >
    )
}

export default LoginPage
