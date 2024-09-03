'use client'
import { useCards } from '@/context/CardsContext'
import { useAuth } from '@/context/UserContext'
import React, { useEffect } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import LoadingSpinner from '@/components/loading';

const CardsPage = () => {

    const { credentialsUser, getDataUser ,usuario } = useAuth()
    const { cardsList, fetchCards, deleteCard ,cardsLoading} = useCards()

    useEffect(() => {
        getDataUser(credentialsUser?.user_id)
        fetchCards(credentialsUser?.id)
    }, [credentialsUser])

    const handleDelete = async (cardId) => {
        if (credentialsUser) {
            await deleteCard(credentialsUser?.id, cardId );
        }
    };

    return (
        <main className='pb-20 text-black mt-20'>
            <Link href="/dashboard/add-card/" className="mt-8 w-[90%] max-w-[720px] mx-auto bg-graydark text-greenlime flex rounded-xl shadow-lg flex-col gap-y-4 px-10 py-12 justify-between">
                <h6 className='text-white font-semibold'>Agrega tu tarjeta de débito o crédito</h6>
                <div className='flex flex-row items-center justify-between'>
                    <article className='flex flex-row gap-x-4 items-center'>
                        <IoMdAddCircleOutline className='text-4xl' />
                        <h6 className='font-semibold'>Nueva Tarjeta</h6>
                    </article>
                    <FaArrowRight className='text-3xl' />
                </div>
            </Link>

            <section className='mt-8 w-[90%] max-w-[720px] mx-auto bg-white rounded-xl shadow-md p-8'>
                <h6 className='text-lg font-semibold mb-4'>Tus Tarjetas</h6>
                <section className="flex flex-col justify-center items-center">
                 
                    {cardsList.length === 0  ? (
                        <LoadingSpinner />
                    ) : (
                        cardsList.map((card) => (
                            <article key={card.id} className='w-full flex flex-row items-center justify-between py-6 border-b-2 border-gray-400'>
                                <div className='flex flex-row items-center gap-x-2'>
                                    <div className='h-5 w-5 rounded-full bg-greenlime' />
                                    <h6>Terminada en {card.number_id.toString().slice(-4)}</h6>
                                </div>
                                <button
                                    className='font-bold'
                                    onClick={() => handleDelete(card.id)}
                                >
                                    Eliminar
                                </button>
                            </article>
                        ))
                    )}
                </section>
            </section>
        </main>
    )
}

export default CardsPage