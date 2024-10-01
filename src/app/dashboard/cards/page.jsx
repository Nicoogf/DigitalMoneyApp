
'use client';
import { useCards } from '@/context/CardsContext';
import { useAuth } from '@/context/UserContext';
import React, { useEffect } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import LoadingSpinner from '@/components/loading';

const CardsPage = () => {
    const { credentialsUser, getDataUser } = useAuth();
    const { cardsList, fetchCards, deleteCard, cardsLoading } = useCards();

    const MAX_CARDS = 10; // Límite de tarjetas permitidas

    useEffect(() => {
        getDataUser(credentialsUser?.user_id);
        fetchCards(credentialsUser?.id);
    }, [credentialsUser]);

    const handleDelete = async (cardId) => {
        if (credentialsUser) {
            await deleteCard(credentialsUser?.id, cardId);
        }
    };

    const handleAddCardClick = () => {
        if (cardsList.length >= MAX_CARDS) {
            alert(`No puedes agregar más tarjetas. El límite es ${MAX_CARDS} tarjetas.`);
        } else {
            window.location.href = '/dashboard/add-card/';
        }
    };

    return (
        <main className='pb-20 text-black mt-20'>
            <div
                onClick={handleAddCardClick}
                className="mt-8 w-[90%] max-w-[720px] mx-auto bg-graydark text-greenlime flex rounded-xl shadow-lg flex-col gap-y-4 px-10 py-12 justify-between cursor-pointer"
            >
                <h6 className='text-white font-semibold'>Agrega tu tarjeta de débito o crédito</h6>
                <div className='flex flex-row items-center justify-between'>
                    <article className='flex flex-row gap-x-4 items-center'>
                        <IoMdAddCircleOutline className='text-4xl' />
                        <h6 className='font-semibold'>Nueva Tarjeta</h6>
                    </article>
                    <FaArrowRight className='text-3xl' />
                </div>
            </div>

            <section className='mt-8 w-[90%] max-w-[720px] mx-auto bg-white rounded-xl shadow-md p-3 lg:p-8'>
                <h6 className='text-lg font-semibold mb-4'>Tus Tarjetas</h6>
                <section className="flex flex-col items-center h-[200px] lg:h-[400px] pb-4 lg:pb-20 overflow-hidden overflow-y-scroll custom-scrollbar">
                    {cardsLoading ? (
                        <LoadingSpinner />
                    ) : (
                        cardsList.length === 0 ? (
                            <p>No tienes tarjetas asociadas.</p>
                        ) : (
                            cardsList.map((card) => (
                                <article key={card.id} className='w-[97%] flex flex-row items-center justify-between py-6 border-b-2 border-gray-400'>
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
                        )
                    )}
                </section>
            </section>
        </main>
    );
};

export default CardsPage;
