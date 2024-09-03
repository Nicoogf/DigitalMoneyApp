'use client'
import React, { createContext, useContext, useState ,useEffect } from 'react';
import { CreateCardRequest, DeleteCardRequest, getCardRequest, getCardsRequest } from '@/axios/Cards';
import { useRouter } from 'next/navigation';

const CardsContext = createContext();

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error("useCards debe ser utilizado dentro del CardsProvider");
    }
    return context;
};

export const CardsProvider = ({ children }) => {
    const router = useRouter()
    const [cardsList, setCardsList] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [cardErrors , setCardsErrors ] = useState(null)

    const [ fetchCardId , setFetchCardId ] = useState(null)


    const fetchCards = async (accountId) => {
        try {
            const data = await getCardsRequest(accountId);
            console.log("Las cards son :" , data)
            setCardsList(data);
        } catch (error) {
            console.log(error)
        }
    };

    const deleteCard = async (accountId, cardId ) => {
        try {
            await DeleteCardRequest(accountId, cardId );
            setCardsList(prevCards => prevCards.filter(card => card.id !== cardId));
        } catch (err) {
            console.log(err.message || 'Error eliminando la tarjeta');
        } finally {
           
        }
    };

    
    const createCard = async (accountId, cardData) => {
        try {
          const newCard = await CreateCardRequest(accountId, cardData);
          setCardsList((prevCards) => [...prevCards, newCard]);
          router.push("/dashboard/cards")
        } catch (error) {
          console.error('Fallo en la creacion de Tarjeta:', error);
          console.log(error.response?.data)
          setCardsErrors(error.response?.data)
        }
      };

      const fetchCard = async (accountId , cardId) => {
        try {
            const data = await getCardRequest(accountId,cardId);
            setFetchCardId(data);
        } catch (error) {
            console.log(error)
        }
    };





    return (
        <CardsContext.Provider value={{ fetchCardId, fetchCard ,setCardsErrors,cardErrors, createCard ,deleteCard, fetchCards, cardsList ,selectedCardId, setSelectedCardId}}>
            {children}
        </CardsContext.Provider>
    );
};