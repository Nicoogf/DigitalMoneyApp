// 'use client';
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FiEdit } from 'react-icons/fi';
// import { CiCircleCheck } from 'react-icons/ci';
// import { useTransaction } from '@/context/TransactionsContext';
// import { useAuth } from '@/context/UserContext';

// const TransferencePage = () => {
//   const router = useRouter();
//   const { credentialsUser } = useAuth();
//   const { loading, error, success, transferAmount } = useTransaction();

//   const handleTransference = async () => {
//     const transferenceData = {
//       amount: -Math.abs(amount),  
//       dated: new Date().toISOString(),
//       destination: '702833029073258769', 
//       origin: credentialsUser.cvu, 
//     };

//     try {
//       await transferAmount(credentialsUser.id, transferenceData);
//       console.log("Transference successful:");

//     } catch (error) {
//       console.error('Error during transference:', error);
//     }
// };

//   return (
//     <main>
//       <Link href="/dashboard" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-pointer'>
//         Ir Atrás
//       </Link>
//       <form className='mt-8 shadow-md rounded-lg p-8 bg-graydark mx-auto w-[90%] max-w-[720px]'>
//         <h6 className='text-xl font-semibold text-greenlime'>Revisa que está todo bien</h6>
//         <button onClick={() => router.back()} className='flex flex-row gap-x-4 items-center mt-4'>
//           <div className='text-white'>
//             <h6>Vas a transferir</h6>
//             <h6 className='font-semibold text-lg text-start'> $100 </h6>
//           </div>
//           <FiEdit className='text-greenlime text-2xl' />
//         </button>

//         <div className='text-white mt-4'>
//           <h6 className='text-sm'>Para</h6>
//           <h6 className='text-lg font-semibold'>Cuenta de destino</h6>
//         </div>

//         <button 
//           onClick={handleTransference}
//           className='block text-center mt-4 bg-greenlime px-8 py-3 rounded-lg font-semibold max-w-[220px] ml-auto'
//           disabled={loading}
//         >
//           {loading ? 'Procesando...' : 'Continuar'}
//         </button>

//         {error && <p className='text-red-500 mt-4'>{error}</p>}
//       </form>

//       {success && (
//         <div className='mx-auto w-[90%] max-w-[720px]'>
//           <section className="mt-8 shadow-md rounded-lg p-8 bg-greenlime">
//             <CiCircleCheck className='text-6xl mx-auto' />
//             <h6 className='font-semibold text-2xl text-center'>Transferencia completada</h6>
//           </section>

//           <div className='flex flex-row gap-x-2 justify-end'>
//             <Link href="/dashboard" className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold w-[100%] max-w-[260px]'>
//               Ir a inicio
//             </Link>
//             <button className='shadow-lg block text-center mt-4 bg-graydark text-greenlime px-8 py-4 rounded-lg font-semibold max-w-[260px] w-[100%]'>
//               Descargar Comprobante
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default TransferencePage;


'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { CiCircleCheck } from 'react-icons/ci';
import { useTransaction } from '@/context/TransactionsContext';
import { useAuth } from '@/context/UserContext';
import { useForm } from 'react-hook-form';

const TransferencePage = () => {
  const router = useRouter();
  const { credentialsUser } = useAuth();
  const { loading, error, success, transferAmount } = useTransaction();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const transferenceData = {
      amount: -Math.abs(data.amount),  
      dated: new Date().toISOString(),
      destination: '702833029073258769', // CVU de destino -
      origin: credentialsUser.cvu, 
    };

    try {
      await transferAmount(credentialsUser.id, transferenceData); 
      router.push('/dashboard'); 

    } catch (error) {
      console.error('Error during transference:', error);
    }
  };

  return (
    <main>
      <Link href="/dashboard" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-pointer'>
        Ir Atrás
      </Link>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='mt-8 shadow-md rounded-lg p-8 bg-graydark mx-auto w-[90%] max-w-[720px]'
      >
        <h6 className='text-xl font-semibold text-greenlime'>Revisa que está todo bien</h6>

        <div className='flex flex-row gap-x-4 items-center mt-4'>
          <div className='text-white'>
            <h6>Vas a transferir</h6>
            <h6 className='font-semibold text-lg text-start'>
              <input
                type="number"
                {...register('amount', { required: true, min: 1 })}
                defaultValue={100}
                className='bg-transparent border-b-2 border-white text-lg outline-none'
              />
              {errors.amount && <span className='text-red-500 text-sm'>Debe ingresar un monto válido</span>}
            </h6>
          </div>
          <FiEdit className='text-greenlime text-2xl' />
        </div>

        <div className='text-white mt-4'>
          <h6 className='text-sm'>Para</h6>
          <h6 className='text-lg font-semibold'>Cuenta de destino</h6>
        </div>

        <button 
          type="submit"
          className='block text-center mt-4 bg-greenlime px-8 py-3 rounded-lg font-semibold max-w-[220px] ml-auto'
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
            <h6 className='font-semibold text-2xl text-center'>Transferencia completada</h6>
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

export default TransferencePage;