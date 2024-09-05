// 'use client'
// import { useServices } from '@/context/ServiceContext'
// import { useAuth } from '@/context/UserContext'

// import Link from 'next/link'
// import React from 'react'

// const ServiceIdPage  = () => {
//   const { credentialsUser } = useAuth()
//   const { selectedServiceId } = useServices()

//   console.log(selectedServiceId)
//   return (
//     <main>
//         <section className='mt-20 bg-graydark w-[90%] max-w-[720px] mx-auto rounded-lg shadow-md p-8 flex flex-col text-black'>

//             <h6 className='font-semibold text-greenlime text-lg my-4'> Numero de cuenta sin el primer 2</h6>
//             <input className='p-2 rounded-lg outline block w-[70%] max-w-[450px]' value={credentialsUser?.id}/> 
//             <span className='text-xs text-gray-400 my-4'> Utiliza el id de usuario para poder consultar tu facturacion </span>

//             <Link href={`/dashboard/pay-services/${selectedServiceId}/confirm`} className='mt-8 font-semibold ml-auto bg-greenlime px-8 py-3 rounded-lg'> Continuar </Link>
//         </section>
//     </main>
//   )
// }

// export default ServiceIdPage


'use client'
import { useServices } from '@/context/ServiceContext'
import { useAuth } from '@/context/UserContext'

import Link from 'next/link'
import React, { useState } from 'react'

const ServiceIdPage = () => {
  const { credentialsUser } = useAuth()
  const { selectedService } = useServices()
  const [inputValue, setInputValue] = useState(credentialsUser?.id || '')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setError('')
  }

  const handleValidation = (e) => {
    if (Number(inputValue) !== credentialsUser?.id) {
      e.preventDefault()
      setError(`El número ingresado no coincide con tu ID de usuario. Por favor,recuerda que tu id es ${credentialsUser?.id}`)
    }
  }

  return (
    <main>
      <section className='mt-20 bg-graydark w-[90%] max-w-[720px] mx-auto rounded-lg shadow-md p-8 flex flex-col text-black'>

        <h6 className='font-semibold text-greenlime text-lg my-4'>ID de Usuario</h6>
        <input
          className={`p-2 rounded-lg outline block w-[70%] max-w-[450px] ${error ? 'border-red-500' : ''}`}
          value={inputValue}
          onChange={handleInputChange}
        />
        {error && <span className='text-xs text-red-500 my-2'>{error}</span>}
        <span className='text-xs text-gray-400 my-4'> Utiliza el id de usuario para poder consultar tu facturación </span>

        {/* <Link href={`/dashboard/pay-services/${selectedServiceId}/confirm`} 
                  className='mt-8 font-semibold ml-auto bg-greenlime px-8 py-3 rounded-lg'
                  onClick={handleValidation}
            > 
              Continuar 
            </Link> */}

        <Link href={selectedService ? `/dashboard/pay-services/${selectedService}/confirm` : '#'}
          className={`mt-8 font-semibold ml-auto bg-greenlime px-8 py-3 rounded-lg ${!selectedService ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={selectedService ? handleValidation : null}
        >
          Continuar
        </Link>

      </section>
    </main>
  )
}

export default ServiceIdPage