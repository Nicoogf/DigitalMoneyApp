'use client'
import { useCards } from '@/context/CardsContext'
import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import React,{useEffect , useState} from 'react'
import { useForm } from 'react-hook-form'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/loading'

const SelectCard = () => {
  const { credentialsUser  } = useAuth()
  const { cardsList ,fetchCards,selectedCardId, setSelectedCardId ,cardsLoading} = useCards()
  const { handleSubmit} = useForm()

  const router = useRouter()

  const onSubmit = handleSubmit(async () => {
    if(selectedCardId){
        router.push(`/dashboard/get-money/select-card/${selectedCardId}`)
    }
    return
  })

  const handleCardSelection = (id) => {
    setSelectedCardId(id);
  };

 

useEffect(() => {
    fetchCards(credentialsUser?.id)
} , [credentialsUser])


  return (
    <section>
          <main className="">
            <Link href="/dashboard/get-money" className='mt-2 lg:mt-8 mb-4 block w-[90%] max-w-[720px] mx-auto text-lg font-semibold cursor-point'> Ir Atras </Link>
            <form onSubmit={onSubmit} className='mt-8 w-[90%] mx-auto max-w-[720px] bg-graydark rounded-xl shadow-lg p-8'>
                <h6 className='text-greenlime text-lg font-semibold mb-4'> Seleccionar Tarjeta </h6>
                <section className='w-[100%] mx-auto bg-white rounded-lg p-4 text-black'>
                    <h6 className='text-lg font-semibold'> Tus Tarjetas </h6>
            

                    <section className='flex flex-col items-center h-[300px] overflow-hidden overflow-y-scroll'>
                        {cardsLoading && <LoadingSpinner /> }
                        {cardsList.map((card) => (
                            <article key={card.id} className='w-full flex flex-row items-center justify-between border-b border-gray-300 py-2 lg:py-4'>
                                <div className='flex flex-row items-center gap-x-7'>
                                    <div className='w-8 h-8 rounded-full bg-greenlime' />
                                    <h6>Terminado en {String(card.number_id).slice(-4)}</h6>
                                </div>
                                <input
                                    type='radio'
                                    name='selectedCard'
                                    value={card.id}
                                    checked={selectedCardId === card.id}
                                    onChange={() => handleCardSelection(card.id)}
                                    className='rounded-full'
                                />
                            </article>
                        ))}
                    </section>
                </section>

                <section className='mt-4 flex flex-row items-center justify-between'>
                    <Link className='flex flex-row items-center gap-x-4' href="/dashboard/add-card">
                        <IoIosAddCircleOutline className='text-greenlime text-2xl' />
                        <h6 className='text-greenlime font-semibold'> Nueva Tarjeta </h6>
                    </Link>

                    <button className='bg-greenlime px-8 py-3 rounded-lg font-semibold text-lime-950'>
                        Continuar
                    </button>
                </section>

            </form>
        </main>
       
    </section>
  )
}

export default SelectCard