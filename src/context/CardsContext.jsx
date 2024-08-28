'use client'
import React, { createContext, useContext, useState } from 'react';
import { CreateCardRequest, DeleteCardRequest, getCardRequest, getCardsRequest } from '@/axios/Cards';

const CardsContext = createContext();

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error("useCards debe ser utilizado dentro del CardsProvider");
    }
    return context;
};

export const CardsProvider = ({ children }) => {
    const [cardsList, setCardsList] = useState([]);



    const fetchCards = async (accountId) => {
        try {
            const data = await getCardsRequest(accountId);
            console.log("Las cards son :" , data)
            setCardsList(data);
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <CardsContext.Provider value={{ fetchCards, cardsList }}>
            {children}
        </CardsContext.Provider>
    );
};