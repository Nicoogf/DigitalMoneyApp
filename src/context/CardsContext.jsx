'use client'
import React, { createContext, useContext, useState ,useEffect } from 'react';
import { CreateCardRequest, DeleteCardRequest, getCardRequest, getCardsRequest } from '@/axios/Cards';
import { useAuth } from './UserContext';

const CardsContext = createContext();

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error("useCards debe ser utilizado dentro del CardsProvider");
    }
    return context;
};

export const CardsProvider = ({ children }) => {
    const {credentialsUser} = useAuth()
    const [cardsList, setCardsList] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);



    const fetchCards = async (accountId) => {
        try {
            const data = await getCardsRequest(accountId);
            console.log("Las cards son :" , data)
            setCardsList(data);
        } catch (error) {
            console.log(error)
        }
    };

 useEffect(() => {
    fetchCards(credentialsUser?.id)
 },[credentialsUser])

    return (
        <CardsContext.Provider value={{ fetchCards, cardsList ,selectedCardId, setSelectedCardId}}>
            {children}
        </CardsContext.Provider>
    );
};