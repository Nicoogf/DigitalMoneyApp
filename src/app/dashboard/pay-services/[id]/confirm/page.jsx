'use client'

import { useCards } from '@/context/CardsContext';
import { useServices } from '@/context/ServiceContext';
import { useTransaction } from '@/context/TransactionsContext';
import { useAuth } from '@/context/UserContext';
import { formatCurrency } from '@/funcionalidad/funcionalidades';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const ConfirmPayPage = () => {
    const { credentialsUser } = useAuth()
    const { fetchCards, cardsList, selectedCardId, setSelectedCardId } = useCards();
    const { register, handleSubmit, setValue } = useForm();
    const { selectedService, listServices, fetchService, service } = useServices();
    const { payService } = useTransaction()
    const router = useRouter();

    useEffect(() => {
        if (credentialsUser) {
            fetchCards(credentialsUser?.id);
        }
    }, [credentialsUser]);

    const onSubmit = (data) => {
        try {
            payService(credentialsUser?.id, service);  // Asegúrate de pasar 'service'
            console.log("Datos del formulario:", data);
            router.push(`/dashboard/pay-services/${selectedCardId}/confirm/success`);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSelect = (id) => {
        setSelectedCardId(id);
        setValue('selectedCard', id);
    };

    const handleSelectAvailableAmount = () => {
        setSelectedCardId('available_amount');
        setValue('selectedCard', 'available_amount');
    };

    useEffect(() => {
        fetchService(selectedService);
    }, []);

    useEffect(() => {
        if(!selectedService){
            router.push("/dashboard/pay-services")
        };
    }, []);

    return (
        <main className="text-black">
            <section className='mt-20 p-8 shadow-md rounded-lg bg-graydark w-[90%] mx-auto max-w-[720px]  bg-800-200 '>
                <div className='flex flex-row justify-between items-center px-4 border-b border-gray-700'>
                    <h6 className='py-4 font-semibold text-2xl text-greenlime'>{service?.name}</h6>
                    <h6 className='text-white'>Ver detalles de pago</h6>
                </div>
                <div className='flex flex-row items-center justify-between px-4'>
                    <h6 className='py-4 text-white font-semibold text-lg'>Total a pagar</h6>
                    <h6 className='py-4 text-white font-semibold text-lg'>$ {service?.invoice_value}</h6>
                </div>
            </section>

            <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] mx-auto max-w-[720px] bg-white rounded-xl shadow-md p-8 mt-8'>
                <section className='flex flex-col gap-y-2'>
                    <article
                        className='flex flex-row items-center justify-between py-6 border-b-2 border-gray-400'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <div className='h-5 w-5 rounded-full bg-greenlime' />
                            <h6>Pagar con saldo disponible: 
                            <span className="font-semibold"> (${formatCurrency(credentialsUser?.available_amount)}) </span>    
                            </h6>
                        </div>
                        <input
                            type="radio"
                            value="available_amount"
                            {...register('selectedCard')}
                            checked={selectedCardId === 'available_amount'}
                            onChange={handleSelectAvailableAmount}
                        />
                    </article>

                    {cardsList.map(card => (
                        <article
                            key={card.id}
                            className='flex flex-row items-center justify-between py-6 border-b-2 border-gray-400'>
                            <div className='flex flex-row items-center gap-x-2'>
                                <div className='h-5 w-5 rounded-full bg-greenlime' />
                                <h6>Terminada en {card.number_id.toString().slice(-4)}</h6>
                            </div>
                            <input
                                type="radio"
                                value={card.id}
                                {...register('selectedCard')}
                                checked={selectedCardId === card.id}
                                onChange={() => handleSelect(card.id)}
                            />
                        </article>
                    ))}
                </section>

                <button type="submit" className='mt-6 p-3 bg-greenlime text-greaydark font-semibold rounded-xl ml-auto block'>
                    Confirmar Selección
                </button>
            </form>
        </main>
    );
};

export default ConfirmPayPage;