'use client'
import { fetchServicesRequest } from '@/axios/Services';
import React, { createContext, useContext, useState, useEffect } from 'react';


const ServiceContext = createContext();

export const useServices = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices debe usarse dentro de un ServiceProvider');
    }
    return context;
};


export const ServiceProvider = ({ children }) => {
    const [listServices, setListServices] = useState([])
    const [selectedService, SetSelectService] = useState(null)

    const fetchList = async () => {
        try {
            const res = await fetchServicesRequest()
            console.log("Los servicios son" , res)
            setListServices(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <ServiceContext.Provider value={{listServices,selectedService, SetSelectService}}>
            {children}
        </ServiceContext.Provider>
    );
};

