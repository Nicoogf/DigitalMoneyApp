'use client'

import { useTransaction } from '@/context/TransactionsContext';
import { useAuth } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'
import { BsCalendar3Range } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

const ActivityPage = () => {
    const [ arrowAnimation , setArrowAnimation ] = useState(false)
    const [showfilter, setShowFilter] = useState(false);
    const {
        credentialsUser,  // id id_user amount cvu alias
        dataUser, // name lastname dni email
        loading, // esta cargando ?
        setLoading,
        getDataUser, // trae los datos del user
        isLogued,
    } = useAuth()

    const { 
        transactionsList, 
        transferencesList, 
        getListTransferences,
        getListTransactions ,
        loadingTransactions
      } = useTransaction()
    

    const [combinedActivityList, setCombinedActivityList] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
 

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const handleClearFilters = () => {
        setSelectedPeriod('');
    };

    const toggleArrow = () => {
        setArrowAnimation(!arrowAnimation)
    }

    useEffect(() => {
        isLogued();
    }, []);

    useEffect(() => {
        if (credentialsUser && credentialsUser?.id) {
            getDataUser(credentialsUser.id);
        }
    }, [credentialsUser]);

    useEffect(() => {
        if (credentialsUser && credentialsUser?.id) {
            getListTransferences(credentialsUser.id);
            getListTransactions(credentialsUser.id);
        }
    }, [credentialsUser]);

    useEffect(() => {
        if (transferencesList.length > 0 || transactionsList.length > 0) {
            const combinedList = [...transferencesList, ...transactionsList]
                .sort((a, b) => new Date(b.dated) - new Date(a.dated))               
            setCombinedActivityList(combinedList);
        }
    }, [transferencesList, transactionsList]);

    const filteredTransactions = combinedActivityList.filter(transaction => {
        if (!selectedPeriod) return true;

        const transactionDate = new Date(transaction.dated);
        const today = new Date();

        switch (selectedPeriod) {
            case 'Hoy':
                return transactionDate.toDateString() === today.toDateString();
            case 'Ayer':
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return transactionDate.toDateString() === yesterday.toDateString();
            case 'Última Semana':
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7);
                return transactionDate >= lastWeek;
            case 'Últimos 15 Días':
                const last15Days = new Date(today);
                last15Days.setDate(today.getDate() - 15);
                return transactionDate >= last15Days;
            case 'Último Mes':
                const lastMonth = new Date(today);
                lastMonth.setMonth(today.getMonth() - 1);
                return transactionDate >= lastMonth;
            case 'Último Año':
                const lastYear = new Date(today);
                lastYear.setFullYear(today.getFullYear() - 1);
                return transactionDate >= lastYear;
            default:
                return true;
        }
    });

    const toggleFilter = () => {
        setShowFilter(!showfilter);
        console.log(showfilter);
    };

    // useEffect(() => {
    //     if (credentialsUser && credentialsUser?.id) {
    //         fetchTransactions(credentialsUser?.id);
    //     }
    // }, [credentialsUser]);

    console.log("filtradas aca" , filteredTransactions)

    return (
        <main className='relative text-black'>
            <section className='text-black mt-20 w-[90%] mx-auto max-w-[720px] flex flex-row gap-x-4'>
                <input placeholder="Buscar en tu actividad" className='outline-none px-4 bg-white rounded-lg shadow-md block w-[80%]' />
                <button onClick={toggleFilter} className='flex flex-row items-center justify-center gap-x-4 bg-greenlime px-6 py-2 rounded-lg shadow-md w-[20%]'>
                    <span className='font-semibold'> Filtrar </span>
                    <BsCalendar3Range />
                </button>
            </section>

            <section className={`transition-all duration-300 w-[70%] max-w-[480px] absolute top-4 right-4 bg-gray-200 p-4 rounded-xl border-2 border-gray-500 py-8 ${!showfilter ? " translate-x-[1000px] opacity-0" : "translate-x-0 opacity-100"} z-50`}>
                <div className='flex flex-row items-center justify-between px-4 border-b border-gray-400 my-4'>
                    <IoExitOutline className='absolute top-4 right-4 text-4xl cursor-pointer' onClick={toggleFilter} />
                    <h6 className='flex flex-row items-center gap-x-4 py-2 font-semibold'>
                        <span> Periodo </span>
                        <FaAngleDown />
                    </h6>
                    <h6 className='font-semibold cursor-pointer' onClick={handleClearFilters}> Borrar filtros </h6>
                </div>

                <div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Hoy</label>
                        <input type="radio" name="periodo" value="Hoy" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Hoy'} />
                    </div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Ayer</label>
                        <input type="radio" name="periodo" value="Ayer" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Ayer'} />
                    </div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Última Semana</label>
                        <input type="radio" name="periodo" value="Última Semana" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Última Semana'} />
                    </div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Últimos 15 Días</label>
                        <input type="radio" name="periodo" value="Últimos 15 Días" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Últimos 15 Días'} />
                    </div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Último Mes</label>
                        <input type="radio" name="periodo" value="Último Mes" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Mes'} />
                    </div>
                    <div className="flex flex-row items-center justify-between py-4">
                        <label className="font-bold">Último Año</label>
                        <input type="radio" name="periodo" value="Último Año" className="custom-radio" onChange={handlePeriodChange} checked={selectedPeriod === 'Último Año'} />
                    </div>
                </div>
            </section>

            <section className='p-8 mt-8 bg-white w-[90%] mx-auto max-w-[720px] shadow-md rounded-lg relative'>
                <button onClick={toggleArrow}
                className={`transition-all duration-300 ${arrowAnimation ? "bg-greenlime text-graydark rotate-180" : "bg-graydark text-greenlime"}  p-2 absolute top-2 right-2 rounded-full`}> 
                    <HiOutlineArrowsUpDown /> 
                </button>
                <h6 className='text-lg font-semibold border-b border-gray-400 py-4'> Tu actividad </h6>

                <section className='relative bg-white h-[400px] max-w-[980px] mx-auto w-[90%] mt-4 rounded-xl p-4 flex flex-col justify-between overflow-hidden overflow-y-scroll pb-8'>
                    
                    {filteredTransactions.length === 0 && !loading ? (
                        <p>No se encontraron transacciones.</p>
                    ) : (
                        <ul>
                            {filteredTransactions.map(transaction => (
                                <li key={transaction.id} className='border-b border-gray-300 py-2 flex flex-row justify-between px-2 items-center'>
                                    <div className='flex flex-row gap-x-4'>
                                        <div className='bg-greenlime h-5 w-5 rounded-full' />
                                        <p>{transaction.description}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-end'> $ {transaction.amount} </p>
                                        <p className='text-end text-xs text-gray-400'> {new Date(transaction.dated).toLocaleDateString('es-AR')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </section>
        </main>
    )
}

export default ActivityPage;



