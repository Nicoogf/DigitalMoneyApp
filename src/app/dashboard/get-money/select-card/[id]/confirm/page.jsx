'use client'
import Link from 'next/link';
import React from 'react'
import { FiEdit } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";

import { useRouter } from 'next/navigation';
import { lastFourNumbers } from '@/funcionalidad/funcionalidades';
import { useTransaction } from '@/context/TransactionsContext';
import { useCards } from '@/context/CardsContext';
import { useAuth } from '@/context/UserContext';



// const ConfirmPage = () => {

//     const router = useRouter()
//     const { credentialsUser } = useAuth();
//     const { loading , error , success , amount ,depositAmount} = useTransaction()


    


//     const goBack = () => {
//         router.back();
//     };

    
//     const handleDeposit = async () => {
        
//         const depositData = {
//             amount,
//             dated: new Date().toISOString(), 
//             destination: `Debit Card`, 
//             origin: 'User', 
//         };
    
//         try {
//             await depositAmount(credentialsUser.id, depositData);                     
//         } catch (error) {
//             console.error('Error during deposit:', error);
//         }
//     };

//     return (
//         <main>
//             <Link href="/dashboard/get-money/select-card/id" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-pointer'> Ir Atras </Link>
//             <form className='mt-8 shadow-md rounded-lg  p-8 bg-graydark mx-auto w-[90%] max-w-[720px]'>
//                 <h6 className='text-xl font-semibold text-greenlime'> Revisa que esta todo bien </h6>
//                 <button onClick={goBack} className='flex flex-row gap-x-4 items-center mt-4'>
//                     <div className='text-white'>
//                         <h6> Vas a depositar </h6>
//                         <h6 className='font-semibold text-lg text-start'> ${amount} </h6>
//                     </div>
//                     <FiEdit className='text-greenlime text-2xl' />
//                 </button>

//                 <div className='text-white mt-4'>
//                     <h6 className='text-sm'> Para </h6>
//                     <h6 className='text-lg font-semibold'> Cuenta Propia </h6>
//                 </div>


//                 <button 
//                     onClick={handleDeposit}
//                     className='text-lime-950 block text-center mt-4 bg-greenlime px-8 py-3 rounded-lg font-semibold max-w-[220px] ml-auto'
//                     disabled={loading}
//                 >
//                     {loading ? 'Procesando...' : 'Continuar'}
//                 </button>

//                 {error && <p className='text-red-500 mt-4'>{error}</p>}
//             </form>

//             {success && (
//                 <div className='mx-auto w-[90%] max-w-[720px]'>
//                     <section className="mt-8 shadow-md rounded-lg  p-8 bg-greenlime ">
//                         <CiCircleCheck className='text-6xl mx-auto' />
//                         <h6 className='font-semibold text-2xl text-center'> Ya cargamos el dinero en tu cuenta </h6>
//                     </section>

//                     <div className='flex flex-row gap-x-2 justify-end'>
//                         <Link href="/dashboard" className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold w-[100%]  max-w-[260px]'> Ir a inicio </Link>
//                         <button className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold max-w-[260px] w-[100%] '> Descargar Comprobante </button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     );
// };

// export default ConfirmPage;


const ConfirmPage = () => {
    const router = useRouter();
    const { credentialsUser } = useAuth();
    const { loading, error, success, amount, depositAmount } = useTransaction();

    const goBack = () => {
        router.back();
    };

    const handleDeposit = async () => {
        if (!amount || isNaN(amount)) {
          setError("El monto debe ser un número válido.");
          return;
        }
      
        const depositData = {
          amount: Number(amount),
          dated: new Date().toISOString(),
          destination: `Debit Card`,
          origin: 'User',
        };
      
        try {
          await depositAmount(credentialsUser.id, depositData);
        } catch (error) {
          console.error('Error during deposit:', error);
        }
      };
    return (
        <main>
            <Link href="/dashboard/get-money/select-card/id" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-pointer'>
                Ir Atras
            </Link>
            <form className='mt-8 shadow-md rounded-lg  p-8 bg-graydark mx-auto w-[90%] max-w-[720px]'>
                <h6 className='text-xl font-semibold text-greenlime'>Revisa que está todo bien</h6>
                <button onClick={goBack} className='flex flex-row gap-x-4 items-center mt-4'>
                    <div className='text-white'>
                        <h6>Vas a depositar</h6>
                        <h6 className='font-semibold text-lg text-start'>${amount}</h6>
                    </div>
                    <FiEdit className='text-greenlime text-2xl' />
                </button>

                <div className='text-white mt-4'>
                    <h6 className='text-sm'>Para</h6>
                    <h6 className='text-lg font-semibold'>Cuenta Propia</h6>
                </div>

                <button 
                    onClick={handleDeposit}
                    className='text-lime-950 block text-center mt-4 bg-greenlime px-8 py-3 rounded-lg font-semibold max-w-[220px] ml-auto'
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Continuar'}
                </button>

                {error && <p className='text-red-500 mt-4'>{error}</p>}
            </form>

            {success && (
                <div className='mx-auto w-[90%] max-w-[720px]'>
                    <section className="mt-8 shadow-md rounded-lg p-8 bg-greenlime">
                        <CiCircleCheck className='text-6xl mx-auto' />
                        <h6 className='font-semibold text-2xl text-center'>Ya cargamos el dinero en tu cuenta</h6>
                    </section>

                    <div className='flex flex-row gap-x-2 justify-end'>
                        <Link href="/dashboard" className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold w-[100%] max-w-[260px]'>
                            Ir a inicio
                        </Link>
                        <button className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold max-w-[260px] w-[100%]'>
                            Descargar Comprobante
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ConfirmPage;
