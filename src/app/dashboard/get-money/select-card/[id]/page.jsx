'use client'
import React, { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCards } from '@/context/CardsContext';
import { useTransaction } from '@/context/TransactionsContext';


const IdCardPage = () => {
  const [inputAmount, setInputAmount] = useState(0);
  const router = useRouter();  
  const { cardsList ,fetchCards,selectedCardId, setSelectedCardId, } = useCards()
  const { amount , setAmount } = useTransaction()

  const handleNextStep = () => {
   
    // const id = window.location.pathname.split('/').filter(Boolean).pop();  
    // console.log(id)
    setAmount(inputAmount);
    router.push(`/dashboard/get-money/select-card/${selectedCardId}/confirm`);
  };

  useEffect(() => {
    if (!selectedCardId) {      
      router.back();     
    }
  }, [selectedCardId, router]);




  return (
    <main>
    <Link href="/dashboard/get-money/select-card" className='mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-pointer'>
      Ir Atras
    </Link>
    <section className='flex flex-col mt-8 p-10 bg-graydark rounded-lg w-[90%] mx-auto max-w-[720px]'>
      <h6 className='text-greenlime font-semibold text-lg mb-2'>¿Cuánto querés ingresar a la cuenta?</h6>
      <input
        type="number"
        name="amount"
        value={inputAmount}
        onChange={(e) => setInputAmount(Number(e.target.value))}
        className='text-black text-lg font-semibold outline-none bg-white rounded-md text-center p-2 w-[90%] max-w-[300px] my-2'
        placeholder='$0'
      />
      <button onClick={handleNextStep} className='bg-greenlime px-8 py-3 rounded-lg font-semibold max-w-[300px] ml-auto text-lime-950'>
        Continuar
      </button>
    </section>
  </main>
  );
};

export default IdCardPage;